'use strict'

/**
 * Creates a RollingAverage class with a memory size of {@param length}.
 * <p>
 * RollingAverage has in internal array of length {@param length} where it stores items FIFO.
 *
 * @param {number} length - Size of the internal array.
 * @constructor
 */
function RollingAverage (length) {
  if (length <= 0 || arguments.length === 0) throw TypeError('Expected non negative length.')
  this.sum = 0
  this.length = length
  this.filled = false
  this.pointer = 0
  this.array = []
}

/**
 * Adds numbers to the RollingAverage using FIFO.
 * @param {number | [number]} a - Items to add to the RollingAverage array.
 */
RollingAverage.prototype.add = function (a) {
  if (typeof (a) === 'number') {
    this._addNumber(a)
  } else if (Array.isArray(a)) {
    for (let i = 0; i < a.length; i++) {
      this._addNumber(a[i])
    }
  } else {
    throw TypeError('Unsupported argument type ' + typeof (a))
  }
}

/**
 * Private function that adds a single number to the array.
 * @param {number} a - The number to add to the array.
 * @throws TypeError if a is not a number.
 * @private
 */
RollingAverage.prototype._addNumber = function (a) {
  if (isNaN(a)) {
    throw TypeError('expected first argument to be an number')
  }
  if (this.array[this.pointer] !== undefined) {
    this.sum -= this.array[this.pointer]
  }

  this.array[this.pointer] = a
  this.sum += a

  if (this.pointer + 1 >= this.length) {
    this.pointer = 0
    this.filled = true
  } else {
    this.pointer++
  }
}

/**
 * Returns the average of the array.
 * <p>
 * Returns the average of the internal array filled FIFO. If the array has not
 * been filled completely yet it will only return the average of the filled portion of the array.
 * @returns {number} - The average of the array.
 */
RollingAverage.prototype.average = function () {
  return this.sum / (this.filled || this.pointer === 0 ? this.length : this.pointer)
}

/**
 * Exposes the class.
 * @type {Function}
 */
module.exports = RollingAverage
