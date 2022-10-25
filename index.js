//Framework hapi.js
const express = require('express');

function calcKv100(vindex,kv40) {
    var Vi,b;
    var n = 2;
    do {
       Vi = calcVi(kv40,n); 
       n = n + 0.01;
       } while ( Vi <= vindex && n <= 500.00);
       n = parseInt(n * 100 + 0.01) / 100
    return n;
} 

function calcVi(Q1,Q2) {
    var Q3,Q4,Q5,Q6,Q7;
    if ( Q2 >= 2 && Q2 < 4){
        Q3 = 0.827 * Math.pow(Q2,2) + 1.632 * Q2 - 0.181;
        Q4 = 0.3094 * Math.pow(Q2,2) + 0.182 * Q2;
        Q6 = (Q3 + Q4 - Q1) / Q4 * 100;
    }
      
   if ( Q2 >= 4 && Q2 < 6.1){
        Q3 = -2.6758 * Math.pow(Q2,2) + 96.671 * Q2 - 269.664 * Math.sqrt(Q2) + 215.025;
        Q4 = -7.1955 * Math.pow(Q2,2) + 241.992 * Q2 - 725.478 * Math.sqrt(Q2) + 603.88;
        Q6 = (Q3 + Q4 - Q1) / Q4 * 100;          
    }

   if ( Q2 >= 6.1 && Q2 < 7.2){
        Q3 = 2.32 * Math.pow(Q2,1.5626);
        Q4 = 2.838 * Math.pow(Q2,2) - 27.35 * Q2 + 81.83;
        Q6 = (Q3 + Q4 - Q1) / Q4 * 100;
    }
      
   if ( Q2 >= 7.2 && Q2 < 12.4){
        Q3 = 0.1922 * Math.pow(Q2,2) + 8.25 * Q2 - 18.728;
        Q4 = 0.5463 * Math.pow(Q2,2) + 2.442 * Q2 - 14.16;
        Q6 = (Q3 + Q4 - Q1) / Q4 * 100;
    }    
      
   if ( Q2 >= 12.4 && Q2 <= 70){
        Q3 = 1795.2 * Math.pow(Q2,(-2)) + 0.1818 * Math.pow(Q2,2) + 10.357 * Q2 - 54.547;
        Q4 = 0.6995 * Math.pow(Q2,2) - 1.19 * Q2 + 7.6;
        Q6 = (Q3 + Q4 - Q1) / Q4 * 100;
    }  
                
   if ( Q2 > 70){
        Q3 = 0.1684 * Math.pow(Q2,2) + 11.85 * Q2 -97;
        Q5 = 0.8353 * Math.pow(Q2,2) + 14.67 * Q2 -216;
        Q4 = 0.6669 * Math.pow(Q2,2) + 2.82 * Q2 -119;
        Q6 =(Q5 - Q1) / Q4 * 100;
    }
if (Q6 >= 100) {
    Q7 = ((Math.log(Q3) / Math.log(10)) - (Math.log(Q1) / Math.log (10))) / ( Math.log(Q2)/ Math.log(10));
    Q6 = (( Math.pow(10,Q7)-1) / 0.00715 ) + 100;
}  

Q6 = parseInt(Q6 + 0.5);  

return Q6;
} 

// logic port and machine

const port = process.env.PORT || 8000; 

// Create Server
const server = express();

// Initiate Server
/* const init = async () => {

    await server.start();
    console.log("Server up no porto: " + port);

} */
//Define routes
//require('./routes/routes')(server);

server.get('/', function (req, res) {
        var data = {
            msg: 'API Calculadora'
        };

        res.json(data);
    }
);

server.get('/visc100/:visc40/:vindx', function (req, res){
    const visc40 = parseInt(req.params.visc40);
    const vindx = parseInt(req.params.vindx);
    const result = calcKv100(visc40, vindx);
    res.json(result);
});

server.listen(port, () => {
    console.log('escuchando', port)
})
