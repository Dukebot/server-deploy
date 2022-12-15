const Config = require('./src/config')
const serverGitDeploy = require('./src/server-git-deploy')

const myArgs = process.argv.slice(2)
const projectPath = myArgs[0]

serverGitDeploy(
    Config.Server.host,
    Config.Server.username,
    Config.Server.password,
    Config.GitHub.username,
    Config.GitHub.token,
    projectPath
)