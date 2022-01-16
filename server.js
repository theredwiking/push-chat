const Pushbullet = require('pushbullet');
const dotenv = require('dotenv');

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
        switch(response.pushes[0].type) {
            case 'link':
                console.log(response.pushes[0].url);
                break;
            case 'note':
                console.log(response.pushes[0].body);
                break;
            case 'file':
                console.log(response.pushes[0].file_url);
                break;
            default:
                console.log(response.pushes);
        }
    });
});

stream.connect();