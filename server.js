const Pushbullet = require('pushbullet');
const dotenv = require('dotenv');
const tickle = require('./src/tickle');

dotenv.config();
const pusher = new Pushbullet(process.env.TOKEN)

const stream = pusher.stream();

stream.on('connect', () => {
    console.log('Connected');
});

stream.on('close', () => {
    console.log('closed');
});

stream.on('error', (error) => {
    console.log(error);
});

stream.on('tickle', () => {
    pusher.history({limit: 5, modified_after: (Math.floor(new Date().getTime() / 1000) -1)}, (error, response) => {
        if (error) console.log(error);
        tickle.Tickle(response.pushes[0], pusher)
    });
});

stream.connect();