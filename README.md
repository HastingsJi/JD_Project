# NewsEngine

> NewsEngine is designed to collect news from various sources, find the related news based on user's input keyword, analyze the sentiment of the news and present both news and analysis results in a react powered frontend web page. More design details and system architecture can be found on the project wiki page. 

![Alt Text](https://github.com/HastingsJi/NewsEngine/blob/master/Docs/demo.gif)


## Getting Started
### Git clone this repo
`git clone https://github.com/HastingsJi/NewsEngine.git`
### Install dependencies
`cd ~/NewsEngine/web_server/client`

`npm install`

`cd ~/NewsEngine/web_server/server`

`npm install`

`cd ~/NewsEngine`

`pip3 install -r requirements.txt`

### Run the service 
Download and start the correct version mongodb depending on your OS 

then run `./news_pipeline_launcher.sh` to collect news and store them into database

Build the client side by running 
* `cd ~/NewsEngine/web_server/client`
* `npm run build`

Start the RPC_api service 
* `cd ~/NewsEngine/backend`
*  `python3 service.py`

Start the server by running 
* `cd ~/NewsEngine/web_server/server`
* `npm start`

By default, the server should be running at `localhost:3000`

## Enjoy searching News and find the mainstream media's attitude towards certain event/celebrity/country and more
### Usage
Once you get into the web application, feel free to type the thing you are interested in the search bar and select the date range. 

NewsEngine is able to return the news with news image, title and description. Besides, NewsEngine also generates two labels for each news, one is the news source, another one is the sentiment score, the higher the score is, the more positive the news is. Clicking the news card will open a new window which directs you to the news website where it gets published.

There is also a bottom named Toggle, clicking that bottom will present a pie chart summarizing the news's sentiments towards the keyword.  

##### see more in the project wiki!
