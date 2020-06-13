'use strict'

require('mocha')
const assert = require('assert')
const Srol = require('./')

/**
 * Tests Srol class functions and properties.
 */
describe('Srol', function () {
  it('should export a function', function () {
    assert(typeof Srol === 'function')
  })

  it('should thrown an error for a non positive length', function () {
    let test = null
    assert.throws(() => {
      test = new Srol()
    }, TypeError)
    assert.throws(() => {
      test = new Srol(-1)
    }, TypeError)
    assert(test === null)
  })

  it('should start off with an average of 0', function () {
    const rollingAverage = new Srol(1)
    assert(rollingAverage.average() === 0)
  })

  it('should only accept numbers', function () {
    const rollingAverage = new Srol(1)
    assert.throws(() => {
      rollingAverage.add('1')
    }, TypeError)
    assert.throws(() => {
      rollingAverage.add(['yes'])
    }, TypeError)
  })

  // [1.5, 4.5] has an average of 3.
  it('should return the correct average for a non full array', function () {
    const rollingAverage = new Srol(3)
    rollingAverage.add([1.5, 4.5])
    assert(!rollingAverage.filled)
    assert(rollingAverage.average() === 3)
  })

  // [1.5, 4.5, 6] has an average of 4.
  it('should return the correct average for a full array', function () {
    const rollingAverage = new Srol(3)
    rollingAverage.add([1.5, 4.5])
    rollingAverage.add(6)
    assert(rollingAverage.filled)
    assert(rollingAverage.average() === 4)
  })

  // size 3: [1.5, 4.5, 6].add(4.5) -> [4.5, 4.5, 6] has an average of 4.5
  it('should correctly apply FIFO', function () {
    const rollingAverage = new Srol(3)
    rollingAverage.add([1.5, 4.5, 6])
    rollingAverage.add(4.5)
    assert(rollingAverage.filled)
    assert(rollingAverage.average() === 5)
  })
})
