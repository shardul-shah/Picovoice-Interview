//GLOBAL VARIABLES
var capitalCities = document.getElementById("capitalCities");

function retrieveCountryData() 
{
	var countryName = document.getElementById("countryInput"); 

	// error handling for one specific use case I noticed while testing out the problem
	if (countryName.value.toUpperCase() == "RUSSIA")
	{	
		capitalCities.innerHTML = "The country input is \"Russia\". Because of official naming, please type \"Russian Federation\" instead.";
		return;
	}

	// note that we want to restrict search to fullText (strict search) for our use case.
	var url = "https://restcountries.eu/rest/v2/name/"+countryName.value+"?fullText=true";

	// fetch request to retrieve data for the country inputted
	fetch(url)
	.then(response => response.clone().json())
	.then(data => retrieveCapitalCities(data))
	.catch(errors => 
		{ 	
			// most likely, if there is an error, it is that the fetch call (GET request) above failed; this indicates a mistake in the input.
			capitalCities.innerHTML = "Please make sure the country name is spelled and inputted properly." + "<br/>";
			return console.log("Errors:", errors);
		});
}

function retrieveCapitalCities(countryData)
{
	var borderingCountries = countryData[0].borders;
	capitalCity = countryData[0].capital;

	if (borderingCountries.length == 0)
	{	
		// if there are no borderingCountries of a country like New Zealand, the fetch call below will fail.
		// Only city to be output is the capital city of the country itself in this case.
		output=capitalCity;
		capitalCities.innerHTML = output;
		return;
	}

	// make a GET request for all the bordering countries using codes 
	var url = "https://restcountries.eu/rest/v2/alpha?codes=";
	for (var i in borderingCountries) 
	{
		url+=borderingCountries[i];
		url+=";";
	}
	// remove the last semicolon
	url = url.slice(0, -1);
	
	// fetch request to retrieve data for all of the neighboring countries of the inputted country
	fetch(url)
	.then(response => response.clone().json())
	.then(data => outputCapitalCities(data, capitalCity))
	.catch(errors => console.log("Error:", errors));
	return;
}

function outputCapitalCities(countriesData, capitalCity) 
{	
	output = capitalCity + ", ";
	//summate capital cities to output
	for (var i in countriesData)
	{
		output+=countriesData[i].capital;
		output+=", ";
	}

	// remove ", " from the end
	output = output.slice(0,-2);

	capitalCities.innerHTML = output;
	return output;
}
