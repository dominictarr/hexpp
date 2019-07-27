#! /usr/bin/env node

var hexpp = require('./')
var fs = require('fs')

function usage () {
  var out = console.error
  out('USAGE: ')
  out('  hexpp {file}')
  process.exit(1)
}

var stream
if(process.stdin.isTTY) {
  if(process.argv[2])
    stream = fs.createReadStream(process.argv[2])
  else {
    usage()
    process.exit(0)
  }
}
else
  stream = process.stdin

var a = []
stream
  .on('data', function (b) {
    a.push(b)
  })
  .on('end', function () {
    console.log(hexpp(Buffer.concat(a)))
  })


