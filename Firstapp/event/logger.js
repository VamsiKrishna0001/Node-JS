
       const EventEmitter = require('events');
    //   const emitter = new EventEmitter();

       


var url = 'http://mylog.io/log';

class Logger extends EventEmitter{
log(message){
// Send an HTTP request
console.log(message);
this.emit('messageLogged',{id:1,url:'http://'});
}
//Raise an Event 

}

// module.exports.log = log;
module.exports= Logger;