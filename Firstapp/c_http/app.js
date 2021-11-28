
const { Socket } = require('dgram');
const http = require('http');

 const server = http.createServer((req,res)=>{
     if(req.url === '/'){
         res.write('Hello!!');
         res.end();
     }

     if(req.url === '/api/courses'){
         res.write(JSON.stringify([1, 2, 3]));
         res.end();
     }

 });



 // this is old way of doing
//  server.on('connection',(socket)=>{
//      console.log('New Connection');
//  });

server.listen(4444);

console.log('Listening on port 4444 ....');
