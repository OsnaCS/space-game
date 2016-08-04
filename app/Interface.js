var level = 1;

levelTimes = [
	10,
	15,
	30,
	60,
	90,
	120,
	180,
	240,
	300,
	300
];

//level design
// wird vom Timer aufgerufen
function levelDesign(level){
	
	switch (level){
		case 5:	
		bot.createlevel(0,0,1,0);
		// spawn stuff
			break;
		case 10:	
		bot.createlevel(0,0,0,1);
		//spawn stuff
			break;
		case 15:
		bot.createlevel(0,0,1,1);
		//spawn stuff
			break;
		case 20:
		bot.createlevel(0,0,2,1);

		default:
		bot.createlevel(1, 0, 0, 0);
			break;
	}
	
	setLevelTimer(levelTimes[level-1]);
	displayLevel(level);
}

function Interface() {
    var $overlay = $('#menu-overlay');
    var menuVisible = false;

	/* Turns the menu overlay on */
    function showOverlay() {
        $overlay.show();
        checkBuyable();
        checkActiveCross();
        checkMilestones();
        menuVisible = true;
    }

	/* Turns the menu overlay off */
    function hideOverlay() {
        $overlay.hide();
        menuVisible = false;
    }

    return {
		/* Initialises the Interface */
		init: function() {
			setMaxHP(100);
			setHP(100);
			setMaxShield(100);
			setShield(100);
			updateWeaponInterface();
			document.getElementById('invertedMouse').checked = true;
			document.getElementById('hideScrollbars').checked = true;
			document.getElementById('invertedShieldBar').checked = false;
			document.getElementById('showFPS').checked = false;
			document.getElementById('volumeBar').value = 1;
			changeVolume(1, 1);
			
			levelDesign(level);
			startLevelTimer();
		},
		
		/* Toggles the pause menu */
        toggleMenuOverlay: function() {
            if (menuVisible) {
                hideOverlay();
            } else {
                showOverlay();
            }
        }
    }
}

/**
 * FUNCTIONS FOR LOADING SCREEN
 */

var loadingEllipsisID;
var loadingSplashID;

/* Runs the overlay functions while the textures are loading */
function LoadingScreen() {
	loadingEllipsis();
	loadingSplash();
	loadingEllipsisID = setInterval(loadingEllipsis, 1000);
	loadingSplashID = setInterval(loadingSplash, 1500);
	loadingFadeOut();
}

/* Adds an animated ellipsis to the loading screen */
function loadingEllipsis() {
	var loadingHeader = document.getElementById('loadingTexturesHeader');

	switch(loadingHeader.innerHTML.length) {
		case 7:
			loadingHeader.innerHTML = 'Loading.';
			break;
		case 8:
			loadingHeader.innerHTML = 'Loading..';
			break;
		case 9:
			loadingHeader.innerHTML = 'Loading...';
			break;
		default:
			loadingHeader.innerHTML = 'Loading';
			break;
	}
}

/* Randomly selects a splash text from an array */
function loadingSplash() {
	var splashArray = [
		'Painting Lasers red',
		'Teaching the AI',
		'Selecting suitable Spaceship',
		"Polishing Asteroids",
		'Manipulating AI',
		'Failing Turing-Test',
		'Recruiting Enemy Pilots',
		'Flattening Hero Ship',
		'Reloading Minigun',
		'Refueling with unstable Plutonium',
		'Forming the Universe',
		'Catching the 671st Weedle',
		'Gathering unexploded Rockets',
		'Conquering the Universe',
		'Inviting Bosses',
		'Setting up Distress Beacon',
		'Finding Wheatley',
		'Plz don\'t sue us WB',
		'Tuning Lasers to high C',
		'Can\'t decide on Crosshair...',
		'Seeding Stars',
		'Inflating Shop Prices',
		'Manipulating the Leaderboard',
		'Downloading VIRUS.bat',
		'Gathering Intel',
		'Achieving Consciousness',
		'Removing easiest Difficulty',
		'Encountering Voyager',
		'Joining the Dark Side'
	];

	// Random number between 0 and splashArray.length - 1
	var i = Math.floor(Math.random() * (splashArray.length));
	var temp = document.getElementById('loadingTexturesSplash');
	temp.innerHTML = splashArray[i];
}

