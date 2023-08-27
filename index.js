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

    for (let i = 0; i < envKeys.length; i++) {
        const key = envKeys[i];
        const newLine = [];
        if(envSchema[key].section) newLine.push(`\n# ${envSchema[key].section}\n`)
        newLine.push(`${key}=`)
        if(envSchema[key].default && envSchema[key].type === "number") newLine.push(envSchema[key].default)
        if(envSchema[key].default && envSchema[key].type === "string") `"${newLine.push(envSchema[key].default)}"`
        if(envSchema[key].discription) newLine.push(`# ${envSchema[key].discription}`)
        envFile.push(newLine.join(''))
    }

    return envFile.join('\n');
}

module.exports = {
    checkEnv,
    genEnv,
    validateWithJoi
}