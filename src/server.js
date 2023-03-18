const app = require('./app');

const host = app.get('host');
const port = app.get('port');

app.listen(port, host, () => {
  console.log(`Backend runinng on: http://${host}:${port}`);
});
