var hexdump = require('../')

var fs = require('fs')
var path = require('path')
var binary = fs.readFileSync(path.join(__dirname, 'data', 'README.md.gz'))
var dump = fs.readFileSync(path.join(__dirname, 'data', 'README.md.gz.hexdump'), 'utf8')

var tape = require('tape')

tape('equal to hexdump -C output', function (t) {

  console.log(binary.slice(0, 16))
  t.equal(hexdump(binary.slice(0, 16)), dump.split('\n')[0])
  console.log(hexdump(binary.slice(0, 32)))
  t.equal(hexdump(binary.slice(0, 32)), dump.split('\n').slice(0, 2).join('\n'))

  var start = binary.length - binary.length%16
  var output = hexdump(binary.slice(start, binary.length), start)
  console.log(output)
  var lines = dump.split('\n')
  t.equal(output, lines[lines.length - 3])

  t.equal(hexdump(binary, 0, true), dump)

  t.end()

})



