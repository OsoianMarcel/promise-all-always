// Do not forget to install the library
const promiseAllAlways = require('promise-all-always');

// Array variable used to store all promises
const httpPromises = [];

// Simulate multiple http requests with responses and errors
httpPromises.push(fakeHttpRequest(true, 1000));
httpPromises.push(fakeHttpRequest(true, 300));
httpPromises.push(fakeHttpRequest(false, 2000));
httpPromises.push(fakeHttpRequest(true, 300));
httpPromises.push(fakeHttpRequest(false, 50));
httpPromises.push(fakeHttpRequest(true, 750));

// Call the library "promise-all-always" to execute all promises whatever with errors or not
promiseAllAlways(httpPromises)
	.then(results => {
		console.log('Output all results');
		for (let i = 0; i < results.length; i++) {
			let result = results[i];

			console.log(
				i,
				result.isResolved ? 'resolved' : 'rejected',
				result.result
			);
		}

		console.log('------------------');

		console.log('Filter errors');
		const errors = results.filter(r => !r.isResolved);
		console.log('Count errors:', errors.length);
		console.log('Output errors:', errors.map(err => err.result.message).join(', '));

		console.log('------------------');

		console.log('Filter responses');
		const responses = results.filter(r => r.isResolved);
		console.log('Count responses:', responses.length);
		console.log('Output responses:', responses.map(resp => resp.result).join(', '));
	});

/**
 * Function used to simulate http requests
 * It is used for demo purposes
 *
 * @param {Boolean} isSuccess Set true to simulate success response, otherwise error response
 * @param {Number} [reqTimeMs=1e3] Set time in milliseconds to simulate request wait time
 * @return {Promise<String>} Http response
 */
function fakeHttpRequest(isSuccess, reqTimeMs = 1e3) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isSuccess) {
				resolve('Ok');
			} else {
				reject(new Error(`ErrCode: ${Date.now()}`));
			}
		}, reqTimeMs);
	});
}
