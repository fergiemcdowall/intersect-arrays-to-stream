
// This module takes an arbitrary number of sorted arrays, and returns
// the intersection as a stream. Arrays need to be sorted in order for
// this to work, but no error will be thrown if they are not sorted


var Readable = require('stream').Readable

exports.getIntersectionStream = function(sortedSets) {
  var s = new Readable

  var i = 0
  // walk along the set of given arrays
  while (sortedSets[sortedSets.length - 1].length > 0) {
    if (sortedSets[i][0] < sortedSets[i + 1][0]) {
      sortedSets[i].shift()
    }
    else if (sortedSets[i][0] > sortedSets[i + 1][0]) {
      sortedSets[i + 1].shift()
    }
    // there is an intersection between two arrays- now see if the
    // next array also contains this item
    else if ((i + 2) < sortedSets.length) {
      sortedSets[i].shift()
      i++
    }
    // All arrays have been traversed and the item was present in each
    // array. Therefore this item is in the intersection set. Emit the
    // item in the stream    
    else {
      s.push(sortedSets[i][0] + '')
      sortedSets[i].shift()
      sortedSets[i + 1].shift()
      i = 0
    }
  }

  s.push(null)      // indicates the end of the stream

  return s
}
