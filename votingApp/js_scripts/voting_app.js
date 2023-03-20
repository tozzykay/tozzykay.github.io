/*Due to some reasons unknown to us, the map is unable to refresh 
itself to update its values. So, we had to save the important data
of the voting app to local storage and reload the whole voting app 
everytime the vote-button is clicked.*/

// Javascript code written by Group 1

/*Code written in MVC Structure such that a block of code 
performs a different task.*/

// MODEL SECTION
const savedEdwardCount = JSON.parse(localStorage.getItem("edwardCount"));
const savedMuskCount = JSON.parse(localStorage.getItem("muskCount"));

if (typeof savedEdwardCount !== "undefined" && savedEdwardCount !== null) {
	edwardCount = savedEdwardCount;
} else {
	edwardCount = 0;
}

if (typeof savedMuskCount !== "undefined" && savedMuskCount !== null) {
	muskCount = savedMuskCount;
} else {
	muskCount = 0;
}

let totalVotes = edwardCount + muskCount;
console.log(typeof edwardCount);

const candidates = [
	{ name: "Edward", id: "1" },
	{ name: "Musk", id: "2" },
];

const allStates = document.getElementById("all-states");

const voteButton = document.getElementById("vote-button");

function selectState(newdiv) {
	statekeys.forEach(function (statekey) {
		const state = simplemaps_usmap_mapdata.state_specific[statekey];
		if (newdiv.innerText === state.name) {
			state.isVoting = true;
		} else {
			state.isVoting = false;
		}
	});
}
function hideAllStates() {
	allStates.style.display = "none";
}

// Unusable Code
// console.log('nohin');
// const nohin = () => {
// 	var param;
// 	nohin.forEach(funcion (param) {
// 		if (param.id === state.id) {
// 			state.isVoting = false;
// 		} else {}
// 		state.isVoting = true;
// 	})
// }
function checkState() {
	// function to determine which state was selected
	votingState = statekeys.filter(function (statekey) {
		const state = simplemaps_usmap_mapdata.state_specific[statekey];
		if (state.isVoting) {
			return true;
		} else {
			return false;
		}
	});
	votingState = votingState.toString();
}

function readyVote() {
	// function to make the vote-button eligible to click

	const cdtImg = event.target;
	cdtImg.isVoting = true;
	statekeys.forEach(function (statekey) {
		const state = simplemaps_usmap_mapdata.state_specific[statekey];
		if (state.isVoting) {
			voteButton.id = "";
			for (let x = 0; x < candidates.length; x++) {
				if (candidates[x].name === cdtImg.id) {
					voteButton.setAttribute("id", candidates[x].id);
				}
			}
		}
	});
	dispCdt();
	cdtImg.isVoting = false;
}

function checkCandidate() {
	// function to determine which candidate was selected
	votingCdt = candidates.filter(function (candidate) {
		if (candidate.id === voteButton.id) {
			return true;
		} else {
			return false;
		}
	});
}

function voteCandidate(state) {
	candidates.forEach(function (candidate) {
		if (candidate.id === voteButton.id) {
			if (candidate.name === "Edward") {
				voteEdward(state);
			} else {
				voteMusk(state);
			}
			votesSummary();
		}
	});
}

function voteEdward(state) {
	edwardCount++;
	state.edCnt = state.edCnt + 1;
	dispEdCnt();
}

function voteMusk(state) {
	muskCount++;
	state.mskCnt = state.mskCnt + 1;
	dispMskCnt();
}

function saveData() {
	// function to save data to local storage
	localStorage.setItem("edwardCount", JSON.stringify(edwardCount));
	localStorage.setItem("muskCount", JSON.stringify(muskCount));
	localStorage.setItem("simple_maps", JSON.stringify(simplemaps_usmap_mapdata));
}
// END OF MODEL SECTION

// VIEW SECTION
function displayStates(st) {
	// function to display options of states to pick
	// when the selectState Button is clicked
	for (let x = 0; x < st.length; x++) {
		const newdiv = document.createElement("div");
		newdiv.innerText = st[x];
		newdiv.style.cursor = "pointer";
		newdiv.onclick = pickState;
		allStates.appendChild(newdiv);
	}
}

function dispEdCnt() {
	if (edwardCount < 2) {
		document.getElementById("edward-count").innerHTML = edwardCount + " Vote";
	} else {
		document.getElementById("edward-count").innerHTML = edwardCount + " Votes";
	}
}
dispEdCnt();
function dispMskCnt() {
	if (muskCount < 2) {
		document.getElementById("musk-count").innerHTML = muskCount + " Vote";
	} else {
		document.getElementById("musk-count").innerHTML = muskCount + " Votes";
	}
}
dispMskCnt();

function votesSummary() {
	/* function that displays the ratio of votes candidates
	 in a progress bar */
	const edwardBar = document.getElementById("edward-bar");
	if (totalVotes !== 0) {
		width = (edwardCount / totalVotes) * 100;
		edwardBar.style.width = width + "%";
	}
}
votesSummary();

function dispCdt() {
	// function to give the selected candidate picture a color
	const cdtImgs = document.querySelectorAll("#candidates img");
	for (let i = 0; i < cdtImgs.length; i++) {
		if (cdtImgs[i].isVoting) {
			if (cdtImgs[i].className.includes(" active")) {
				cdtImgs[i].className = cdtImgs[i].className.replace(" active", "");
			}
			cdtImgs[i].className += " active";
		} else {
			if (cdtImgs[i].className.includes(" active")) {
				cdtImgs[i].className = cdtImgs[i].className.replace(" active", "");
			}
		}
	}
}
// END OF VIEW SECTION

// CONTROLLER SECTION
function showAllStates() {
	if (allStates.style.display === "block") {
		allStates.style.display = "none";
	} else {
		allStates.style.display = "block";
		const st = [];
		statekeys.forEach(function (statekey) {
			const state = simplemaps_usmap_mapdata.state_specific[statekey];
			st.push(state.name);
		});
		st.sort();
		displayStates(st);
	}
}

function pickState() {
	const newdiv = event.target;
	const stateButton = document.getElementById("state-button");
	stateButton.innerText = newdiv.innerText;
	selectState(newdiv);
	hideAllStates();
}

window.onclick = function (event) {
	if (!event.target.matches("#state-button")) {
		hideAllStates();
	}
};

function selectCandidate() {
	checkState();
	if (statekeys.includes(votingState)) {
		readyVote();
	} else {
		alert("Select a State");
	}
}

function vote() {
	// refresh();
	// document.body.innerHTML = "";
	// document.getElementById("map").innerHTML = "";
	// 	$("#ma").load(window.location.href + " #map");
	// });
	checkState();
	checkCandidate();

	if (totalVotes < 500) {
		if (statekeys.includes(votingState)) {
			statekeys.forEach(function (statekey) {
				const state = simplemaps_usmap_mapdata.state_specific[statekey];

				if (state.isVoting) {
					if (state.edCnt + state.mskCnt < 10) {
						if (candidates.includes(votingCdt[0])) {
							voteCandidate(state);
							state.isVoting = false;
							saveData();
							location.reload();
						} else {
							alert("No Candidate is Selected");
						}
					} else {
						alert("Maximum Amount of Vote For This State is Reached");
					}
					document.getElementById("state-button").innerText = "Select State";
				}
			});
		} else {
			alert("Select a State and Candidate");
		}
	} else {
		alert("Maximum Amount of Vote Is Reached");
	}
}
// END OF CONTROLLER SECTION

// function refresh() {
// 	$("#map").load(location.href + " #map");
// }
