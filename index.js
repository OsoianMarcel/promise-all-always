class PromiseAllAlwaysModel {
	constructor(res, err, isThen) {
		this.then = res;
		this.catch = err;
		this.value = isThen ? res : err;

		this.isThen = isThen;
		this.isCatch = !isThen;
	}
}

module.exports = promises => {
	promises = promises.map(p => {
		return p.then(v => new PromiseAllAlwaysModel(v, undefined, true))
			.catch(err => new PromiseAllAlwaysModel(undefined, err, false));
	});

	return Promise.all(promises);
};