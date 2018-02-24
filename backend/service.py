import os
import sys

import operations 

from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

# import utils packages
sys.path.append(os.path.join(os.path.dirname(__file__), 'utils'))

import mongodb_client  # pylint: disable=import-error, wrong-import-position

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


def get_news_summaries_for_user(source, page_num):
    print("get_news_summaries_for_user is called with %s and %s" % (source, page_num))
    return operations.getNewsSummariesForUser(source, page_num)

def get_num_of_news(source):
    return operations.getNumofNews(source)

def get_interesting_news_in_range(keyword, startdate, enddate):
    return (operations.getInterestingNewsInRange(keyword, startdate, enddate))
    

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(get_news_summaries_for_user, 'getNewsSummariesForUser')
RPC_SERVER.register_function(get_num_of_news, 'getNumofNews')
RPC_SERVER.register_function(get_interesting_news_in_range, 'getInterestingNewsInRange')


print("Starting RPC server on %s:%d" % (SERVER_HOST, SERVER_PORT))
RPC_SERVER.serve_forever()

