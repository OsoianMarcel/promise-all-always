// Do not forget to install the library
const promiseAllAlways = require('promise-all-always');

// Fake emails
const emails = [
	'marcel@mail.com',
	'maria@mail.com',
	'admin@mail.com',
	'webmaster@mail.com',
	'other@email.com'
];

// Prepare send email promises
const sendEmailPromises = emails.map(email => fakeSendEmail(email));

// Pass promises to "promise-all-always" library (similar to Promise.all)
promiseAllAlways(sendEmailPromises)
	.then(results => {
		const countTotal = emails.length;
		const countFailed = results.filter(result => !result.isResolved).length;

		console.log('[Sending Report]');
		console.log(`Total/Failed: ${countTotal}/${countFailed}`);

		console.log('------------------');

		console.log('[Detailed Report]');
		for (let i = 0; i < emails.length; i++) {
			let email = emails[i],
				result = results[i];

			console.log(`${email}: \t\t ${result.isResolved ? 'Sent' : 'Error'}`);
		}
	});

/**
 * Function used to simulate send email
 * It is used for demo purposes
 *
 * @param {String} email Email address
 * @return {Promise<String>} Send result
 */
function fakeSendEmail(email) {
	// Random success/failure
	if (Math.round(Math.random())) {
		return Promise.resolve(`OK: ${email}`);
	} else {
		return Promise.reject(new Error(`Error: ${email}`));
	}
}
