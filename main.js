var thing;

var state={
	"Alabama": .43,
	"Alaska":1.19,
	"Arizona": .77,
	"Arkansas": .63,
	"California": .79,
	"Colorado": .57,
	"Connecticut": 2.02,
	"Delaware": .55,
	"DC": .56,
	"Florida": 1.02,
	"Georgia": 0.93,
	"Hawaii": 0.27,
	"Idaho": 0.76,
	"Illinois": 2.32,
	"Indiana": 0.87,
	"Iowa": 1.50,
	"Kansas": 1.40,
	"Kentucky": 0.85,
	"Louisiana": .51,
	"Maine": 1.32,
	"Maryland": 1.1,
	"Massachussetts": 1.21,
	"Michigan": 1.71,
	"Minnesota": 1.17,
	"Mississippi": .8,
	"Missouri": 1,
	"Montana": .85,
	"Nebraska": 1.83,
	"Nevada": .77,
	"New Hampshire": 2.19,
	"New Jersey": 2.4,
	"New Mexico": .76,
	"New York": 1.65,
	"North Carolina": .86,
	"North Dakota": 1.05,
	"Ohio": 1.56,
	"Oklahoma": .89,
	"Oregon": 1.07,
	"Pennsylvania": 1.55,
	"Rhode Island": 1.65,
	"South Carolina": .57,
	"South Dakota": 1.32,
	"Tennessee": .75,
	"Texas": 1.86,
	"Utah": .67,
	"Vermont": 1.78,
	"Virginia": .79,
	"Washington": 1.06,
	"West Virginia": .59,
	"Wisconsin": 1.95,
	"Wyoming": .61
};


function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function enableAdvancedMode(){
	document.getElementById("principalInput").disabled = !document.getElementById("principalInput").disabled;
	var status = document.getElementById("advancedStuff").style.display;
	if(status == "block"){
		document.getElementById("advancedStuff").style.display = "none";
        document.getElementById("placeholdercontainer").style.display = "block";
	}
	else{
		document.getElementById("advancedStuff").style.display = "block";
		document.getElementById("placeholdercontainer").style.display = "none";}
}

