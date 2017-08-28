let output = "";

for(let i=1;i<=100; i++)
{
	let message = "";
    if (i%3==0) message += "Fizz";
	if (i%5==0) message += "Buzz";

	message = message == "" ? i : message;
	output += "<p>"+message+"</p>";
	//console.log(message == "" ? i : message);
}

var div = document.getElementById('output');

div.innerHTML += output;