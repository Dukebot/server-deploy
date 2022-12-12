// Import dotenv module to load the .env file
const dotenv = require('dotenv');

// Load .env variables to process.env
dotenv.config();

/**
 * Aux functions to retrieve values from .env file
 */
const Env = Object.freeze({
    /**
     * Get's a value from process.env
     * @param {*} property name of the property to get
     * @param {*} default_value default return value if property do not exists
     * @returns value of the property readen
     */
    get: (property, default_value = null) => process.env[property] || default_value,
    /**
     * This function expects to read a value containing 
     * the string 'true' or 'false' and converts it to a boolean.
     * @param {*} property name of the property to get
     * @param {*} default_value default return value if property do not exists
     * @returns true or false or the default_value
     */
    getBoolean: function (property, default_value = null) {
        if (process.env[property] && process.env[property] !== 'true' && process.env[property] !== 'false') {
            throw Error("Boolean parameters must contain string 'true' or 'false'");
        }
        if (process.env[property] === 'true') 
            return true;
        if (process.env[property] === 'false') 
            return false;
        return default_value;
    },
});

module.exports = Env;