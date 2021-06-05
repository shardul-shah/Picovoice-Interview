function findStarPlacement(elem)  
{	
	//elem is the element of the current star

	//previous and current star on which the event is being triggered on
	prevAndCurrStars = []
	prevAndCurrStars = $(elem).prevAll();
	prevAndCurrStars.push(elem);	

	//next stars after current star
	nextStars = [];
	nextStars = $(elem).nextAll();

	return [prevAndCurrStars, nextStars];
}

function mouseOverAnimation(elem) {
	[prevAndCurrStars, nextStars] = findStarPlacement(elem);

	for (var i=0; i<prevAndCurrStars.length; i++)
	{
		prevAndCurrStars[i].classList.add("hovered", "fa-star");
		prevAndCurrStars[i].classList.remove("fa-star-o");
	}

	for (var i=0; i<nextStars.length; i++)
	{
		nextStars[i].classList.remove("hovered");
	}
}

function mouseLeaveAnimation(elem) {
	// only trigger mouseLeaveAnimation if the user has not submitted their rating
	if (!elem.classList.contains("disabled")) 
	{
		[prevAndCurrStars, nextStars] = findStarPlacement(elem);

		for (var i=0; i<prevAndCurrStars.length; i++)
		{
			prevAndCurrStars[i].classList.remove("hovered", "fa-star");
			prevAndCurrStars[i].classList.add("fa-star-o");
		}
	}
}

function clickStar(elem) {
	// this function is done assuming rating cannot be changed once given and submitted (according to requirements of problem)
	[prevAndCurrStars, nextStars] = findStarPlacement(elem);

	for (var i=0; i<prevAndCurrStars.length; i++)
	{
		prevAndCurrStars[i].classList.add("submitted", "disabled", "fa-star");
		prevAndCurrStars[i].classList.remove("fa-star-o");
	}

	for (var i=0; i<nextStars.length; i++)
	{
		nextStars[i].classList.add("disabled");
	}	

	// get rating and convert it to an integer
	rating = parseInt(elem.getAttribute("data-star"));

	// productId would be retrieved here. This can be done either directly here,
	// or using another function to modularize the code further.

	// Let's assume we have the productId of a product and it is "197d8362-2600-42e2-a719-0ef9ff51303b", to test the console.log statement below.
	// I generated the UUID productId above in Python for testing purposes.
	// If I was to do full-fledged unit testing, I would use npm to install the uuid module, and easily generate unique IDs, as shown here:
	// https://github.com/uuidjs/uuid.

	productId = "197d8362-2600-42e2-a719-0ef9ff51303b";
	submitRating(productId, rating);

	if (rating >= 1 && rating <=3) 
	{
		var output = "We are sorry to hear that you did not find this product to be of a high quality. ";
		output+="We strive for the best products. Please feel free to email us any feedback at foobartest@gmail.com.";
	}

	else 
	// else rating is 4 or 5
	{
		var output = "Thank you! We are pleased you think so highly of our product. However, improvements can always be made. ";
		output+="To get in touch or leave us further suggestions, feel free to email us at foobartest@gmail.com.";
	}
	document.getElementById("feedback").innerHTML = output;
}

function submitRating(productId, rating)
{	//Stub Function
	// Assuming we get the unique productId of the product in an actual use case as explained above,
	// we can use the rating given with the productId and we would make a POST request, and
	// use fetch() to submit this rating to the server and store it.

	console.log("Rating for product with id " + productId + " is " + rating + ".");

	// code to submit rating with productId using fetch() here
}