(function (name, definition) {
	if (typeof define === 'function') {
		define(definition);
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = definition();
	} else {
		const theModule = definition(), global = this, old = global[name];
		theModule.noConflict = function () {
			global[name] = old;
			return theModule;
		};
		global[name] = theModule;
	}
})('promiseAllAlways', function () {
	/**
	 * Data model
	 *
	 * @param {*} value
	 * @param {Boolean} isThen
	 * @constructor
	 */
	const PromiseAlwaysModel = function (value, isThen) {
		this.value = value;
		this.isThen = isThen;
	};

	/**
	 * Promise all always
	 *
	 * @param {Promise[]} promises Array of promises
	 * @param {Object} [opts={}] Options
	 * @param {Boolean} [opts.rawResult=false] Set true to return raw promise values
	 * @return {Promise<any[]>} Array of promise results
	 */
	return (promises, opts) => {
		opts = Object.assign({}, {rawResult: false}, opts);

		if (!Array.isArray(promises)) {
			return Promise.reject(new Error('The parameter should be an array of promises'));
		}

		for (let i = 0; i < promises.length; i++) {
			if (typeof promises[i].then !== 'function') {
				return Promise.reject(new Error('The parameter[' + i + '] should be a promise'));
			}

			promises[i] = promises[i]
				.then(val => opts.rawResult ? val : new PromiseAlwaysModel(val, true))
				.catch(err => opts.rawResult ? err : new PromiseAlwaysModel(err, false));
		}

		return Promise.all(promises);
	};
});