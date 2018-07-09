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
		var node = document.createElement("LI");
		var textnode = document.createTextNode("Your monthly payment is " + (Math.round(monthlyPayment*100)/100));
		node.appendChild(textnode);
		document.getElementById("myList").appendChild(node);
		
		//Total Intrest
		//alert((monthlyPayment * numMonths) - Principal); 
		var node = document.createElement("LI");
		var textnode = document.createTextNode("Your total intrest payment is " + (((monthlyPayment * numMonths) - Principal)));
		node.appendChild(textnode);
		document.getElementById("myList").appendChild(node);
		
		
		var node = document.createElement("LI");
		var textnode = document.createTextNode("Your total payment for your home is " + ((monthlyPayment * numMonths)));
		node.appendChild(textnode);
		document.getElementById("myList").appendChild(node);
		
		
		var pBalanceRem = Principal;
		var intrestPerMonth = [numMonths];
		var princPerMonth = [numMonths];
		
		var i = 0;

		while(i<numMonths){
			intrestPerMonth[i] = pBalanceRem * rate;
			princPerMonth[i] = (monthlyPayment - intrestPerMonth[i]);
			pBalanceRem = pBalanceRem - princPerMonth[i];
			i++;
		}
		
		

		var nums = [];
		i=0;
		while(i<numMonths){
			nums[i] = i;
			i++;
		}

		
		new Chart(document.getElementById("line-chart"), {
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
		  text: 'Intrest Payment vs. Principal Payment'
		},
		responsive: false
	  }
	});
	}