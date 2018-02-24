# NewsEngine

> NewsEngine is designed to collect, analysie and present News from various sources.

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
Download correct version mongodb depending on your OS 

then run `./news_pipeline_launcher.sh` to collect news and store them into database

Build the client side by running 
* `cd ~/NewsEngine/web_server/client`
* `npm run build`

Start the server by running 
* `cd ~/NewsEngine/web_server/server`
* `npm start`

By default, the server should be running at `localhost:3000`



This project aims to collect news data from mainstream news websites. For now, I choose to focus on the news related to the movies, tv shows, and celebrities. It is designed to be automated and distributed. After the data acquisition, the system should be able to further clean and visualize the data.

see more in the project wiki
