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

function myFunction() {
		var errorDiv = document.getElementById("inputErrorDiv");
		while (errorDiv.firstChild) {
			errorDiv.removeChild(errorDiv.firstChild);
		}
		var Principal = document.getElementById("principalInput").value;
		var principalMin = 50000;
		var principalMax = 5000000;
		if (Principal <  principalMin || Principal > principalMax) {
			var principalValdtnErr = document.createTextNode("Invalid Input: Principal must be between " + principalMin + "  and " + principalMax);
			errorDiv.appendChild(principalValdtnErr);
			return;
		}
		
		var rate = (document.getElementById("interestInput").value / 100)/12;
		var rateMin = 0;
		var rateMax = 100;
		if (rate*100*12 <  rateMin || rate*100*12 > rateMax) {
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
		var output = "<b>Monthly payment: $" + (Math.round(monthlyPayment*100)/100) + "</b><br><br>";
		
	
		
		//Total Interest
		//alert((monthlyPayment * numMonths) - Principal); 
		output += "<b>Total interest: $" + (((monthlyPayment * numMonths) - Principal)).toFixed(2) + "</b><br><br>";
		
		
		output += "<b>Total payment: $" + ((monthlyPayment * numMonths)).toFixed(2)+"</b><br><br>";
		output += "<b>Property Taxes per month: $" + ((Principal* state[document.getElementById("hi").value])/(12*100)).toFixed(2)+"</b>";
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
		title: {
		  display: true,
		  text: 'Interest Payment vs. Principal Payment'
		},
		responsive: false
	  }
	});
	
	}