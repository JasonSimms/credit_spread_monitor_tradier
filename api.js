const request = require('request');
const { TOKEN, BASE_URL, ACCOUNT_ID } = require('dotenv').config().parsed


/* Env variables */
// const BASE_URL = 'https://api.tradier.com/v1/'
// const ACCOUNT_ID = "XXXXXXXX"
// const TOKEN = "XXXXXXXX"


const BASE_HEADERS = {
    'Authorization': 'Bearer '+TOKEN,
    'Accept': 'application/json'
  }


const getProfile = () =>{
    request({
        method: 'get',
        url: BASE_URL + 'user/profile',
        headers: BASE_HEADERS
      }, (error, response, body) => {
          console.log(response.statusCode);
          console.log(body);
      });

}

const getBalance = () => {
    {
        request({
            method: 'get',
            url: BASE_URL + 'accounts/' + ACCOUNT_ID + '/balances',
            headers: BASE_HEADERS
          }, (error, response, body) => {
              console.log(response.statusCode);
              console.log(body);
          });
    
    }
}

const getHistory = () => {
    {
        request({
            method: 'get',
            url: BASE_URL + 'accounts/' + ACCOUNT_ID + '/history',
            // qs: {
            //     'page': '3',
            //     'limit': '100',
            //     'type': 'trade, option, ach, wire, dividend, fee, tax, journal, check, transfer, adjustment, interest',
            //     'start': 'yyyy-mm-dd',
            //     'end': 'yyyy-mm-dd',
            //     'symbol': 'SPY'
            //  },
            headers: BASE_HEADERS
          }, (error, response, body) => {
              console.log(response.statusCode);
              console.log(body);
          });
    
    }
}

const getPositions = () => {
    request({
        method: 'get',
        url: BASE_URL + 'accounts/' + ACCOUNT_ID + '/positions',
        qs: {
          
        },
        headers: BASE_HEADERS
      }, (error, response, body) => {
          console.log(response.statusCode);
          console.log(body);
      });
}

getPositions();