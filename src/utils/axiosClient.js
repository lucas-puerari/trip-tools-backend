const axios = require('axios');

const args = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const axiosClient = axios.create(args);

module.exports = axiosClient;
