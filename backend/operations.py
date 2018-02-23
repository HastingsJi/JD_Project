import os
import sys
import json 

import pickle
import redis
import re

import dateutil.parser
from vaderSentiment import SentimentIntensityAnalyzer
from bson.json_util import dumps
# import utils packages
sys.path.append(os.path.join(os.path.dirname(__file__), '../common/'))

from nltk import tokenize

import mongodb_client  # pylint: disable=import-error, wrong-import-position
# import news_recommendation_service_client

REDIS_HOST = "localhost"
REDIS_PORT = 6379

NEWS_TABLE_NAME = "news"

NEWS_LIMIT = 200
NEWS_LIST_BATCH_SIZE = 10
USER_NEWS_TIME_OUT_IN_SECONDS = 60


redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)

from cloudAMQP_client import CloudAMQPClient


def getInterestingNewsInRange(keyword, startdate, enddate):
    db = mongodb_client.get_db()

    startdate = dateutil.parser.parse(startdate)
    enddate = dateutil.parser.parse(enddate)

    interesting_news = db[NEWS_TABLE_NAME].find({
        'publishedAt':{'$gte' : startdate, '$lte':enddate  },
        '$or' : [ { "title" : {'$in': [re.compile(keyword, re.IGNORECASE)]} }, { "description" : {'$in': [re.compile(keyword, re.IGNORECASE)]} } ]
    })

    interesting_news = list(interesting_news)
    filtered_news = []
    for news in interesting_news:
        sentence_list = tokenize.sent_tokenize(news['text'])
        selected_sentence_list = []
        for sentence in sentence_list:
            if (re.compile(r'\b({0})\b'.format(keyword), flags=re.IGNORECASE).search(sentence) != None):
                selected_sentence_list.append(sentence)
        analyzer = SentimentIntensityAnalyzer()
        paragraphSentiments=0.0
        if len(selected_sentence_list) != 0:
            for sentence in selected_sentence_list:
                vs = analyzer.polarity_scores(sentence)
                paragraphSentiments += vs["compound"]
            news['rate'] = str(round(paragraphSentiments/len(selected_sentence_list), 4))
            filtered_news.append(news)



    return json.loads(dumps(filtered_news))



def getNumofNews(source):
    db = mongodb_client.get_db()
    num_news = db[NEWS_TABLE_NAME].count({'source': source })
    return num_news



def getNewsSummariesForUser(source, page_num):
    page_num = int(page_num)
    begin_index = (page_num - 1) * NEWS_LIST_BATCH_SIZE
    end_index = page_num * NEWS_LIST_BATCH_SIZE

    # The final list of news to be returned.
    sliced_news = []

    if redis_client.get(source) is not None:
        total_news_digests = pickle.loads(redis_client.get(source))

        # If begin_index is out of range, this will return empty list;
        # If end_index is out of range (begin_index is within the range), this
        # will return all remaining news ids.
        sliced_news_digests = total_news_digests[begin_index:end_index]
        print(sliced_news_digests)
        db = mongodb_client.get_db()
        sliced_news = list(db[NEWS_TABLE_NAME].find({'digest':{'$in':sliced_news_digests}}))
    else:
        db = mongodb_client.get_db()
        total_news = list(db[NEWS_TABLE_NAME].find({'source': source }).sort([('publishedAt', -1)]).limit(NEWS_LIMIT))
        total_news_digests = [x['digest'] for x in total_news]

        redis_client.set(source, pickle.dumps(total_news_digests))
        redis_client.expire(source, USER_NEWS_TIME_OUT_IN_SECONDS)

        sliced_news = total_news[begin_index:end_index]

    return json.loads(dumps(sliced_news))

