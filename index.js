'use strict'
var core = require('./core'),
    merge = core.util.objectMerge
module.exports = merge(merge({
    iterators: require('./iterators'),
    array: require('./array'),
    math: require('./math'),
    push: require('./push'),
    string: require('./string'),
    unique: require('./unique')
  }, core), require('./common'))