function myFunction(){ 
        document.getElementById("output").innerHTML = "";
		var errorDiv = document.getElementById("inputErrorDiv");
		while (errorDiv.firstChild) {
			errorDiv.removeChild(errorDiv.firstChild);
		}
		var Principal;
		if(document.getElementById("principalInput").disabled == false){
			Principal = document.getElementById("principalInput").value;
		}
		else{
			Principal = (document.getElementById("propVal").value * (1 - document.getElementById("downPay").value/100)).toFixed(2);
			document.getElementById("principalInput").value = Principal;
		}
		var principalMin = 50000;
		var principalMax = 5000000;
		
		if(document.getElementById("advancedStuff").style.display == "block"){
			
			var propVal = document.getElementById("propVal").value;
			if (propVal <  principalMin || propVal > principalMax) {
				var principalValdtnErr = document.createTextNode("Invalid Input: Property Value must be between " + principalMin + "  and " + principalMax);
				errorDiv.appendChild(principalValdtnErr);
				return;
			}
			
			var downPay = document.getElementById("downPay").value;
			var rateMin = 0;
			var rateMax = 100;
			if (downPay == "" || downPay <  rateMin || downPay> rateMax) {
				var rateValdtnErr = document.createTextNode("Invalid Input: Down Payment must be between " + rateMin + "%  and " + rateMax + "%");
				errorDiv.appendChild(rateValdtnErr);
				return;
			}
			
			
			var pmiVal = document.getElementById("pmiVal").value;
			if (pmiVal == "" || pmiVal<  rateMin || pmiVal> rateMax) {
				var rateValdtnErr = document.createTextNode("Invalid Input: PMI rate must be between " + rateMin + "%  and " + 100 + "%");
				errorDiv.appendChild(rateValdtnErr);
				return;
			}
			
			
		}
		else{
			if (Principal <  principalMin || Principal > principalMax) {
				var principalValdtnErr = document.createTextNode("Invalid Input: Principal must be between " + principalMin + "  and " + principalMax);
				errorDiv.appendChild(principalValdtnErr);
				return;
			}
		}
		var rate = (document.getElementById("interestInput").value / 100)/12;
		var rateMin = 0;
		var rateMax = 100;
		if (rate == "" || rate*100*12 <  rateMin || rate*100*12 > rateMax) {
			var rateValdtnErr = document.createTextNode("Invalid Input: Interest rate must be between " + rateMin + "%  and " + rateMax + "%");
			errorDiv.appendChild(rateValdtnErr);
			return;
		}
		
		
		
		
		var numMonths = 12*(document.getElementById("termInput").value);
		var yearsMin = 5;
		var yearsMax = 50;
		if (numMonths/12 < yearsMin || numMonths/12 > yearsMax) {
			var yearsValdtnErr = document.createTextNode("Invalid Input: Loan term must be between " + yearsMin + "  and " + yearsMax + " years");
			errorDiv.appendChild(yearsValdtnErr);
			return;
		}
		
		var monthlyPayment = Principal * (rate * Math.pow((1 + rate),numMonths))/(Math.pow((1 + rate),numMonths)-1);
		
		//Monthly payment
		//alert(monthlyPayment);
		var node = document.getElementById("output");
		var output = "<b>Monthly payment: $" + financial((Math.round(monthlyPayment*100)/100)) + "&nbsp&nbsp&nbsp&nbsp";
		
	
		
		//Total Interest
		//alert((monthlyPayment * numMonths) - Principal); 
		output += "Total interest: $" + financial((((monthlyPayment * numMonths) - Principal)).toFixed(2)) + "&nbsp&nbsp&nbsp&nbsp";
		
		
		output += "Total payment: $" + financial(((monthlyPayment * numMonths)).toFixed(2))+"&nbsp&nbsp&nbsp&nbsp<br>";
		
		if(document.getElementById("advancedStuff").style.display == "block"){
		    output += "Property Taxes per month: $" + financial(((Principal* state[document.getElementById("hi").value])/(12*100)).toFixed(2))+"&nbsp&nbsp&nbsp&nbsp";
		
            var LTVrate = ((document.getElementById("propVal").value * (1 - document.getElementById("downPay").value/100))) / document.getElementById("propVal").value;
			
			output += "Loan to Value: " + LTVrate*100 + "%&nbsp&nbsp&nbsp&nbsp";
			
			if((document.getElementById("downPay").value*document.getElementById("propVal").value) / (document.getElementById("propVal").value) < 20)
			output += "PMI Cost per month: $" + financial(((Principal * document.getElementById("pmiVal").value/100)/12).toFixed(2)) +"</b>";
			
		}else{
            output += "Property Taxes per month: $" + financial(((Principal* state[document.getElementById("hi").value])/(12*100)).toFixed(2));
        }
		
		node.innerHTML = output;
		
		var pBalanceRem = Principal;
		var intrestPerMonth = [numMonths];
		var princPerMonth = [numMonths];
		
		var i = 0;

		while(i<numMonths){
			intrestPerMonth[i] = (pBalanceRem * rate).toFixed(2);
			princPerMonth[i] = (monthlyPayment - intrestPerMonth[i]).toFixed(2);
			pBalanceRem = pBalanceRem - princPerMonth[i];
			i++;
		}
		
		

		var nums = [];
		i=0;
		while(i<numMonths){
			nums[i] = i;
			i++;
		}
		

	document.getElementById("line-chart").height = 500;
	document.getElementById("line-chart").width = 800;
	
	
	if(thing != null){
		thing.destroy();
	}
	thing = new Chart(document.getElementById("line-chart"), {
	  type: 'line',
	  data: {
		labels: nums,
	
		datasets: [{ 
			data: intrestPerMonth,
			label: "Interest Payment",
			borderColor: "#3e95cd",
			fill: false
		  }, { 
			data: princPerMonth,
			label: "Principal Payment",
			borderColor: "#8e5ea2",
			fill: false
		  }
		]
	  },
	  options: {
		scales: {
		yAxes: [{
		  scaleLabel: {
			display: true,
			labelString: 'Amount USD'
		  }
		}],
		xAxes: [{
		  scaleLabel: {
			display: true,
			labelString: 'Months'
		  }
		}]
	  }     ,
		title: {
		  display: true,
		  text: 'Interest Payment vs. Principal Payment'
		},
		responsive: false
	  }
	});
	
	}