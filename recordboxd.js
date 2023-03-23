// Script to take user to "Add Album Page when "Get Started" Button is clicked

function getStartedHandler() {
	window.location.href = 'addAlbum.html';
}

// Add Track Button Script
let trackNumber = 5; // To make track number start at 5.

function addTrackHandler() {
	trackNumber++; // To add one to track number each time button is clicked.

	let trackListing = document.getElementById('trackListingSpace'); //To get track listing space.

	let newTrackInputDiv = document.createElement('div'); // To create new div.

	newTrackInputDiv.setAttribute('class', 'trackLabel'); //Adding class to new div.

	let newInputLabel = document.createElement('label'); // Creating Label Element

	newInputLabel.innerText = trackNumber + '.'; // Text for Label

	newInputLabel.setAttribute('class', 'trackLabel'); // Adding Class to new label.

	let trackAttribute = 'track' + trackNumber;

	newInputLabel.setAttribute('for', trackAttribute); //Setting for attribute to label.

	let newInput = document.createElement('input'); //Creating input element.

	newInput.setAttribute('type', 'text'); // Adding type attribute

	newInput.setAttribute('id', trackAttribute); // Adding ID

	newInput.setAttribute('name', trackAttribute); // Adding Name

	newTrackInputDiv.appendChild(newInputLabel); // Appending Label
	newTrackInputDiv.appendChild(newInput); // Appending Input

	trackListing.appendChild(newTrackInputDiv); // Appending new div.
}

// Form Submit
let allAlbums = []; // array for storing form data.
let albumNumber = 0; // for album numbers
function formSubmit() {
	event.preventDefault(); // Stops Page From refreshing on submit.
	albumNumber++;

	let formElement = document.getElementById('addAlbumForm'); // Getting Form Element

	let userAlbums = new FormData(formElement); // Creating a new object

	let albumData = Object.fromEntries(userAlbums.entries()); //

	allAlbums.push(albumData);

	localStorage.setItem('albumArray', JSON.stringify(allAlbums));

	console.log(allAlbums);
	/* i = 0;

	for (i; i < trackNumber; i++) {
		console.log(i);
	}
*/
	document.getElementById('addAlbumForm').reset(); // Clears previous information from inputs when form is submitted.
}
