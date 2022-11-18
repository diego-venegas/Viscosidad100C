//Framework hapi.js
const express = require('express');

function clearVi() {
	document.getElementById("vi-kv40").value = "";
   document.getElementById("vi-kv100").value = "";
   document.getElementById("vi-vi").value = "";
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


function solveVi() {
	document.getElementById("vi-kv40").value = document.getElementById("vi-kv40").value.replace(/,/, ".");
	document.getElementById("vi-kv100").value = document.getElementById("vi-kv100").value.replace(/,/, ".");

	document.getElementById("vi-vi").value = document.getElementById("vi-vi").value.replace(/,/, ".");

	if(document.getElementById("vi-kv40").value == "" || isNaN(document.getElementById("vi-kv40").value)) {
		alert("Please enter a number as KV40!");
		document.getElementById("vi-kv40").value = "";
		document.getElementById("vi-kv40").focus();
		return false;
	}
	if(document.getElementById("vi-kv100").value == "" || isNaN(document.getElementById("vi-kv100").value)) {
		alert("Please enter a number as KV100!");
		document.getElementById("vi-kv100").value = "";
		document.getElementById("vi-kv100").focus();
		return false;
	}
	if(parseFloat(document.getElementById("vi-kv40").value) < 2) {
		alert("Please enter a KV40 higher than 2!");
		document.getElementById("vi-kv40").value = "";
		document.getElementById("vi-kv40").focus();
		return false;
	}
	if(parseFloat(document.getElementById("vi-kv100").value) < 2) {
		alert("Please enter a KV100 higher than 2!");
		document.getElementById("vi-kv100").value = "";
		document.getElementById("vi-kv100").focus();
		return false;
	}
	if(parseFloat(document.getElementById("vi-kv40").value) <= parseFloat(document.getElementById("vi-kv100").value)) {
		alert("KV40 must be superior than KV100!");
		document.getElementById("vi-kv40").value = "";
		document.getElementById("vi-kv100").value = "";
		document.getElementById("vi-kv40").focus();
		return false;
	}
	var kv100 = parseFloat(document.getElementById("vi-kv100").value);
	var kv40 = parseFloat(document.getElementById("vi-kv40").value);
	var result = calcVi(kv40, kv100);


	document.getElementById("vi-vi").value = result;
}

function clearKv100() {
	document.getElementById("kv100-vi").value = "";
	document.getElementById("kv100-kv40").value = "";
    document.getElementById("kv100-kv100").value = "";
}

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

function solveKv100() {
	document.getElementById("kv100-vi").value = document.getElementById("kv100-vi").value.replace(/,/, ".");
	document.getElementById("kv100-kv40").value = document.getElementById("kv100-kv40").value.replace(/,/, ".");

	if(document.getElementById("kv100-vi").value == "" || isNaN(document.getElementById("kv100-vi").value)) {
		alert("Please enter a number as Viscosity Index!");
		document.getElementById("kv100-vi").value = "";
		document.getElementById("kv100-vi").focus();
		return false;
	}
	if(document.getElementById("kv100-kv40").value == "" || isNaN(document.getElementById("kv100-kv40").value)) {
		alert("Please enter a number as KV40!");
		document.getElementById("kv100-kv40").value = "";
		document.getElementById("kv100-kv40").focus();
		return false;
	}

	if(parseFloat(document.getElementById("kv100-kv40").value) < 2) {
		alert("Please enter a KV40 higher than 2!");
		document.getElementById("kv100-kv40").value = "";
		document.getElementById("kv100-kv40").focus();
		return false;
	}
	var vi = parseFloat(document.getElementById("kv100-vi").value);
	var kv40 = parseFloat(document.getElementById("kv100-kv40").value);
	var result = calcKv100(vi, kv40);

	if(500 < result || result < 2) {
		alert("You are outside of the usefull range of the equation!");
	}
	else {
	document.getElementById("kv100-kv100").value = result;
	}
}
function clearKv40() {
	document.getElementById("kv40-vi").value = "";
	document.getElementById("kv40-kv100").value = "";
	document.getElementById("kv40-kv40").value = "";
}

function calcKv40(vindex,kv100) {
     var Vi,b;
     var n = kv100;
     do {
        Vi = calcVi(n , kv100); 
        n = n + 0.05;
  
        } while ( Vi >= vindex && n <= 2000);
        n = parseInt(n * 100 + 0.1) / 100
     return n;
} 

function solveKv40() {
	document.getElementById("kv40-vi").value = document.getElementById("kv40-vi").value.replace(/,/, ".");
	document.getElementById("kv40-kv100").value = document.getElementById("kv40-kv100").value.replace(/,/, ".");

	if(document.getElementById("kv40-vi").value == "" || isNaN(document.getElementById("kv40-vi").value)) {
		alert("Please enter a number as Viscosity Index!");
		document.getElementById("kv40-vi").value = "";
		document.getElementById("kv40-vi").focus();
		return false;
	}
	if(document.getElementById("kv40-kv100").value == "" || isNaN(document.getElementById("kv40-kv100").value)) {
		alert("Please enter a number as KV100!");
		document.getElementById("kv40-kv100").value = "";
		document.getElementById("kv40-kv100").focus();
		return false;
	}

	if(parseFloat(document.getElementById("kv40-kv100").value) < 2) {
		alert("Please enter a KV100 higher than 2!");
		document.getElementById("kv40-kv100").value = "";
		document.getElementById("kv40-kv100").focus();
		return false;
	}
	var vi = parseFloat(document.getElementById("kv40-vi").value);
	var kv100 = parseFloat(document.getElementById("kv40-kv100").value);
	var result = calcKv40(vi, kv100);

	if(result < kv100 || result < 2 || result > 2000) {
		alert("You are outside of the usefull range of the equation!");
	}
	else {
    
    if(result - parseInt(result) == 0) {
		document.getElementById("kv40-kv40").value = result + ".0";
	}
	else {
		document.getElementById("kv40-kv40").value = result;
	}
    }
}

// logic port and machine

const port = process.env.PORT || 8000; 

// Create Server
const server = express();

server.get('/', function (req, res) {
        var data = {
            msg: 'API Calculadora'
        };

        res.json(data);
    }
);

server.get('/visc100/:vindx/:visc40', function (req, res){
    const vindx = parseInt(req.params.vindx);
    const visc40 = parseInt(req.params.visc40);
    const result = calcKv100(vindx, visc40);
    res.json({result: result});
});

server.listen(port, () => {
    console.log('escuchando', port)
})