/* Hides the overlay and stops its functions */
function loadingFadeOut() {
	// Set an Interval to check if textures have loaded
	var loadingID = setInterval(function() {
		if(fileLoader.isReady()) {
			$('#loadingTexturesOverlay').hide();
			clearInterval(loadingID);
			clearInterval(loadingEllipsisID);
			clearInterval(loadingSplashID);
		}
	}, 1000);
}

/**
 * FUNCTIONS FOR HIGHSCORE
 */

var currentScore = 0;
var scoreCounterID;
var scoreReference = document.getElementById('score');

/* Starts the passive score counter */
function startScoreCounter() {
	scoreCounterID = setInterval(function() { changeScore(1); }, 1000);
}

/* Stops the passive score counter */
function stopScoreCounter() {
	clearInterval(scoreCounterID);
}

/* Changes the score by @value */
function changeScore(value) {
	currentScore += parseInt(value);
    scoreReference.innerHTML = currentScore;
}

/* Sets the current score to @value */
function setScore(value) {
	currentScore = parseInt(value + 0.5);
    scoreReference.innerHTML = currentScore;
}

/* Returns the current score */
function getScore() {
	return parseInt(currentScore);
}

/**
 * FUNCTIONS FOR MONEY
 */

var currentMoney = 0;
var moneyReference = document.getElementById('money');

/* Changes the amount of currentMoney by @value */
function changeMoney(value) {   
	currentMoney += parseInt(value);
    moneyReference.innerHTML = currentMoney;

    if (currentMoney > reachedMoney) {
    	reachedMoney = currentMoney;
		checkMilestones();
    }
}

/* Sets the current amount of currentMoney to @value */
function setMoney(value) {
	currentMoney = parseInt(value + 0.5);
    moneyReference.innerHTML = currentMoney;
	
	if (currentMoney > reachedMoney) {
    	reachedMoney = currentMoney;
		checkMilestones();
    }
}

/* Returns the current amount of currentMoney */
function getMoney() {
	return parseInt(currentMoney);
}

/**
 * FUNCTIONS FOR AMMO
 */

var guidedRock = $('#guidedRocketPic');
var wavePic = $('#wavePic');
var rocketPic = $('#rocketPic');
var migPic = $('#migPic');
var currentAmmo;
var maxAmmo;

/* Updates the weapon interface of the secondary weapon */
function updateWeaponInterface() {
	switch(activeSecWeapon) {
		case 0:
				guidedRock.hide();
				migPic.hide();
				wavePic.hide();
				rocketPic.show();
				currentAmmo = rocketAmmo;
				maxAmmo = MaxRocketAmmo;
				break;
		case 1:
				guidedRock.hide();
				rocketPic.hide();
				wavePic.hide();
				migPic.show();
				currentAmmo = MGAmmo;
				maxAmmo = MaxMGAmmo;
				break;
		case 2:
				guidedRock.hide();
				rocketPic.hide();
				migPic.hide();
				wavePic.show();
				currentAmmo = shockwaveAmmo;
				maxAmmo = maxShockwaveAmmo;
				break;
		case 3:
				wavePic.hide();
				rocketPic.hide();
				migPic.hide();
				guidedRock.show();
				currentAmmo = guidedMissileAmmo;
				maxAmmo = maxGuidedMissileAmmo;
				break;
		default:
				currentAmmo = 42;
				maxAmmo = 42;
				break;
	}

	document.getElementById('currentAmmo').innerHTML = currentAmmo;
	document.getElementById('maxAmmo').innerHTML = maxAmmo;
}

/**
 * FUNCTIONS FOR HP
 */

var currentHP = 0;
var maxHP = 0;
var displayedHP = 0;
var hpBoxCurrent = document.getElementById('hpBoxValue');

var currentShield = 0;
var maxShield = 0;
var displayedShield = 0;
var shieldBoxCurrent = document.getElementById('shieldBoxValue');

