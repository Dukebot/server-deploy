// https://www.npmjs.com/package/ssh2shell
const SSH2Shell = require('ssh2shell')
const Config = require('./src/config')

const serverConnectionParams = {
    host: Config.Server.host,
    username: Config.Server.username,
    password: Config.Server.password
}
const gitHub = {
    username: Config.GitHub.username,
    token: Config.GitHub.token,
}
const myArgs = process.argv.slice(2)
const projectPath = myArgs[0]

const SSH = new SSH2Shell({
    server: serverConnectionParams,
    commands: [
        'cd ' + projectPath,
        'git reset --hard HEAD',
        'git pull',
    ],
    onCommandProcessing: function (command, response, sshObj, stream) {
        console.log("\nonCommandProcessing", { command, response });

        // Introduce git credentials
        if (command == "git pull") {
            const commandResponse1 = "git pull\r\nUsername for \'https://github.com\': ";
            const commandResponse2 = commandResponse1 + gitHub.username + "\r\nPassword for \'https://" + gitHub.username + "@github.com\': ";

            if (response == commandResponse1) {
                stream.write(gitHub.username + '\n');
            } else if (response == commandResponse2) {
                stream.write(gitHub.token + '\n');
            }
        }
    },
    onCommandComplete: function (command, response, sshObj) {
        console.log("\nonCommandComplete ->", { command, response });
    },
    onCommandTimeout: function ( command, response, stream ,connection ) {
        console.log("\nonCommandTimeout", { command, response });
    },
    onEnd: function (sessionText, sshObj) {
        console.log("\nonEnd", sessionText);
    },
    onError: function( err, type, close = false, callback ) {
        console.log("\nonError", err);
    },
})

SSH.connect()