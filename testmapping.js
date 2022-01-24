const mapping = require('./mappings/mk2.json')

var output = { '144': {}, '176': {}}

var counter = 0

for (var two of mapping.topRow.two) {
  //if (!Object.prototype.hasOwnProperty(output, mapping.topRow.one)) {
  //  output[mapping.topRow.one] = {}
  //}
  output[mapping.topRow.one][two] = [0, counter]
  counter++
}

counter = 0

for (var two of mapping.sideColumn.two) {
  //if (!Object.prototype.hasOwnProperty(output, mapping.sideColumn.one)) {
  //  output[mapping.sideColumn.one] = {}
  //}
  output[mapping.sideColumn.one][two] = [2, counter]
  counter++
}

var rowCounter = 0

for (var row of mapping.centerRows) {
  counter = 0
  for (var two of row.two) {
    // if (!Object.prototype.hasOwnProperty(output, row.one)) {
    //   output[row.one] = {}
    // }
    output[row.one][two] = [1, (rowCounter * 8) + counter]
    counter++
  }
  rowCounter++
}

console.log(output)