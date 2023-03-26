'use strict';

// Script to stop array being overwritten each time the form is submitted.

let allAlbums = []; // array for storing form data.

let savedAlbums = localStorage.getItem('albumArray');
if (savedAlbums) {
	allAlbums = JSON.parse(savedAlbums);
}

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

// Script to stop array being overwritten on page reload.

let savedIndex = localStorage.getItem('currentIndex');
let indexNumber = 0;
if (savedIndex) {
	indexNumber = savedIndex;
}

// Form Submit

function formSubmit() {
	event.preventDefault(); // Stops Page From refreshing on submit.

	let formElement = document.getElementById('addAlbumForm'); // Getting Form Element

	let userAlbums = new FormData(formElement); // Creating a new object.

	let albumData = Object.fromEntries(userAlbums.entries()); //Populating the object.

	allAlbums[indexNumber] = albumData; // To store album data in specified index number.

	indexNumber++;

	localStorage.setItem('currentIndex', indexNumber);

	localStorage.setItem('albumArray', JSON.stringify(allAlbums)); // converting array to string, and then pushing to local storage.

	document.getElementById('addAlbumForm').reset(); // Clears previous information from inputs when form is submitted.
}

// Unstringifying array

// To Display Album Information on Cards.

if (allAlbums.length > 0) {
	let displayAlbumInfo = localStorage.getItem('albumArray'); //Getting Array back from Local Server.

	let allAlbumsParsed = JSON.parse(displayAlbumInfo); //Parsing stringified array into a new array.

	console.log(allAlbums);

	for (let j = 0; j < allAlbumsParsed.length; j++) {
		//Loop through each index of the array.
		let cardSpace = document.getElementById('albumCardSpace'); //Getting card space area.

		let cardDiv = document.createElement('div'); //Creating Card Div.
		cardDiv.setAttribute('class', 'albumCard'); // Setting class for styling.

		// Adding Image
		let cardImg = document.createElement('img'); //Creating Img Element
		let imgSrc = allAlbumsParsed[j].albumArt; // Getting Image SRC from Object.
		cardImg.setAttribute('src', imgSrc); // Adding src attrivute and link.
		cardImg.setAttribute('class', 'albumArtDisplay'); // Setting class for styling.
		cardImg.setAttribute('alt', 'album art'); // Adding alt text.

		// Adding Album Title Header

		let cardHeader = document.createElement('h3');
		let headerText = allAlbumsParsed[j].albumName;
		cardHeader.setAttribute('class', 'albumTitle');
		cardHeader.innerText = headerText;

		// Adding Info Line 1, containing Artist and Release Year.

		let albumInfo1 = document.createElement('div');
		albumInfo1.setAttribute('class', 'albumInfoLine1');

		let artistDisplay = document.createElement('p');
		artistDisplay.setAttribute('class', 'albumInfoPara');
		let artistText = allAlbumsParsed[j].albumArtist;
		artistDisplay.innerText = artistText;

		let yearDisplay = document.createElement('p');
		yearDisplay.setAttribute('class', 'albumInfoPara');
		let yearText = allAlbumsParsed[j].releaseYear;
		yearDisplay.innerText = yearText;

		albumInfo1.appendChild(artistDisplay);
		albumInfo1.appendChild(yearDisplay);

		// Adding Ingo Line 2, containing rating and button.

		let albumInfo2 = document.createElement('div');
		albumInfo2.setAttribute('class', 'albumInfoLine2');

		let ratingDisplay = document.createElement('p');
		let ratingText = allAlbumsParsed[j].rating;
		ratingDisplay.innerText = ratingText;

		let buttonDisplay = document.createElement('button');
		buttonDisplay.setAttribute('class', 'seeMore');
		buttonDisplay.innerText = 'See More';

		albumInfo2.appendChild(ratingDisplay);
		albumInfo2.appendChild(buttonDisplay);

		// Append Everything to card div

		cardDiv.appendChild(cardImg);
		cardDiv.appendChild(cardHeader);
		cardDiv.appendChild(albumInfo1);
		cardDiv.appendChild(albumInfo2);

		// Append Card Div to Card Space

		cardSpace.appendChild(cardDiv);
	}
}
