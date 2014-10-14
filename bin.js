#! /usr/bin/env node

var fs = require('fs')

function usage () {
  var out = console.error
  out('USAGE: ')
  out('  hexpp {file} {options}')
  out('  {source} | hexpp {options}')
  out()
  out('      -g,--groups N    # bytes before showing a space')
  out('      -w,--wrap M      # bytes before wraping to another line')
  out('      -a,--ascii       # show ascii output to right')
  process.exit(1)
}

var opts = require('minimist')(process.argv.slice(2), {
  alias: {g: 'groups', w: 'wrap', a: 'ascii'}
})

var stream
if(process.stdin.isTTY) {
  if(opts._)
    stream = fs.createReadStream(opts._[0])
  else
    return usage()
}
  stream = process.stdin

var a = []
stdin
  .on('data', function (b) {
    a.push(b)
  })
  .on('end', function () {
    console.log(hexpp(Buffer.concat(a), opts))
  })

