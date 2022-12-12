const Env = require('./env')

const Config = Object.freeze({
    GitHub: {
        username: Env.get('GIT_HUB_USERNAME', null),
        token: Env.get('GIT_HUB_TOKEN', null),
    },
    Server: {
        host: Env.get('SERVER_HOST', null),
        username: Env.get('SERVER_USERNAME', null),
        password: Env.get('SERVER_PASSWORD', null),
    },
})

module.exports = Config