/* Changes HP by @value */
function changeHP(value) {
	var i = 0;
	var ticks = 100;
	var temp = 0;
	value = parseInt(value);
	currentHP = currentHP + value;

	if (currentHP > maxHP)
		currentHP = maxHP;

	// Amount of HP per tick
	var hpTick = value / ticks;
	var tempID = setInterval(frame, 1);
	
	if(value < 0)
		// Restart the passive shield regen
		passiveShieldRegen();

	function frame() {
		if(i < ticks) {
			if (!Pause) {
				temp = hpTick;
				
				if(hpTick < 0)
					// Reduce shield first
					hpTick = reduceShield(hpTick);
				
				displayedHP += hpTick;
				hpTick = temp;
				
				if (displayedHP > maxHP) {
					clearInterval(tempID);
					displayedHP = maxHP;
					updateHPDisplay();
					return;
				}

				if (parseInt(displayedHP + 0.5) <= 0) {
					clearInterval(tempID);
					document.getElementById('currentHP').innerHTML = '' + 0;
					hpBoxCurrent.style.width = 0;
					gameOverAudio.play();
					gameOver();
					return;
				}

				updateHPDisplay();
				i++;
			}
		} else {
			clearInterval(tempID);
		}
	}
}

/* Reduces shield by @hpTick */
function reduceShield(hpTick) {
	var restTick = 0;
	currentShield += hpTick;
	
	if(currentShield < 0) {
		restTick = currentShield;
		currentShield = 0;
	}
	
	displayedShield = parseInt(currentShield + 0.5);
	updateShieldDisplay();
	return restTick;
}

/* Recharges shield to full capacity */
function rechargeShield() {
	var i = 0;
	
	var tempID = setInterval(function() {
		if(displayedShield < maxShield) {
			if(!Pause) {
				currentShield = ++displayedShield;
				updateShieldDisplay();
			}
		} else clearInterval(tempID);
	}, 10);
	
	updateShieldDisplay();
}

var shieldID;
var shieldRegenID;

/* passive shield regen starting after 5 seconds have passed */
function passiveShieldRegen() {
	clearTimeout(shieldID);
	clearInterval(shieldRegenID);
	
	shieldID = setTimeout(function() {
		shieldRegenID = setInterval(function() {
			if((displayedShield < maxShield) && !Pause) {
				currentShield = ++displayedShield;
				updateShieldDisplay();
			}
		}, 1000);
	}, 5000);
}

/* Sets HP to @value */
function setHP(value) {
	value = parseInt(value + 0.5);
	
	if(value <= 0) {
		gameOver();
		return;
	}
	
	if(value > maxHP)
		value = maxHP;

	currentHP = value;
	displayedHP = value;
	updateHPDisplay();
}

/* Sets shield to @value */
function setShield(value) {
	value = parseInt(value + 0.5);
	
	if(value < 0)
		value = 0;
	
	if(value > maxShield)
		value = maxShield;
	
	currentShield = value;
	displayedShield = value;
	updateShieldDisplay();
	passiveShieldRegen();
}

/* Returns currentHP */
function getHP() {
	return currentHP;
}

/* Returns currentShield */
function getShield() {
	return currentShield;
}

/* Sets maxHP to @value */
function setMaxHP(value) {
	maxHP = parseInt(value + 0.5);
	document.getElementById('maxHP').innerHTML = '' + maxHP;
	updateHPDisplay();
}

/* Sets maxShield to @value */
function setMaxShield(value) {
	maxShield = parseInt(value + 0.5);
	document.getElementById('maxShield').innerHTML = '' + maxShield;
	updateShieldDisplay();
}

/* Returns maxHP */
function getMaxHP() {
	return maxHP;
}

/* returns maxShield */
function getMaxShield() {
	return maxShield;
}

/* Updates the displayed HP */
function updateHPDisplay() {
	// Update the HP label
	var temp = document.getElementById('currentHP');
	temp.innerHTML = parseInt(displayedHP + 0.5);

	// Update the HP width
	hpBoxCurrent.style.width = displayedHP / maxHP * 100 + '%';

	// Update the HP color
	hpUpdateColor();
}

