/*const OS = require('os')
//process.env.UV_THREADPOOL_SIZE = 
console.log(OS.cpus().length)*/
const cpuValues = new Float64Array(6 * process.binding("util").pushValToArrayMax);
function f(){console.log(arguments);}
console.log(process.binding("os").getCPUs(f,cpuValues,[]));
console.log(cpuValues);