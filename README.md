# hexpp

Pretty print buffers with configurable grouping and wrapping.
more useful than node's Buffer#toString()

``` js
var hexpp = require('hexpp')
var binary = new Buffer('hello, binary world!')

console.log(hexpp(binary, {groups: 4, wrap: 16}))

```
output:

```
68656c6c 6f2c2062 696e6172 7920776f 
726c6421 

```

## hexpp(buffer, opts={groups: n, wrap: m})

`buffer` is a binary buffer,
and opts is an optional object,
`groups` is how many bytes before a space is inserted (default 4),
`wrap` is how many bytes before a newline is inserted (default 16)

it will look weird if `wrap` is not a multiple of `groups`.

## License

MIT