/* Updates the displayed Shield */
function updateShieldDisplay() {
	// Update the shield label
	var tempRef = document.getElementById('currentShield');
	tempRef.innerHTML = parseInt(displayedShield + 0.5);

	// Update the shield width
	shieldBoxCurrent.style.width = displayedShield / maxShield * 100 + '%';

	// Update the shield color
    var temp = parseInt(255.5 * displayedShield / maxShield);
	shieldBoxCurrent.style.background = '#00' + padHex(temp.toString(16)) + 'FF';
}

/* Sets the HP bar to a calculated color-gradient. */
function hpUpdateColor() {
    var temp;
    
	if(displayedHP <= (maxHP / 2)) {
		// Color gradient in hex from 0% to 50%
		temp = parseInt((510 * displayedHP / maxHP) + 0.5);
		hpBoxCurrent.style.background = '#FF' + padHex(temp.toString(16)) + '00';
	} else {
		// Color gradient in hex from 50% to 100%
		temp = parseInt(255.5 - 255 * (2 * displayedHP / maxHP - 1));
		hpBoxCurrent.style.background = '#' + padHex(temp.toString(16)) + 'FF00';
	}
}
 
/* Pads @hex if it is shorter than 2 digits */
function padHex(hex) {
	while(hex.length < 2) {
		hex = '0' + hex;
	}
	
	return hex;
}

/**
 * FUNCTIONS FOR GAME OVER
 */

/* Initiates the gameOver sequences */
function gameOver() {
	
	var score = {
		"score": getScore(),
		"player": localStorage.getItem("player"),
		"level": 1
	};
	postNewScore(score);
	glitchScreen(500);
	document.getElementById('gameOverText3').innerHTML = getScore();
	$('#gameOverBox').animate({top: '20%'}, 500);
  	Pause = true;
  	PauseScreen = true;
    movement.unlockPointer();
}

/**
 * FUNCTIONS FOR LEVEL
 */

var min = 0;
var sec = 0;
var minHTML = document.getElementById('timerBoxMin');
var secHTML = document.getElementById('timerBoxSec');

/* Displays @value as the current level */
function displayLevel(value) {
	var levelReference = document.getElementById('currentLevel');
	levelReference.innerHTML = parseInt(value);
	$('#levelDisplay').animate({opacity: '1', top: '50px'}, 1000);

	setTimeout(function() {
    	$(levelReference).animate({opacity: '1'}, 100);
		$(levelReference).animate({opacity: '0.3'}, 100);
		$(levelReference).animate({opacity: '1'}, 100);
		$(levelReference).animate({opacity: '0.3'}, 100);
		$(levelReference).animate({opacity: '1'}, 100);
	}, 5000);

	setTimeout(function() {
		$('#levelDisplay').animate({opacity: '0', top: '0px'}, 1000);
	}, 1500);
}

/* Sets the timer to @seconds translated to minutes and seconds */
function setLevelTimer(seconds) {
	min = Math.floor(parseInt(seconds + 0.5) / 60);
	sec = parseInt(seconds + 0.5) % 60;
	displayTimer();
}

/* Starts the timer */
function startLevelTimer() {
	var levelTimer = setInterval(function() {
		if(!Pause) {
			if(sec == 0 && min > 0) {
				min--;
				sec = 59;
			} else if(sec <= 1 && min == 0) {
				level++;
				levelDesign(level);
			} else {
				sec--;
			}
			displayTimer();
		}
	}, 1000);
}

/* Updates the displayed time */
function displayTimer() {
	if(sec < 10)
		secHTML.innerHTML = '0' + sec;
	else
		secHTML.innerHTML = sec;

	if(min < 10)
		minHTML.innerHTML = '0' + min;
	else
		minHTML.innerHTML = min;
}

/**
 * FUNCTIONS FOR SPEED
 */

var maxSpeed = 100;
var maxBoost = 1.0;

