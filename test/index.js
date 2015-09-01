'use strict'

require('babel/register')({
  optional: ['es7.decorators', 'es7.objectRestSpread']
})

var test = require('tape')
var web = require('../')

@web.controller('/check')
class Check {
  @web.route('get', '/in')
  checkIn(request, reply) {
    
  }
}

let check = new Check()

test('instance has routes function', function (t) {
  t.ok(typeof check.routes === 'function', 'Has `routes` function')
  t.end()
})

test('instance generates routes array', function (t) {
  var results = check.routes()

  t.ok(Array.isArray(results), 'results is an array')
  t.equal(results.length, 1, 'Has one result')

  let first = results[0]

  t.equal(first.method, 'get', 'method is get')
  t.equal(first.path, '/check/in', 'path is merged with controller path')
  t.equal(typeof first.handler, 'function', 'handler is a function')
  t.end()
})
