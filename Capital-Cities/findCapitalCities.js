//TODO : refactor+modularize code

function retrieveCountryData() 
{
	var countryName = document.getElementById("countryInput");
	var url = "https://restcountries.eu/rest/v2/name/"+countryName.value+"?fullText=true";

	fetch(url)
	.then(response => response.clone().json())
	.then(data => retrieveCapitalCities(data))
	.catch(errors => console.log("Error:", errors));
}

function retrieveCapitalCities(countryData)
{
	var borderingCountries = countryData[0].borders;
	capitalCity = countryData[0].capital;

	if (borderingCountries.length == 0)
	{	
		output="No bordering countries for this country.";
		document.getElementById("capitalCities").innerHTML = output;
		return
	}

	console.log(borderingCountries);
	var url = "https://restcountries.eu/rest/v2/alpha?codes="

	for (i in borderingCountries) 
	{
		url+=borderingCountries[i];
		url+=";";
	}
	url = url.slice(0, -1);
	console.log(url);
	
	fetch(url)
	.then(response => response.clone().json())
	.then(data => outputCapitalCities(data, capitalCity))
	.catch(errors => console.log("Error:", errors));

	return
}

function outputCapitalCities(countriesData, capitalCity) 
{	
	output = capitalCity + ", ";

	for (i in countriesData)
	{
		output+=countriesData[i].capital
		output+=", "
	}

	output = output.slice(0,-2);
	document.getElementById("capitalCities").innerHTML = output;
	return output
}
