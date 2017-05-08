'use strict';

/* fetch Promise checkStatus */

function checkStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return Promise.resolve(res);
	} else {
		let error = new Error(res.statusText);
		error.response = res;
		return Promise.reject(error);
	}
}

const reqDetails = {
	"url": "https://api.flightmap.io/api/v1/vrp",
	"method": "POST",
	"headers": {
		"Authorization": "772ea600-78ad-11e6-a56b-0bff586a75e5",
		"Content-Type": "application/json; charset=utf-8"
	},
	"rejectUnauthorized": false,
	"body": {
		
		"fleet":[{
			"id":1,
			"lat":30.7188978,
			"lng":76.8102981,
			"latEnd":30.7188978,
			"lngEnd":76.8102981,
			"returnToStart":0
		}],
		
		"maxVisits":6,
		"polylines": false,
		"distanceCalculation": false,
		"speed":40,
		"decideFleetSize":1
	}
};

const makeRequest = function(
	payload,
	url = reqDetails.url,
	method = reqDetails.method,
	rejectUnauthorized = reqDetails.rejectUnauthorized,
	headers = reqDetails.headers
) {
	const options = {method, rejectUnauthorized, headers};
	if(payload){
		options.body = JSON.stringify({
			...reqDetails.body,
			service:  payload
		});
	}
	
	//console.log('CALL options', url, options);
	return fetch(`${url}`, options )
		.then(checkStatus)
		.then(result => result.json())
};

export default makeRequest;
