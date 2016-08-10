
// This module takes an arbitrary number of sorted arrays, and returns
// the intersection as a stream. Arrays need to be sorted in order for
// this to work, but no error will be thrown if they are not sorted


var Readable = require('stream').Readable

exports.getIntersectionStream = function(sortedSets) {
  var s = new Readable
  var i = 0    // identifies array
  var ii = []  // identifies index in each array
  for (var k = 0; k < sortedSets.length; k++) {
    ii[k] = 0
  }

  var finished = false
  // walk along the set of given arrays
  while (!finished) {
    if (sortedSets[i][ii[i]] < sortedSets[i + 1][ii[i + 1]]) {
      ii[i]++
      // sortedSets[i].shift()
    }
    else if (sortedSets[i][ii[i]] > sortedSets[i + 1][ii[i + 1]]) {
      ii[i + 1]++
      // sortedSets[i + 1].shift()
    }
    // there is an intersection between two arrays- now see if the
    // next array also contains this item
    else if ((i + 2) < sortedSets.length) {
      ii[i]++
      // sortedSets[i].shift()
      i++
    }
    // All arrays have been traversed and the item was present in each
    // array. Therefore this item is in the intersection set. Emit the
    // item in the stream    
    else {
      s.push(sortedSets[i][ii[i]] + '')
      ii[i]++
      ii[i + 1]++

      for (var k = 0; k < sortedSets.length; k++) {
        if (ii[k] >= sortedSets[k].length) finished = true
      }
      i = 0
    }
  }

  // indicates the end of the stream
  s.push(null)

  return s
}
