const Pushbullet = require('pushbullet');
const dotenv = require('dotenv');

dotenv.config();
const pusher = new Pushbullet(process.env.TOKEN)

const stream = pusher.stream();
stream.connect();

stream.on('connect', () => {
    console.log('Connected');
})