require('./override.js')
const cp = require('child_process')

let f = cp.fork('./interval')
