function actionFactory(action) {
	return function af({i,messageSoFar}) {
		messageSoFar = (i%action.factor==0) ? messageSoFar + action.label : messageSoFar;
		return {
			i,
			messageSoFar
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

let output = "";

let actions = [{ factor: 3 , label: 'Fizz' }, { factor: 5 , label: 'Buzz' }];
let actionFunctions = [];

actions.forEach(function(action) {
	actionFunctions.push(actionFactory(action));
});

let composedFunctions = pipe(...actionFunctions) ;

range.map(function(i){
	let message = "";
	message = composedFunctions({ i, messageSoFar : "" }).messageSoFar;
	

	message = message == "" ? i : message;
	output += "<p>"+message+"</p>"; 
});

var div = document.getElementById('output');

div.innerHTML += output;