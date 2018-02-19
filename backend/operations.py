import os
import sys
import json 

import pickle
import redis
import re

import dateutil.parser

from bson.json_util import dumps
# import utils packages
sys.path.append(os.path.join(os.path.dirname(__file__), '../common/'))

import mongodb_client  # pylint: disable=import-error, wrong-import-position
# import news_recommendation_service_client

REDIS_HOST = "localhost"
REDIS_PORT = 6379

NEWS_TABLE_NAME = "news"

NEWS_LIMIT = 200
NEWS_LIST_BATCH_SIZE = 10
USER_NEWS_TIME_OUT_IN_SECONDS = 60


# LOG_CLICKS_TASK_QUEUE_URL = 'amqp://seobumce:Cgb4L2j0njuZoFL5WpstU8aBgSepge1c@termite.rmq.cloudamqp.com/seobumce'
# LOG_CLICKS_TASK_QUEUE_NAME = 'tap-news-log-clicks-task-queue'

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)

from cloudAMQP_client import CloudAMQPClient

# def getOneNews():
#     """Get one news"""
#     # print("get_one_news is called.")
#     db = mongodb_client.get_db()
#     news = db[NEWS_TABLE_NAME].find_one()
#     return json.loads(dumps(news))

def getInterestingNewsInRange(keyword, startdate, enddate):
    db = mongodb_client.get_db()

    startdate = dateutil.parser.parse(startdate)
    enddate = dateutil.parser.parse(enddate)
    # print (type(startdate))


    interesting_news = db[NEWS_TABLE_NAME].find({
        'publishedAt':{'$gte' : startdate, '$lte':enddate  },
        '$or' : [ { "title" : {'$in': [re.compile(keyword, re.IGNORECASE)]} }, { "description" : {'$in': [re.compile(keyword, re.IGNORECASE)]} } ]
    })
    # print ('\n')
    # print(list(interesting_news), file=open('out.txt', 'a'))
    # print (len(list(interesting_news)))
    # print ('\n')
    # interesting_news = 'xx'
    return json.loads(dumps(list(interesting_news)))



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

    # # Get preference for the user
    # preference = news_recommendation_service_client.getPreferenceForUser(source)
    # topPreference = None

    # if preference is not None and len(preference) > 0:
    #     topPreference = preference[0]

    # for news in sliced_news:
    #     # Remove text field to save bandwidth.
    #     del news['text']
    #     if news['class'] == topPreference:
    #         news['reason'] = 'Recommend'
    #     if news['publishedAt'].date() == datetime.today().date():
    #         news['time'] = 'today'
    return json.loads(dumps(sliced_news))

# def logNewsClickForUser(user_id, news_id):
#     # Send log task to machine learning service for prediction
#     message = {'userId': user_id, 'newsId': news_id, 'timestamp': str(datetime.utcnow())}
#     cloudAMQP_client.sendMessage(message);