const http = require('http');
const customerData = require('./customer');

function getCustomer(customer) {
    const customerObj = customerData[customer];
    if (customerObj) {
        return customerObj;
    } else {
        return {
            api: customer + '-api.univtec.com',
            path: 'index.php',
            user: customer + '_portal',
            password: 'Univtec1@'
        }
    }
}

const get = function (req, res) {
    const customer = getCustomer(req.query.customer);
    const options = {
        host: customerData[customer].api,
        path: '/' + customerData[customer].path + req.petition,
        port: 80,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + new Buffer(customerData[customer].user + ':' + customerData[customer].password).toString('base64'),
        }
    };

    let data = '';
    const request = http.request(options, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            let response = null;
            try {
                response = JSON.parse(data);
            } catch (e) {
                response = {
                    content: null
                };
            }

            res.json(response);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    request.write(req.body);
    request.end();
}

const post = function (req, res) {
    const customer = getCustomer(req.query.customer);
    const options = {
        host: customerData[customer].api,
        path: '/' + customerData[customer].path + req.petition,
        port: 80,
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer(customerData[customer].user + ':' + customerData[customer].password).toString('base64'),
            'Content-Length': req.body.length,
            'Content-Type': 'application/json',
        }
    };
    let data = '';
    const request = http.request(options, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.json(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    request.write(req.body);
    request.end();
}


module.exports = {
    get,
    post
};