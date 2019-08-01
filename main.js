const robot = require('robotjs');
const tmi = require('tmi.js');
const activeWin = require('active-win');

const options = require("./options");

const client = new tmi.client(options);

const locations = {
	1: [580, 494],
	2: [720, 494],
	3: [840, 494],
	4: [975, 494],
	5: [1111, 494],
	6: [1240, 494],
	7: [1370, 494],
	8: [484, 580],
	9: [623, 580],
	10: [760, 580],
	11: [910, 580],
	12: [1042, 580],
	13: [1181, 580],
	14: [1318, 580],
	15: [538, 671],
	16: [688, 671],
	17: [832, 671],
	18: [980, 671],
	19: [1123, 671],
	20: [1268, 671],
	21: [1411, 671],
	b1: [431, 788],
	b2: [554, 788],
	b3: [676, 788],
	b4: [796, 788],
	b5: [910, 788],
	b6: [1031, 788],
	b7: [1156, 788],
	b8: [1270, 788],
	b9: [1393, 788]
};

const itemLocation = {
	i1: [293, 745],
	i2: [329, 715],
	i3: [376, 683],
	i4: [409, 653],
	i5: [311, 685],
	i6: [345, 650],
	i7: [391, 626],
	i8: [328, 625],
	i9: [332, 592]
};

const buyLocation = {
	s1: [596, 985],
	s2: [790, 985],
	s3: [976, 985],
	s4: [1181, 985],
	s5: [1382, 985]
};

const directions = {
	u: [965, 250],
	l: [472, 446],
	r: [1406, 446],
	d: [965, 725]
};

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = screenSize.height;
var width = screenSize.width;

var trueWH = 1.25;

var waitTime = 200;

var waitForNextCommand = 0;


client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

//Mouse Speed Up
robot.setMouseDelay(200);
robot.setKeyboardDelay(200);

