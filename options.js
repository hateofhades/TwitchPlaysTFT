const settings = {
	connection: {
		reconnect: true
	},
	identity: {
		username: 'YOUR TWITCH USERNAME', //Put here your Twitch Bot Username
		password: 'oauth:OAUTH_KEY_HERE' //Put here the OAUTH Key
	},
	channels: [
		"YOUR TWITCH USERNAME" //Put here the channel where you want your Twitch Bot to use
	]
};

module.exports = options;