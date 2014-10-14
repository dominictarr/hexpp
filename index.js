#! /usr/bin/env node

function toHex (buf, group, wrap, LE, ascii) {
  toAscii = ascii ? asciipp : function() { return ''; };
  buf = buf.buffer || buf
  var s = ''
  var l = buf.byteLength || buf.length
  for(var i = 0; i < l ; i++) {
    var byte = (i&0xfffffffc)|(!LE ? i%4 : 3 - i%4)
    s = s + ((buf[byte]>>4).toString(16))
          + ((buf[byte]&0xf).toString(16))
          + (group-1==i%group ? ' ' : '')
          + (wrap-1==i%wrap ? toAscii(buf.slice(i-wrap+1, i+1), i, wrap) + '\n' : '')
  }
  return s + '\n'
}

function reverseByteOrder(n) {
  return (
    ((n << 24) & 0xff000000)
  | ((n <<  8) & 0x00ff0000)
  | ((n >>  8) & 0x0000ff00)
  | ((n >> 24) & 0x000000ff)
  )
}

function asciipp(buf, i, wrap) {
  console.log(i-wrap, i);
  debugger;
  var arr = [].slice.call(buf);
  // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
  var placeholder = '.'.charCodeAt(0);
  var printables = arr.map(function(b) { return b > 0x19 && b < 0x7f ? b : placeholder; });
  return String.fromCharCode.apply(null, printables);
}

var hexpp = module.exports = function (buffer, opts) {
  opts = opts || {}
  opts.groups = opts.groups || 4
  opts.wrap = opts.wrap || 16
  return toHex(buffer, opts.groups, opts.wrap, opts.bigendian, opts.ascii)
}

hexpp.defaults = function (opts) {
  return function (b) {
    return hexpp(b, opts)
  }
}

if(!module.parent && process.title != 'browser') {
  var a = []
  process.stdin
  .on('data', function (b) {
    a.push(b)
  })
  .on('end', function () {
    console.log(hexpp(Buffer.concat(a)))
  })

}