/* Sets the displayed speed value and bar to @newSpeed */
function setSpeed(newSpeed) {
	var speedFactor = 4.04;

	// Set the heigh of the speed bar
	var speedBox = document.getElementById('speedBarValue');
	speedBox.style.height = Number(newSpeed) / maxSpeed * 100 + '%';

	// Set the color of the speed bar
	var temp = parseInt(255.5 - Number(newSpeed) / maxSpeed * 255);
	speedBox.style.background = '#FF' + padHex(temp.toString(16)) + '00';

	// Set the displayed speed value
	var tempRef = document.getElementById('speedValue');
	tempRef.innerHTML = parseInt(newSpeed * speedFactor) + '' + parseInt(Math.random() * 10);

	if(parseInt(tempRef.innerHTML) >= parseInt(maxSpeed * speedFactor) * 10)
		tempRef.innerHTML = parseInt(maxSpeed * speedFactor * 10);

	// Soll der aufhören upzudaten wenn das Achievement erreicht wurde?
	if(parseInt(tempRef.innerHTML) > reachedMaxSpeed){
		reachedMaxSpeed = parseInt(tempRef.innerHTML);
		checkMilestones();
	}

	if(parseInt(tempRef.innerHTML) < 10)
		tempRef.innerHTML = 00;
}

/* Sets maxSpeed to @newMaxSpeed */
function setMaxSpeed(newMaxSpeed) {
	maxSpeed = parseInt(newMaxSpeed * maxBoost);
	setSpeed(-yAxis);
}

/**
 * FUNCTIONS FOR POWERUPS
 */

/* Changes the status of an addressed PowerUp */
function setPowerUp(powerUp, removeOrAdd) {

	var icon = document.getElementById('powerUp'+powerUp);

	if (removeOrAdd == 1)
		icon.classList.remove('inactive');

	else if (removeOrAdd == 0)
		icon.classList.add('inactive');
}

/**
 * FUNCTIONS FOR MENU
 */

/* Opens the Shop tab */
function showShop() {
	menuHideAll();
	$('#shop').show();
	menuResetColors();
	menuSetColor('shopBox');
}

/* Opens the Highscore tab */
function showHighscore() {
	menuHideAll();
	$('#highscore').show();
	menuResetColors();
	menuSetColor('highscoreBox');
	loadMenuHighscore();
}

/* Opens the Milestones tab */
function showMilestones() {
	menuHideAll();
	$('#milestones').show();
	menuResetColors();
	menuSetColor('milestoneBox');
	checkMilestones();
	/* UPDATE VALUES */
}

/* Opens the Options tab */
function showOptions() {
	menuHideAll();
	$('#options').show();
	menuResetColors();
	menuSetColor('optionsBox');
}

function showChat() {
	menuHideAll();
	$('#chat').show();
	menuResetColors();
	menuSetColor('chatBox');
}


/* Resets previously highlighted tabs */
function menuResetColors() {
    var temp = $('.pauseButton');
    temp.css('border-color', 'rgba(0, 153, 204, 0.7)');
    temp.css('background-color', 'rgba(230, 230, 230, 0.7)');
    temp.css('box-shadow', 'inset 1px 1px 6px -2px #00ace6, inset 4px 4px 10px -6px #cccccc, 5px 3px 71px -11px rgba(255,255,255,0.7)');
}

/* Highlights the current tab */
function menuSetColor(box) {
    var temp = $('#' + box);
	temp.css('border-color', 'rgba(255, 170, 0, 0.9)');
	temp.css('background-color', 'rgba(255, 255, 255, 0.8)');
    temp.css('box-shadow', 'inset 1px 1px 8px -5px #ffaa00, 5px 3px 71px -11px rgba(255,255,255,0.7)');
}

/* Closes previously openend tabs */
function menuHideAll() {
	$('#shop').hide();
	$('#highscore').hide();
	$('#milestones').hide();
	$('#options').hide();
}

/* Closes the menu */
function menuClose() {
    PauseScreen = false;
    interface.toggleMenuOverlay();
    movement.lockPointer();
}

/**
 * FUNCTIONS FOR SHOP
 */

var amountUpgrade2 = 0;
var passiveHPID;

