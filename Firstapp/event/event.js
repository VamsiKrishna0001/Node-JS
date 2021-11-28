
       const EventEmitter = require('events');
        // const emitter = new EventEmitter();
// register a listener to know the event is raised

    //    emitter.on('messageLogged',function(){
    //     console.log('Listener Called');
    // });

// with the argument
// emitter.on('messageLogged',function(arg){
//     console.log('Listener Called',arg);
// });

    const Logger = require('./logger');
    const logger = new Logger();

    // register a listener to know the event is raised
    // with the argument
       logger.on('messageLogged',function(arg){
        console.log('Listener Called',arg);
    });

    logger.log('Logged');

       // to Raise an event 
    //    emitter.emit('messageLogged');

       // to Raise an event  with arguments
    //    emitter.emit('messageLogged',{ id:1,url:'http://'});


       

       

       
