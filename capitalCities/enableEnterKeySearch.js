//GLOBAL VARIABLES
var countryName = document.getElementById("countryInput");

countryName.addEventListener("keyup", function(event) 
{
 	// Number 13 = "Enter" Key; see: https://css-tricks.com/snippets/javascript/javascript-keycodes/
 	if (event.keyCode === 13) 
 	{
    	// Simulate clicking of the search button
    	document.getElementById("searchButton").click();
 	}
});