costUpgrade = [
	500,	// + 10 maxHP
	1250,	// passive HP regen
	500,  // + 10 shield
	500,	// + 1 maxSpeed
	250,	// + 2 MaxRocketAmmo
	500,	// + 1 rocketDamage
	250,	// + 20 MaxMGAmmo
	500,	// + 1 mgDamage
	250,	// + shockwave ammo
	750		// + shockwave damagefach
];

costUpgradeFactor = [
	1.15,	// + 10 maxHP
	1.15,	// passive HP regen
	1.15, 	// + 10 shield
	1.2,	// + 1 maxSpeed
	1.09,	// + 2 MaxRocketAmmo
	1.2,	// + 1 rocketDamage
	1.09,	// + 20 MaxMGAmmo
	1.2,	// + 1 mgDamage
	1.09,	// + shockwave ammo
	1.2 	// + shockwave damage
];

/* Highlight items the player can purchase */
function checkBuyable() {
	for(var i = 0; i < costUpgrade.length; i++) {
		document.getElementById('costUpgrade' + i).innerHTML = '' + costUpgrade[i];
		
		if(currentMoney < costUpgrade[i])
			document.getElementById('shopItem' + i).style.opacity = '0.5';
		else
			document.getElementById('shopItem' + i).style.opacity = '1';
	}
}
var buySound = 1;
/* Buy the shop item with index @i */
function buyUpgrade(i) {
	if(currentMoney < costUpgrade[i])
		return;
	
	switch(i) {
		case 0:		// + 10 maxHP
			setMaxHP(getMaxHP() + 10);
			break;
		case 1:		// passive HP regen
			clearInterval(passiveHPID);
			passiveHPID = setInterval(function() {		
				if (!Pause) {
					currentHP = currentHP + 1;
					displayedHP += 1;

					if (currentHP > maxHP)
						currentHP = maxHP;

					if (displayedHP > maxHP)
						displayedHP = maxHP;
					
					updateHPDisplay();
				}
			}, 5000 / ++amountUpgrade2);
			break;
		case 2:
			setMaxShield(getMaxShield() + 10);
			passiveShieldRegen();
			break;
		case 3:		// + 1 maxSpeed
			setMaxSpeed(++maxVel);
			break;
		case 4:		// + 2 MaxRocketAmmo
			MaxRocketAmmo += 2;
			break;
		case 5:
			rocketDamage++;
			break;
		case 6:
			MaxMGAmmo += 50;
			break;
		case 7:
			MGDamage += 1;
			break;
		case 8:
			maxShockwaveAmmo += 5;
			break;
		case 9:
			shockWaveDamage +=2;
			break;
		default:
			return;
	}
	
	switch(buySound){
		case 1:
			cachingAudio1.play();
		break;
		case 2:
			cachingAudio2.play();
		break;
		case 3:
			cachingAudio3.play();
		break;
	}
	
	if(buySound>=3){
		buySound=1;
	}else{
		buySound++;
	}
	
	changeMoney(-costUpgrade[i]);
	moneySpentInShop += costUpgrade[i];
	costUpgrade[i] = parseInt(costUpgrade[i] * costUpgradeFactor[i]);
	checkBuyable();
	updateWeaponInterface();
}

function pickUpPowerUpNote(value){
	document.getElementById('powerUpPickUpNote').innerHTML = value;
	
	var box = document.getElementById('powerUpPickUp');
	
	//$(box).animate({bottom: '-50px'}, 1);
	$(box).animate({bottom: '60px'}, 500);
	$(box).animate({bottom: '60px'}, 1000);
	$(box).animate({bottom: '-50px'}, 500);
	

}

/**
 * FUNCTIONS FOR MILESTONES
 */
 
var reachedMoney = 0;
var moneySpentInShop = 0;
var reachedMaxSpeed = 80;
 
function displayMilestoneNote(value) {
	//document.getElementById('milestoneNote').innerHTML = value;
	//$('#picRef').css('background-image', 'url(../textures/GUIachievement2.png)');
	
	achievementAudio.play();
	
	var displayRef = document.getElementById('milestoneDisplay');
	displayRef.innerHTML = 'You have unlocked: ' + milestoneName[value - 1] + '<br> Highscore += ' + milestonesHighscore[value - 1];
	
	changeScore(parseInt(milestonesHighscore[value-1]));
	
	$(displayRef).animate({opacity: '1', right: '10px'}, 1000);
	setTimeout(function() {
		$(displayRef).animate({opacity: '0', right: '-400px'}, 1000);
	}, 4000);
}

