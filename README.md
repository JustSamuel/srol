# srol [![NPM version](https://img.shields.io/npm/v/srol.svg?style=flat)](https://www.npmjs.com/package/srol) [![NPM total downloads](https://img.shields.io/npm/dt/srol.svg?style=flat)](https://npmjs.org/package/srol)
Maintaining a simple dynamic rolling average.

The rolling average is the unweighted mean of the previous _i_ numbers where _i_ is the length 
or argument of the rolling average.
## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save srol
```

## Usage
```js
let srol = require('srol');
```

To create a rolling average of length *n*  use:

```js
let rollingAverage = new srol(n);
```

## Methods

### add
To add a number, or an array of numbers, to the rolling average use:
```js
rollingAverage.add(n);
```
add will throw a TypeError if n is not a number or an array containing not a number.

### average
Returns the average of the last `rollingAverage.length` numbers.
 ```js
 rollingAverage.average();
 ```

## Example
Simple example or test of the rolling average.
```js
let rollingAverage = new srol(3);
rollingAverage.add(5);
```
Since there is only 1 number in the array, the average will be 5.
```js
rollingAverage.add(4);
rollingAverage.add(6);
```
Now the array is 'full' and the average will be 5, (4+5+6)/3.
```js
rollingAverage.add(7);
```
The first number, 5, is replaced by a 7 and the average becomes 6.
```sh
> rollingAverage.average();
6
```

## Running Tests
Test cover the basic function and requirements of the rolling average.
```sh
$ npm install && npm test
```

## Contributing
Pull requests are always welcome.