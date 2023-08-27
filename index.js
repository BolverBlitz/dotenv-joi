const { validateWithJoi } = require('./validateJoi');

/**
 * Validate all .env values
 * @param {Object} envSchema 
 * @returns 
 */
const checkEnv = (envSchema) => {
    let failed = false;

    const envKeys = Object.keys(envSchema);

    envKeys.forEach(key => {
        const value = process.env[key];

        const validation = validateWithJoi(value, {
            key,
            type: envSchema[key].type,
            validation: envSchema[key].validation
        });

        if (validation) {
            console.error(`Invalid value for ${key}: ${validation.details[0].message}`);
            failed = true;
        }
    })

    return failed || false;
}

/**
 * Generate a empty .env file from a schema
 * @param {Object} envSchema 
 */
const genEnv = (envSchema) => {
    const envKeys = Object.keys(envSchema);
    const envFile = []

    envKeys.forEach(key => {
        envFile.push(`${key}=`)
    })

    return envFile.join('\n');
}

module.exports = {
    checkEnv,
    genEnv,
    validateWithJoi
}