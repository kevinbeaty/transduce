"use strict";
var tp = require('transduce-reduced'),
    undef;

module.exports = partitionBy;
function partitionBy(f) {
  return function(xf){
    return new PartitionBy(f, xf);
  };
}
function PartitionBy(f, xf) {
  this.xf = xf;
  this.f = f;
}
PartitionBy.prototype.init = function(){
  return this.xf.init();
};
PartitionBy.prototype.result = function(result){
  var ins = this.inputs;
  if(ins.length){
    this.inputs = [];
    result = this.xf.step(result, ins);
  }
  return this.xf.result(result);
};
PartitionBy.prototype.step = function(result, input) {
  var ins = this.inputs,
      curr = this.f(input),
      prev = this.prev;
  this.prev = curr;

  if(ins === undef){
    this.inputs = [input];
  } else if(prev === curr){
    ins.push(input);
  } else {
    this.inputs = [];
    result = this.xf.step(result, ins);
    if(!tp.isReduced(result)){
      this.inputs.push(input);
    }
  }
  return result;
};