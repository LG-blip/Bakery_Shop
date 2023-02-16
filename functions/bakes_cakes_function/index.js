'use strict';
var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
app.use(express.json());
const tableName = 'Bakery'; // The table created in the Data Store
const columnName = 'location'; // The column created in the table

// The POST API that reports the alien encounter for a particular city
app.post('/alien', (req, res) => {
	console.log("I'm here")
	var cityJson = req.body;
	console.log(cityJson);
	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);
	//Create a JSON object with the rows to be inserted.
	let rowData = 
    { 
        flavour: req.body.flavour,
		location:req.body.location,
		quantity: req.body.quantity,
		price: req.body.price

    };

    //Use the table meta object to insert the row which returns a promise
    let datastore = catalystApp.datastore();
    let table = datastore.table('bakery');       // the exact table name should be used which is created in the datastore.
    let insertPromise = table.insertRow(rowData);  // insert row 
    insertPromise.then((row) => {
            console.log(row);
        });
});

// The GET API that checks the table for an alien encounter in that city 
app.get('/alien', (req, res) => {
	var city = req.query.city_name;

	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);

	// Queries the Catalyst Data Store table and checks whether a row is present for the given city
	getDataFromCatalystDataStore(catalystApp, city).then(cityDetails => {
		if (cityDetails.length == 0) {
			res.send({
				"message": "Hurray! No alien encounters in this city yet!",
				"signal": "negative"
			});
		} else {
			res.send({
				"message": "Uh oh! Looks like there are aliens in this city!",
				"signal": "positive"
			});
		}
	}).catch(err => {
		console.log(err);
		sendErrorResponse(res);
	})
});
/**
 * Checks whether an alien encounter is already reported for the given city by querying the Data Store table
 * @param {*} catalystApp 
 * @param {*} cityName 
 */
function getDataFromCatalystDataStore(catalystApp, cityName) {
	return new Promise((resolve, reject) => {
		// Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select * from " + tableName + " where " + columnName + "='" + cityName + "'").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

/**
 * Sends an error response
 * @param {*} res 
 */
function sendErrorResponse(res) {
	res.status(500);
	res.send({
		"error": "Internal server error occurred. Please try again in some time."
	});
}
module.exports = app;