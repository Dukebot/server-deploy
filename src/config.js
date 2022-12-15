// Import dotenv module to load the .env file
const dotenv = require('dotenv');

// Load .env variables to process.env
dotenv.config();

/**
 * Get's a value from process.env
 * @param {string} property name of the property to get
 * @param {any} default_value default return value if property do not exists
 * @returns value of the property readen or default_value if not exists
 */
const env = (property, default_value = null) => process.env[property] || default_value;

/**
 * APP CONFIG
 */
const Config = Object.freeze({
    GitHub: {
        username: env('GIT_HUB_USERNAME', null),
        token: env('GIT_HUB_TOKEN', null),
    },
    Server: {
        host: env('SERVER_HOST', null),
        username: env('SERVER_USERNAME', null),
        password: env('SERVER_PASSWORD', null),
    },
})

module.exports = Config