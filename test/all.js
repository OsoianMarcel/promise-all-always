const chai = require('chai'),
	chaiAsPromised = require('chai-as-promised')
	promiseAllAlways = require('../index');

chai.should();
chai.use(chaiAsPromised);

describe('All tests', function () {
	describe('#promiseAllAlways()', function () {
		it('should return same length of results number of promises', function () {
			promiseAllAlways([Promise.resolve(1), Promise.resolve(2)])
				.should.eventually.have.lengthOf(2);
		});

		it('should return 2 results [resolve: 1, catch: 2]', function (done) {
			promiseAllAlways([Promise.resolve(1), Promise.reject(2)])
				.then(res => {
					if (res.length !== 2) {
						return done('Length should be 2');
					}

					if (res[0].then !== 1) {
						return done('Promise[0] "then" result should be 1')
					}

					if (!res[0].isThen) {
						return done('Promise[0] "isThen" should be true')
					}

					if (res[1].catch !== 2) {
						return done('Promise[1] "catch" result should be 1')
					}

					if (!res[1].isCatch) {
						return done('Promise[1] "isCatch" should be true')
					}

					done();
				})
				.catch(err => done(err));

		})
	});
});