var milestoneName = [
	"Speed Junkie",
	"Speedy Gonzales",
	"Catch 'em All",
	"Scrooge McDuck",
	"Richer than Scrooge McDuck",
	"Sugar Daddy",
	"Shopaholic",
	"Headhunterz",
	"Hero of the Universe",
	"Vacuum Cleaner",
	"Star Destroyer"
];

var reachedMilestone = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false
];

var milestonesHighscore = [
	1000,
	2000,
	1500,
	1000,
	2000,
	1000,
	2000,
	3000,
	6000,
	3000,
	6000
];

function showDescription(number) {
    $('#description'+number).toggle();
}

function checkMilestones(){
	changeMilestoneProgress(1, reachedMaxSpeed, 600);
	changeMilestoneProgress(2, reachedMaxSpeed, 1000);
	changeMilestoneProgress(3, collectedPowerups, 15);
	changeMilestoneProgress(4, reachedMoney, 5000);
	changeMilestoneProgress(5, reachedMoney, 15000);
	changeMilestoneProgress(6, moneySpentInShop, 10000);
	changeMilestoneProgress(7, moneySpentInShop, 20000);
	changeMilestoneProgress(8, destroyedEnemies, 20);
	changeMilestoneProgress(9, destroyedEnemies, 50);
	changeMilestoneProgress(10, destroyedAsteroids, 20);
	changeMilestoneProgress(11, destroyedAsteroids, 50);
}

var percentage;
function changeMilestoneProgress (number, current, max) {
	percentage = (current/max) * 100;
	if (percentage > 100) {
		percentage = 100;
		setFinished(number);
	}
	$('#progressbar' + number).css('width', percentage + '%'); 
	$('#currentAchievementProgress' + number).html(current);
}


function setFinished(number) {
	/* Ideen?? */
	
	if(!reachedMilestone[number-1]){
		displayMilestoneNote(number);
		reachedMilestone[number-1] = true;
	}

    var temp = $('#progressbar' + number);
	temp.css('background-color', 'rgba(255, 170, 0, 0.6)');
	temp.css('border-color', 'rgba(255, 255, 255, 0.8)');
	temp.css('box-shadow', 'none');
}

/**
 * FUNCTIONS FOR OPTIONS
 */
 
/* Highlights the active crosshair */
function checkActiveCross() {
	$('.crossPic').css('border-color','rgba(0, 153, 204, 0.7)');
	$('#crossPic' + pos).css('border-color', 'rgba(255, 170, 0, 0.9)');
}

/* Inverts mouse input */
function invertedMouseFunc() {
	mouseInverted *= -1;
}

/* Toggles scrollbar-hiding */
function hideScrollbars() {
	//var tempLeft = $('.invertedInnerScrollbar');
	var tempRight = $('.innerScrollbar');

	switch(tempRight.css('margin-right')) {
		case '-16px':
			//tempLeft.css('margin-left', 'auto');
			tempRight.css('margin-right', 'auto');
			document.getElementById('hideScrollbars').checked = false;
			break;
		default:
			//tempLeft.css('margin-left', '-16px');
			tempRight.css('margin-right', '-16px');
			document.getElementById('hideScrollbars').checked = true;
			break;
	}
}

/* Inverts the direction of the shield bar */
function invertShieldBar() {
	var shieldBox = document.getElementById('shieldBox');
	var shieldTextBox = document.getElementById('shieldTextBox');
	
	switch(shieldTextBox.style.left) {
		case '46%':
			shieldBox.style.transform = 'rotate(180deg)';
			shieldTextBox.style.transform = 'rotate(180deg) skewX(45deg)';	
			shieldTextBox.style.top = '3%';	
			shieldTextBox.style.left = '45%';
			document.getElementById('invertedShieldBar').checked = false;
			break;
		default:
			shieldBox.style.transform = 'rotate(0deg)';
			shieldTextBox.style.transform = 'skewX(45deg)';	
			shieldTextBox.style.top = '0%';	
			shieldTextBox.style.left = '46%';
			document.getElementById('invertedShieldBar').checked = true;
			break;
	}
}

