// const request = require('request');

// const options = {
//   method: 'GET',
//   url: 'http://feed.linkmydeals.com/getOffers/',
//   qs: {
//     API_KEY: 'a3ef8739a073d48cf2f8df3561f7a1dc'
//   },
//   headers: {
//     'x-rapidapi-key': 'def91fab4dmsh7046be950c417b5p11cf2djsn2a056e55599f',
//     'x-rapidapi-host': 'linkmydeals.p.rapidapi.com',
//     useQueryString: true
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	var html2json = require('html2json').html2json;
//   var json2html = require('html2json').json2html;
//   let json = html2json(body);
//   console.log(json);
// });imp



// var express = require('express');
// var app = express();
// var html2json = require('html2json').html2json;
// var router = express.Router();
// var request = require('request');
// app.use(express.urlencoded({extended: true})); 
// app.use(express.json()); 


// router.get('/posts', function(req, res, next) {
//   request({
//     uri: 'http://feed.linkmydeals.com/getOffers/',
//     qs: {
//       api_key: 'a3ef8739a073d48cf2f8df3561f7a1dc'
//     }
//   }).pipe(html2json(res));
// });

// module.exports = router;


// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://27coupons.p.rapidapi.com/coupons/trending/',
//   params: {key: '0bf8773227msha929a43737c808dp186299jsn681ee40107fe'},
//   headers: {
//     'x-rapidapi-key': '0bf8773227msha929a43737c808dp186299jsn681ee40107fe',
//     'x-rapidapi-host': '27coupons.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });



// const express = require('express');
// const https = require('https');
// const app = express();

// app.get('/', function(req, res) {
//   const url =
//     'http://feed.linkmydeals.com/getOffers/?API_KEY=a3ef8739a073d48cf2f8df3561f7a1dc&format=json&incremental=0&last_extract=1624347910&off_record=1';
//   https.get(url, function(response) {
//     console.log(response.statusCode + ' OK');
//     response.on('data', function(data) {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.main.temp;
//       const desc = weatherData.weather[0].description;
//       const icon = weatherData.weather[0].icon;
//       const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

//       res.write('<h3>The weather is currently ' + desc + '</h3>');
//       //res.write('<img src=' + imageURL + '>');
//       res.write(
//         '<h1>The temperature in London is ' +
//           '<span>' +
//           temp +
//           '</span> ° Celsius.</h1>'
//       );
//       res.send();
//     });
//   });
//   //res.send('server is up!!!');
// });

// app.listen(3000, function() {
//   console.log('Server started!!!');
// });




var request = require("request")
const returnedDeals = [];
const API_KEY = 'demo'
const count = 5;

function getDeals(offset) {
    if (typeof offset == 'undefined') {
        offsetParam = null;
    } else {
        offsetParam = `offset=${offset}`;
    }
    const hapikeyParam = `hapikey=${API_KEY}`
    const paramsString = `?count=${count}&${hapikeyParam}&${offsetParam}`;

    const finalUrl = `https://api.hubapi.com/deals/v1/deal/paged${paramsString}`
    console.log(finalUrl)
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        parsedBody.deals.forEach(deal => {
            returnedDeals.push(deal);
        });
        if (parsedBody['hasMore']) {
            getDeals(parsedBody['offset'])
        } else {
            //print out all deals
            console.log(returnedDeals)
        }
    })
};

getDeals()