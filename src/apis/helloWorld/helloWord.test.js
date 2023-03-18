const app = require('../../app');

const axiosClient = require('../../utils/axiosClient');

const endpoint = '/hello-world';

describe(`GET ${endpoint}`, () => {
    let server;

    const host = app.get('host');
    const port = app.get('port');
    const baseUrl = `http://${host}:${port}`;
    const url = `${baseUrl}${endpoint}`;

    beforeAll(() => {
        server = app.listen(port, host, () => {
            console.log(`Backend runinng on: ${baseUrl}`);
        });
    });

    afterAll(() => {
        server.close();
    });

    it('200 - Return Hello World message', async () => {
        const response = await axiosClient.get(url);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('Hello World!');
    });
});