function onMessageHandler(target, context, msg, self) {
	if(self) { return; }
	
	if(waitForNextCommand) { return; }
	
	//We'll split all the strings so it's easier to get the options
	var words = msg.split(' ');
	var commandName = words[0];
	
	//Gets the current active window.
	var winActive = activeWin.sync();
	
	console.log(msg);
	
	if(winActive.title == "League of Legends") {
		if(commandName == "!play") {
			waitCommand();
			moveAndClick(300, 110); //Play button
			setTimeout(function() {moveAndClick(1250, 325)}, 1000); //TFT Button
			setTimeout(function() {moveAndClick(1200, 715)}, 1500); //Ranked Button
			setTimeout(function() {moveAndClick(842, 919)}, 1800); //Confirm Button
			setTimeout(function() {moveAndClick(842, 919)}, 10000);	//Start Button
			setTimeout(function() {waitCommand()}, 10300);	
		} else if(commandName == "!accept") {
			waitCommand();
			moveAndClick(950, 750); //Accept Button
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!skip") {
			waitCommand();
			moveAndClick(827, 517); //Skip waiting for stats
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		}
	} else if(winActive.title == "League of Legends (TM) Client") {
		if(commandName == "!r") {
			waitCommand();
			robot.keyTap("d");
			waitCommand();
		} else if(commandName == "!xp") {
			waitCommand();
			robot.keyTap("f");
			waitCommand();
		} else if(commandName == "!exit") {
			waitCommand();
			moveAndClick(850, 530);
			setTimeout(function() {moveAndClick(715, 920)}, 10000);
			setTimeout(function() {waitCommand()}, 10000 + waitTime + 100);	
		} else if(commandName == "!continue") {
			waitCommand();
			moveAndClick(958, 645);
			setTimeout(function() {moveAndClick(715, 920)}, 10000);
			setTimeout(function() {waitCommand()}, 10000+ waitTime + 100);	
		} else if(commandName == "!b") {
			if(words[1] == "1") {
				waitCommand();
				moveAndClick(buyLocation.s1[0], buyLocation.s1[1]);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			} else if(words[1] == "2") {
				waitCommand();
				moveAndClick(buyLocation.s2[0], buyLocation.s2[1]);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			} else if(words[1] == "3") {
				waitCommand();
				moveAndClick(buyLocation.s3[0], buyLocation.s3[1]);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			} else if(words[1] == "4") {
				waitCommand();
				moveAndClick(buyLocation.s4[0], buyLocation.s4[1]);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			} else if(words[1] == "5") {
				waitCommand();
				moveAndClick(buyLocation.s5[0], buyLocation.s5[1]);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			}
		} else if(commandName == "!m") {
			if(words[1] in locations && words[2] in locations && words[1] && words[2]) {
				waitCommand();
				robot.moveMouse(locations[words[1]][0]/trueWH, locations[words[1]][1]/trueWH);
				robot.mouseToggle("down");
				robot.dragMouse(locations[words[2]][0]/trueWH, locations[words[2]][1]/trueWH);
				robot.mouseToggle("up");
				setTimeout(function() {waitCommand()}, 100);	
			}
		} else if(commandName == "!i") {
			if(words[1] in itemLocation && words[2] in locations && words[1] && words[2]) {
				waitCommand();
				robot.moveMouse(itemLocation[words[1]][0]/trueWH, itemLocation[words[1]][1]/trueWH);
				robot.mouseToggle("down");
				robot.dragMouse(locations[words[2]][0]/trueWH, locations[words[2]][1]/trueWH);
				robot.mouseToggle("up");
				setTimeout(function() {waitCommand()}, 100);	
			}
		} else if(commandName == "!s") {
			if(words[1] in locations && words[1]) {
				waitCommand();
				robot.moveMouse(locations[words[1]][0]/trueWH, locations[words[1]][1]/trueWH);
				setTimeout(function() {robot.keyTap("e");}, waitTime);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			}
		} else if(commandName == "!move") {
			if(words[1] in locations  && words[1]) {
				waitCommand();
				robot.moveMouse(locations[words[1]][0]/trueWH, locations[words[1]][1]/trueWH);
				setTimeout(function() {robot.mouseClick("right");}, waitTime);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			} else if(words[1] in directions && words[1]) {
				waitCommand();
				robot.moveMouse(directions[words[1]][0]/trueWH, directions[words[1]][1]/trueWH);
				setTimeout(function() {robot.mouseClick("right");}, waitTime);
				setTimeout(function() {waitCommand()}, waitTime + 100);	
			}
		} else if(commandName == "!lock") {
			waitCommand();
			moveAndClick(370, 908);
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!smile") {
			waitCommand();
			sendMessage(":)");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!gg") {
			waitCommand();
			sendMessage("gg");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!yes") {
			waitCommand();
			sendMessage("yes");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!no") {
			waitCommand();
			sendMessage("no");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!join") {
			waitCommand();
			sendMessage("Join us at: twitch.tv/letsplaytft");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!sad") {
			waitCommand();
			sendMessage(":(");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!kappa") {
			waitCommand();
			sendMessage("kappa");
			setTimeout(function() {waitCommand()}, waitTime + 100);	
		} else if(commandName == "!emote") {
			if(words[1] == 0) {
				waitCommand();
				robot.keyTap("numpad_5");
				waitCommand();
			} else if(words[1] == 1) {
				waitCommand();
				robot.keyTap("numpad_8");
				waitCommand();
			} else if(words[1] == 2) {
				waitCommand();
				robot.keyTap("numpad_4");
				waitCommand();
			} else if(words[1] == 3) {
				waitCommand();
				robot.keyTap("numpad_6");
				waitCommand();
			} else if(words[1] == 4) {
				waitCommand();
				robot.keyTap("numpad_2");
				waitCommand();
			}
		}
	}
}

function onConnectedHandler(addr, port) {
	console.log('Connected to ' + addr + ':' + port);
	console.log();
}

function sendMessage(msg) {
	robot.keyTap("t");
	setTimeout(function() {robot.typeString(msg);}, waitTime);
	setTimeout(function() {robot.keyTap("enter");, waitTime + 50);
}

function moveAndClick(x, y) {
	robot.moveMouse(x/trueWH, y/trueWH);
	setTimeout(function() {robot.mouseToggle("down");}, waitTime);
	setTimeout(function() {robot.mouseToggle("up");}, waitTime + 50);
}

function waitCommand() {
	if(waitForNextCommand == 1)
		waitForNextCommand = 0;
	else
		waitForNextCommand = 1;
}
