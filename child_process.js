module.exports = function(cp) {

  ;['fork', 'exec', 'execFile', 'spawn', 'spawnSync', 'execSync', 'execFileSync'].map(function(method) {
    let ori = cp[method]
    cp[method] = function() {
      let args = [].slice.call(arguments)
      let res = ori.apply(cp, args)

      if (!process.send)
        return res

      process.send({
        type: 'child_process',
        data: {
          pid: res.pid,
          command: args[0]
        }
      })

      return res
    }
  })

  return cp
}
