const chai = require('chai'),
	chaiAsPromised = require('chai-as-promised'),
	promiseAllAlways = require('../index');

chai.should();
chai.use(chaiAsPromised);

describe('All tests', function () {
	describe('#promiseAllAlways()', function () {
		it('should return same length of results number of promises', function () {
			return promiseAllAlways([Promise.resolve(1), Promise.resolve(2)])
				.should.eventually.have.lengthOf(2);
		});

		it('should return 2 results [resolve: 1, catch: 0]', function (done) {
			promiseAllAlways([Promise.resolve(1), Promise.reject(0)])
				.then(res => {
					if (res.length !== 2) {
						return done('Length should be 2');
					}

					if (res[0].value !== 1) {
						return done('Promise[0] "value" result should be 1')
					}

					if (!res[0].isThen) {
						return done('Promise[0] "isThen" should be true')
					}

					if (res[1].value !== 0) {
						return done('Promise[1] "value" result should be 0')
					}

					if (res[1].isThen) {
						return done('Promise[1] "isThen" should be false')
					}

					done();
				})
				.catch(err => done(err));
		});

		it('should throw an error when parameter is not an array', function (done) {
			promiseAllAlways(1, 2)
				.then(() => done('Should throw an error'))
				.catch(() => done());
		});

		it('should throw an error when at least one item is not a promise', function (done) {
			promiseAllAlways([Promise.resolve(1), '1', 1])
				.then(() => done('Should throw an error'))
				.catch(() => done());
		});

		it('should return raw promise values (rawResult)', function (done) {
			promiseAllAlways([Promise.resolve(1), Promise.reject(0), Promise.resolve(2)], {rawResult: true})
				.then(res => {
					if (res.length !== 3) {
						return done('Length should be 3');
					}

					if (res[0] !== 1) {
						return done('Promise[0] result should be 1');
					}

					if (res[1] !== 0) {
						return done('Promise[1] result should be false');
					}

					if (res[2] !== 2) {
						return done('Promise[1] result should be false');
					}

					done();
				})
				.catch(err => done(err));
		});
	});
});