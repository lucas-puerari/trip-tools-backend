import axios from 'axios';

const args = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpClient = axios.create(args);

export default httpClient;
