
var num = new Buffer(4)
num.fill(0)
function byte (n) {
  if(n == null) return '  '
  return (n >> 4).toString(16) + (n & 15).toString(16)
}
function lineNumber(i) {
    num.writeUInt32BE(i, 0)
    return num.toString('hex')

}

module.exports = function (buffer, start, end) {
  start = start || 0
  var s = ''
  for(var i = 0; i < buffer.length; i += 16) {
    var line = buffer.slice(i, Math.min(i+16, buffer.length))
    s += lineNumber(i + start) + '  '
    for(var j = 0; j < 16; j++) {
      s += byte(line[j]) + ' '
      if(j == 7)
        s += ' '
    }
    s += ' |'
    for(var k = 0; k < 16; k++) {
      // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
      if(line[k] >= 0x20 && line[k] <= 0x7e)
        s += String.fromCodePoint(line[k])
      else if(line[k] != null)
        s += '.'
    }
    s += '|'
    if(i < buffer.length - 16)
      s += '\n'
  }
  if(end)
  s += '\n' + lineNumber(buffer.length + start) + '\n'
  return s
}







