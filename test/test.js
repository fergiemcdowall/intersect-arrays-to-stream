var test = require('tape')
var iats = require('../')

test('do a simple intersection with single digit numbers', function (t) {
  t.plan(2)
  var arr1 = [1, 2, 3, 4, 5, 8, 9]
  var arr2 = [5, 8]
  var arr3 = [5, 8]
  var arr4 = [1, 5, 8]
  var result = []
  iats.getIntersectionStream([arr1, arr2, arr3, arr4])
    .on('data', function(data) {
      result.push(data.toString())
    })
    .on('end', function(err) {
      t.error(err)
      t.looseEqual(result, ['5', '8'])
    })
})


test('do a simple intersection with multi-digit numbers', function (t) {
  t.plan(2)
  var arr = [
    [50, 800],
    [1, 50, 800],
    [1, 2, 3, 4, 50, 800, 9999],
    [50, 800]
  ]
  var result = []
  iats.getIntersectionStream(arr)
    .on('data', function(data) {
      result.push(data.toString())
    })
    .on('end', function(err) {
      t.error(err)
      t.looseEqual(result, ['50', '800'])
    })
})

test('do a simple intersection with strings', function (t) {
  t.plan(2)
  var arr = [
    "Lorem ipsum dolor sit amet, ea movet euismod deserunt sed. Te has doming antiopam postulant.".split(' ').sort(),
    "Lorem ipsum dolor sit amet, ea movet euismod deserunt sed.".split(' ').sort(),
    "ea movet euismod deserunt sed. Te has doming antiopam postulant.".split(' ').sort()
  ]
  var result = []
  iats.getIntersectionStream(arr)
    .on('data', function(data) {
      result.push(data.toString())
    })
    .on('end', function(err) {
      t.error(err)
      t.looseEqual(result, [ 'deserunt', 'ea', 'euismod', 'movet', 'sed.' ])
    })
})