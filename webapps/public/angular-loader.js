/**
 * angular js is not common js module,
 * so we should have 'angular' object as prop of global object
 */
var globalObject = Function('return this')();

// no exports from angular
require('angular');

// exports prop of global
module.exports = globalObject.angular;
