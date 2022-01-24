var coords = []

for (var i = 11; i < 89; i++) {
  var y = (i - (i % 10)) / 10
  var x = i % 10
  if (x == 0 || x == 9)
    continue
  coords.push({
    x: x,
    y: y,
    number: i
  })
}
console.log(coords)