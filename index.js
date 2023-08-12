const { validateWithJoi } = require('./validateJoi');

// Check all .env values if they are valid

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

module.exports = {
    checkEnv,
    validateWithJoi
}