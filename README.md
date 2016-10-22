# hexpp

Pretty print buffers in the same format as `hexdump -C`

``` js
var hexpp = require('hexpp')
var binary = new Buffer('hello, binary world!')

console.log(hexpp(binary))

```
output:

```
00000000  68 65 6c 6c 6f 2c 20 62  69 6e 61 72 79 20 77 6f  |hello, binary wo|
00000010  72 6c 64 21                                       |rld!|
```

## hexpp(buffer, line, showLength)

`buffer` is a binary buffer,

if `line` is provided, it will be added to the line number (left column)
you should use this if you are printing a stream of buffers with more than one call to hexpp.

if `showLength` is true, return a final line with the length of the total buffer in the line column.


## License

MIT



