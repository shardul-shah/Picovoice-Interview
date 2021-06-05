function findStarPlacement(elem)  
{
	prevAndCurrStars = []
	prevAndCurrStars = $(elem).prevAll();
	prevAndCurrStars.push(elem);	

	nextStars = []
	nextStars = $(elem).nextAll();

	return [prevAndCurrStars, nextStars];
}

function hoverAnimation(elem) {
	[prevAndCurrStars, nextStars] = findStarPlacement(elem);

	for (var i=0; i<prevAndCurrStars.length; i++)
	{
		prevAndCurrStars[i].classList.add("checked");
	}

	for (var i=0; i<nextStars.length; i++)
	{
		nextStars[i].classList.remove("checked");
	}
}

function clickStar(elem) {
	[prevAndCurrStars, nextStars] = findStarPlacement(elem);

	for (var i=0; i<prevAndCurrStars.length; i++)
	{
		prevAndCurrStars[i].classList.add("submitted");
		prevAndCurrStars[i].classList.add("disabled");
	}

	for (var i=0; i<nextStars.length; i++)
	{
		nextStars[i].classList.add("disabled");
	}	

	rating = elem.getAttribute("data-star");
	// productId would be retrieved here. This can be done either directly here,
	// or using another function to modularize the code further.

	// Let's assume we have the productId of a product and it is "197d8362-2600-42e2-a719-0ef9ff51303b", to test the console.log statement below.
	// I generated the UUID productId above in Python for testing purposes.
	// If I was to do full-fledged unit testing, I would use npm to install the uuid module, and easily generate unique IDs, as shown here:
	// https://github.com/uuidjs/uuid.

	productId = "197d8362-2600-42e2-a719-0ef9ff51303b"
	submitRating(productId, rating);
}

function submitRating(productId, rating)
{
	// Assuming we get the unique productId of the product in an actual use case as explained above,
	// we can use the rating given with the productId and we would make a POST request, and
	// use fetch() to submit this rating to the server and store it.
	// This stub function does just this.

	console.log("Rating for product with id " + productId + " is " + rating + ".");
	
	// code to submit rating with productId using fetch() here
}