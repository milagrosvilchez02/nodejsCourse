console.log(__filename);
console.log(__dirname);

var url = "http://mylogger.io/log";

function log(message) {
  //send http request
  console.log(message);
}
//module.exports.log = log;
//esto exporta un objeto, para exportar la funcion se hace:
module.exports = log;

//what happens is that node does not execute the code directly, it wraps it inside of a inmediately involved funcion expression.
//a module wrapper function.
//here you can see that the require function is not global, but local in each module.
// we also have exports which is a shortcut to module.exports
// (function(exports, require, module, __filename, __dirname) {
//     var x =;

//if you want to add a function to module.exports object, you can either write
//module.exports.log = log;
//or
//exports.log = log;
//but you cant do it like we did earlier
//exports = log; THIS IS WRONG. cause this exports is a reference to module.exports and we cannot change that reference.
// })
