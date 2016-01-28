var fs = require('fs');
var commandList;
// var commandText = 'echo foo bar bazz boo | grep oo';
var commandText = 'cat bash.js | grep cmd';

function parser(text) {
	var commandStr = text.split('|');
	var commands = commandStr.map(function(cmd) {
		cmd = cmd.trim();
		var parts = cmd.split(' ');
		return {
			cmd: parts[0],
			args: parts.slice(1)
		};
	});
	//console.log(commands)
	return commands;
}

function done(result) {
	if (commandList.length === 0) {
		console.log(result);
	} else {
		pipe(result, commandList.shift())
	}
}

function pipe(input, command) {
	//console.log(done)
	command.args.unshift(done)
	command.args.unshift(input);
	if (!commands[command.cmd]) {
		commandList = [];
		return done('The command ' + command.cmd + ' is not found.')
	}
	commands[command.cmd].apply(null, command.args)
}

var commands = {
	echo: function(input, done) {
		var args = Array.prototype.slice.call(arguments, 2);
		var text = args.join(' ');
		console.log('echo called')
		done(text);
	},
	grep: function(input, done, search) {
		console.log('grep has been called')
		console.log(input)
		var regex = new RegExp(search, 'g');
		done(input.match(regex))
	},
	cat: function(input, done, file) {
		if (input) {
			return done(input);
		}
		fs.readFile(file, 'utf8', function(err, data) {
			if (!err) {
				done(data);
			}
		})
	},
	head: function(input, done, file) {
		function process(data) {
			var lines = data.split('\n').slice(0, 5).join('\n');
			return lines;
		}
		if (input) {
			return done(process(input));
		}
		fs.readFile(file, 'utf8', function (err, data) {
			if (!err) {
				done(process(data));
			}
		})
	},
	tail: function (input, done, file) {
		function process(data) {
			var lines = data.split('\n').slice(-5).join('\n');
			return lines;
		}
		if (input) {
			return done(process(input));
		}
		fs.readFile(file, 'utf8', function(err, data) {
			if (!err) {
				done(process(data));
			}
		})
	}
}

commandList = parser(commandText);
pipe(null, commandList.shift())