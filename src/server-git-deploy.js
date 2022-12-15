// https://www.npmjs.com/package/ssh2shell
const SSH2Shell = require('ssh2shell')

function serverGitDeploy(
    serverHost, 
    serverUsername, 
    serverPassword, 
    gitHubUsername, 
    gitHubToken, 
    projectPath
) {
    const SSH = new SSH2Shell({
        server: {
            host: serverHost,
            username: serverUsername,
            password: serverPassword
        },
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
                const commandResponse2 = commandResponse1 + gitHubUsername + "\r\nPassword for \'https://" + gitHubUsername + "@github.com\': ";
    
                if (response == commandResponse1) {
                    stream.write(gitHubUsername + '\n');
                } else if (response == commandResponse2) {
                    stream.write(gitHubToken + '\n');
                }
            }
        },
        onCommandComplete: function (command, response, sshObj) {
            console.log("\nonCommandComplete", { command, response });
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
}

module.exports = serverGitDeploy