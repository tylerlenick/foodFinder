console.log("this is loaded");

exports.yelp = {
  clientID: process.env.YELP_CLIENT_ID,
  apiKey: process.env.YELP_API_KEY
};

exports.zomato = {
  apiKey: process.env.ZOMATO_API_KEY
};
