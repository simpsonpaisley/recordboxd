'use strict';

// Range Slider Script

function rangeSlideHandler() {
	let rangeValue = document.getElementById('rating');
	rangeValue = rangeValue.value;

	let rangeValueDisplay = document.getElementById('rangeValue');
	rangeValueDisplay.innerText = rangeValue;
}

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

	let divNumber = 'div' + trackNumber;

	newTrackInputDiv.setAttribute('id', divNumber);

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

// Remove Last Track Script

function removeTrackHandler() {
	let removalNumber = 'div' + trackNumber;
	let removedTrack = document.getElementById(removalNumber);

	removedTrack.innerHTML = '';
	removedTrack.remove(self);

	trackNumber--;
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

// To Display Album Information on Cards.

if (allAlbums.length > 0) {
	let displayAlbumInfo = localStorage.getItem('albumArray'); //Getting Array back from Local Server.

	let allAlbumsParsed = JSON.parse(displayAlbumInfo); //Parsing stringified array into a new array.

	console.log(allAlbums);

	for (let j = allAlbumsParsed.length - 1; j >= 0; j--) {
		// Looping thorugh array backwards, so last added album appears first.
		//Loop through each index of the array.
		let cardSpace = document.getElementById('albumCardSpace'); //Getting card space area.

		let cardDiv = document.createElement('div'); //Creating Card Div.
		cardDiv.setAttribute('class', 'albumCard'); // Setting class for styling.

		let defaultViewDiv = document.createElement('div');
		defaultViewDiv.setAttribute('class', 'defaultView');

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

		// Adding Info Line 2, containing rating and button.

		let albumInfo2 = document.createElement('div');
		albumInfo2.setAttribute('class', 'albumInfoLine2');

		let ratingDisplay = document.createElement('p');
		let ratingText = allAlbumsParsed[j].rating;
		ratingDisplay.innerText = ratingText;

		let buttonDisplay = document.createElement('button');
		buttonDisplay.setAttribute('class', 'seeMore');
		buttonDisplay.innerText = 'See More';
		buttonDisplay.addEventListener('click', seeMoreHandler);

		albumInfo2.appendChild(ratingDisplay);
		albumInfo2.appendChild(buttonDisplay);

		// Rendering Track Listing and Review

		let currentObject = allAlbumsParsed[j];

		let albumTracks = [];

		for (let key in currentObject) {
			if (key.includes('track')) {
				albumTracks.push(currentObject[key]);
			}
		}

		let expandDiv = document.createElement('div');
		expandDiv.setAttribute('class', 'expandedDiv');

		let listArea = document.createElement('div');
		listArea.setAttribute('class', 'listArea');

		let listTitle = document.createElement('h4');
		listTitle.innerText = 'Track Listing';

		let trackListEle = document.createElement('ol');
		trackListEle.setAttribute('class', 'trackList');

		for (let m = 0; m < albumTracks.length; m++) {
			let trackDisplay = albumTracks[m];

			let trackListItem = document.createElement('li');
			trackListItem.innerText = trackDisplay;

			trackListEle.appendChild(trackListItem);
		}

		listArea.appendChild(listTitle);
		listArea.appendChild(trackListEle);

		let reviewDisplay = document.createElement('div');
		reviewDisplay.setAttribute('class', 'reviewDisplay');
		let reviewHeader = document.createElement('h4');
		reviewHeader.innerText = 'Review:';
		let reviewBody = document.createElement('p');
		let reviewText = allAlbumsParsed[j].review;
		reviewBody.innerText = reviewText;

		reviewDisplay.appendChild(reviewHeader);
		reviewDisplay.appendChild(reviewBody);

		expandDiv.appendChild(listArea);
		expandDiv.appendChild(reviewDisplay);

		// Append Everything to card div

		defaultViewDiv.appendChild(cardImg);
		defaultViewDiv.appendChild(cardHeader);
		defaultViewDiv.appendChild(albumInfo1);
		defaultViewDiv.appendChild(albumInfo2);

		cardDiv.appendChild(defaultViewDiv);
		cardDiv.appendChild(expandDiv);

		// Append Card Div to Card Space

		cardSpace.appendChild(cardDiv);
	}
}
let clickCount = 0;

function seeMoreHandler() {
	clickCount++;

	if (clickCount == 1) {
		this.parentElement.parentElement.nextElementSibling.style.visibility =
			'visible';

		this.parentElement.parentElement.parentElement.style.width = '95%';

		this.innerText = 'Collapse';
	} else if (clickCount == 2) {
		this.parentElement.parentElement.nextElementSibling.style.visibility =
			'collapse';
		this.parentElement.parentElement.parentElement.style.width = '400px';
		this.innerText = 'See More';
		clickCount = 0;
	}
}

function clearHistory() {
	let userClear = prompt(
		"Are You Sure? You Won't Be Able to Recover Your Data. Type 'Yes' to Confirm"
	);

	if (userClear == 'yes' || userClear == 'Yes') {
		localStorage.clear();
		location.reload();
	}
}
