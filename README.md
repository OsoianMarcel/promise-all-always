# promise-all-always
Execute all the promises whether they resolve or reject

[![Build Status](https://travis-ci.org/OsoianMarcel//promise-all-always.svg?branch=master)](https://travis-ci.org/OsoianMarcel/promise-all-always)
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/promise-all-always)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/OsoianMarcel/promise-all-always/blob/master/LICENSE)

## Install
```
// Yarn
yarn add promise-all-always
// NPM
npm install promise-all-always
```

## Example
```js
const promiseAllAlways = require('promise-all-always');

// Even if second promise is rejected, the execution will continue
// Use "result" property to receive promise result
// Use "isResolved" property to check if the promise is resolved or rejected
promiseAllAlways([
	Promise.resolve(1),
	Promise.reject(0),
	Promise.resolve('done')
]).then(values => {
	for (let value of values) {
		console.log(
			`Result: ${value.result}`,
			'\t',
			`Promise is ${value.isResolved ? 'resolved' : 'rejected'}`
		);
	}
});

// Return raw values (no object)
promiseAllAlways([Promise.resolve(1), Promise.reject(0), Promise.resolve('done')], {rawResult: true})
	.then(values => console.log('Raw result', values));

```
For more examples check [examples] folder.

## Testing
```bash
// Yarn
$ yarn test
// NPM
$ npm test
```

## Contribute

Contributions to the package are always welcome!

* Report any bugs or issues you find on the [issue tracker].
* You can grab the source code at the package's [Git repository].


## License

All contents of this package are licensed under the [MIT license].

[issue tracker]: https://github.com/OsoianMarcel/promise-all-always/issues
[Git repository]: https://github.com/OsoianMarcel/promise-all-always
[examples]: https://github.com/OsoianMarcel/promise-all-always/tree/master/examples
[MIT license]: LICENSE
