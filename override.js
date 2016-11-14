const Module = require('module')
const realLoad = Module._load
const extend = require('util')._extend

Module._load = function(request, parent, isMain) {
  if (request === 'child_process') {
    let module = realLoad(request, parent, isMain)

    return require('./child_process')(module)
  }

  return realLoad(request, parent, isMain)
}
