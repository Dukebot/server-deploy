const { NodeSSH } = require('node-ssh')
const Config = require('./src/config')

const ssh = new NodeSSH()
const serverConnectionParams = {
    host: Config.Server.host,
    username: Config.Server.username,
    password: Config.Server.password
}

ssh.connect(serverConnectionParams).then(async function () {
    console.log("I'm in")

    // Command
    ssh.execCommand('hh_client --json', { 
        cwd:'projects' 
    }).then(function(result) {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
    })
})

