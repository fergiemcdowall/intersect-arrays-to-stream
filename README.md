# intersect-arrays-to-stream
Takes an arbitrary amount of sorted arrays and returns the intersect as a stream

```javascript
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
      // result is now [ 'deserunt', 'ea', 'euismod', 'movet', 'sed.' ]
    })
```
