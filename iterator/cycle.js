'use strict'
var iterator = require('./iterator'),
    symbol = require('./symbol')

module.exports =
function cycle(iter){
  return new Cycle(iter)
}

function Cycle(iter){
  this.iter = iter
}
Cycle.prototype[symbol] = function(){
  var iter = this.iter, it = iterator(iter)
  return {
    next: function(){
      var next = it.next()
      if(next.done){
        it = iterator(iter)
        next = it.next()
      }
      return next
    }
  }
}
