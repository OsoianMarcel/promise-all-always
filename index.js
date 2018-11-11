/**
 * Data model
 *
 * @param {*} value
 * @param {Boolean} isThen
 * @constructor
 */
const PromiseAlwaysModel = function(value, isThen) {
	this.value = value;
	this.isThen = isThen;
};

/**
 * Promise all always
 *
 * @param {Promise[]} promises Array of promises
 * @return {Promise<any[]>} Array of promise results
 */
module.exports = promises => {
	if (!Array.isArray(promises)) {
		return Promise.reject(new Error('The parameter should be an array of promises'));
	}

	for (let i = 0; i < promises.length; i++) {
		if (typeof promises[i].then !== 'function') {
			return Promise.reject(new Error('The parameter[' + i + '] should be a promise'));
		}

		promises[i] = promises[i]
			.then(val => new PromiseAlwaysModel(val, true))
			.catch(err => new PromiseAlwaysModel(err, false));
	}

	return Promise.all(promises);
};