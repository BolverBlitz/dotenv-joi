const schema = {
    "DBType": {
        "type": "string",
        "validation": "required||custom_list:redis,mysql,pg"
    },
    "DBHost": {
        "type": "string",
        "validation": "required||ip"
    },
    "DBPort": {
        "type": "number",
        "validation": "required||min:1||max:65535"
    },
}

const { checkEnv } = require('./index');

// Simulate the .env file

process.env = {
    "DBType": "pg",
    "DBHost": "192.168.1.77",
    "DBPort": "6379"
}

// Check the .env file

const failed = checkEnv(schema);

if (failed) {
    console.error('Failed to validate .env file');
    process.exit(1);
}

console.log('Successfully validated .env file');