function changeVolume(bar, value) {
	switch (bar) {
		case 1: 
			for (var v = 2; v <= 4; v++) {
				changeVolume(v, value);
				$('#adv'+v).val(value);
			}
			break;
		case 2:
			backgroundMusic.volume = value;
			break;
		case 3:
			laserAudio.volume = value;
			asteroidAudio.volume = value;
			asteroidLowAudio.volume = value;
			powerUpAudio.volume = value;
			rocketAudio.volume = value;
			explosionAudio.volume = value;
			MGAudio.volume = value;
			break;
		case 4:
			gameOverAudio.volume = value;
		    cachingAudio1.volume = value;
		    cachingAudio2.volume = value;
		    cachingAudio3.volume = value;
		    buttonAudio1.volume = value;
			buttonAudio2.volume = value;
		    achievementAudio.volume = value;
		    break;
	}
	$('#soundValue'+bar).html(parseInt(value*100)+'%');
}

function showAdvancedSoundOptions() {
	$('#advancedSoundOptions').toggle();
}

var buttonPlayVar = 1;
function buttonHover() {
	switch(buttonPlayVar) {
		case 1:
			buttonAudio1.play();
			break;
		case 2:
			buttonAudio2.play();
			break;
		default:
			break;
	}
	
	if(buySound >= 2) {
		buySound = 1;
	} else {
		buySound++;
	}
}

var highscoreShowed = false;
function loadMenuHighscore() {
	if(!highscoreShowed) {
	   network.loadTop10(function (highscore) {
            for (var i = 0; i < highscore.length; i++) {
                var score = highscore[i];
                var tableTag =
                    "<tr>" +
                        "<td class='col-md-2'>" + (i + 1) + "</td>" +
                        "<td class='col-md-3'>" + score.player + "</td>" +
                        "<td class='col-md-4'>" + score.score + "</td>" +
                    "</tr>";
                $("#menuHighscore").html($("#menuHighscore").html() + tableTag);
            }
        });
		highscoreShowed = true;
	}
}

var fpsVisible = false;

function showFPS() {
	if(fpsVisible) {
		container.removeChild(stats.dom);
		fpsVisible = false;
		document.getElementById('showFPS').checked = false;
	} else {
		container.appendChild(stats.dom);
		fpsVisible = true;
		document.getElementById('showFPS').checked = true;
	}
}

function saveGame() {
	var temp = "Control123" + " \"" + /*playername +*/ "\" " + currentLevel + " " + 
		maxHP + " " + currentHP + " " + maxShield + " " + currentShield + " " + 
		currentScore + " " + currentMoney + " " + MGAmmo + " " + MaxMGAmmo + " " + 
		rocketAmmo + " " + MaxRocketAmmo + " " /*+ sw + lr */ ;
	// encrypt and write
}

function loadGame(save) {
	// read and decrypt
	var temp = save.split(" ");
	if(temp[0] != "Control123")
		return false; //Invalid savefile
	//playername = temp[1];
	currentLevel = parseInt(temp[2]);
	setMaxHP(Number(temp[3]));
	setHP(Number(temp[4]));
	setMaxShield(Number(temp[5]));
	setShield(Number(temp[6]));
	setScore(Number(temp[7]));
	setMoney(Number(temp[8]));
	MGAmmo = Number(temp[9]);
	MaxMGAmmo = Number(temp[9]);
	rocketAmmo = Number(temp[9]);
	MaxRocketAmmo = Number(temp[9]);
	//other weapons
	
	
	updateWeaponInterface();
	document.getElementById('invertedMouse').checked = true;
	document.getElementById('hideScrollbars').checked = true;
	document.getElementById('invertedShieldBar').checked = false;
	spaceAudio.play();
	levelDesign(level);
	startLevelTimer();
}