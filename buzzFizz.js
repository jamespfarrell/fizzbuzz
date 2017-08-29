function actionFactory(action) {
	return function af({i,label}) {
		label = (i%action.factor==0) ? label + action.label : label;
		return {
			i,
			label
		};
	}
}

function compose(...fns) {
	return function composed(arg) {
		return fns.reduceRight((result,fn) => fn(result),arg);
	};
}

function pipe(...fns) {
	return compose(...fns.reverse());
}

const range = [];
for(var i=1;i<=100;i++){ range.push(i); }
let actions = [{ factor: 3 , label: 'Fizz' }, { factor: 5 , label: 'Buzz' }];
	
function fizzBuzz(range, actions) {

	let output = "";

	let actionFunctions = actions.map(function(action) {
		return actionFactory(action);
	});

	let composedFunctions = pipe(...actionFunctions) ;

	range.map( i => {
		let message = "";

		message = composedFunctions({ i, label : "" }).label;

		message = message == "" ? i : message;
		output += "<p>"+message+"</p>"; 
	});

	return output;
}
	
var div = document.getElementById('output');

div.innerHTML += fizzBuzz(range, actions);