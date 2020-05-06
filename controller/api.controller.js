const express = require("express");
const router = express.Router({
  mergeParams: true
});
const service = require("../services/example.service");
const validator = require("../route-validation/example.validation");
const {
  paginator
} = require("../route-validation/paginator.validation");
const https = require('http');
const customerData = require('../customer');
const api = require('../api');



//Get all - paginate
// router.get("/", paginator, function (req, res) {
//   let petition = req.originalUrl;
//   const customer = req.query.customer;
//   petition = petition.replace('/api', '');
//   petition = petition.replace('?customer=' + customer, '');

//   const params = {
//     page: 0,
//     size: 4,
//     sort: "aired_date",
//     order: "desc",
//     filters: {
//       featured_category: "news",
//       media_type: "clip",
//       isTest: "false{boolean}"
//     },
//     featured_category: "news",
//     media_type: "clip",
//     isTest: "false{boolean}"
//   }


//   const postData = JSON.stringify(params);
//   const options = {
//     host: customerData[customer].api,
//     path: '/' + customerData[customer].path + '/vod/list',
//     port: 80,
//     method: 'POST',
//     headers: {
//       'Authorization': 'Basic ' + new Buffer(customerData[customer].user + ':' + customerData[customer].password).toString('base64'),
//       'Content-Length': postData.length,
//       'Content-Type': 'application/json',
//     }
//   };

//   let data = '';
//   const request = https.request(options, (resp) => {
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });
//     resp.on('end', () => {
//       res.json(data);
//     });

//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });
//   request.write(postData);
//   request.end();
// });

router.post("/", paginator, function (req, res) {

  let body = '';
  let petition = req.originalUrl;
  petition = petition.replace('/api', '').replace('?customer=' + req.query.customer, '');
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    req.body = body;
    req.petition = petition;
    api.post(req, res);
  });

});

router.get("/", paginator, function (req, res) {
  let body = '';
  let params = '';
  let petition = req.originalUrl.replace('/api', '')
  let splitted = petition.split('?customer=' + req.query.customer)
  petition = splitted[0];

  if (splitted[1].length > 0) {
    splitted[1].split('&').forEach(element => {
      if (element.length > 0) {
        params += element + '&';
      }
    });
  }
  
  if(params.length > 0){
    petition += '?' + params; 
  }

  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    req.body = body;
    req.petition = petition;
    api.get(req, res);
  });

});




module.exports = router;