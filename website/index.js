const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', (_, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.listen(process.env.PORT || 4000, () => {
    console.log('started.');
});
