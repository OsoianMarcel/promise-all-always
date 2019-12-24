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
	 * @param {*} result The promise result
	 * @param {Boolean} isResolved Check if promise is resolved
	 * @constructor
	 */
	const PromiseAlwaysModel = function (result, isResolved) {
		this.result = result;
		this.isResolved = isResolved;
	};

	/**
	 * Promise all always
	 *
	 * @param {Promise[]} promises Array of promises
	 * @param {Object} [opts={}] Options
	 * @param {Boolean} [opts.rawResult=false] Set true to return raw promise results
	 * @return {Promise<any[]>} Array of promise results
	 */
	return (promises, opts) => {
		opts = Object.assign({}, {rawResult: false}, opts);

		if (!Array.isArray(promises)) {
			return Promise.reject(new Error('The parameter should be an array of promises'));
		}

		for (let i = 0; i < promises.length; i++) {
			if (typeof promises[i].then !== 'function') {
				promises[i] = Promise.resolve(promises[i]);
			}

			promises[i] = promises[i]
				.then(res => opts.rawResult ? res : new PromiseAlwaysModel(res, true))
				.catch(err => opts.rawResult ? err : new PromiseAlwaysModel(err, false));
		}

		return Promise.all(promises);
	};
});
