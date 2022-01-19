const https = require('https');
const { exit } = require('process');

let getRequest = (options, callback) => {
    https.request(options, (response) => {
        let str = '';

        response.on('data', (chunk) => {
            str += chunk;
        });

        response.on('end', () => {
            callback(str);
        });   
    }).end();
}

exports.Cases = (sender, msg, pusher) => {
    switch(msg) {
        case 'System status':
            pusher.note(sender, "Status", "Online", (err, resp) => {
                if (err) console.log(err);
            });
            break;
            
        case 'Web status':
            let sites = {};
            
            getRequest({host: 'jellyfin.theredwiking.com', path: '/health', port: 443}, (str) => {
                if(str !== 'Healthy') {
                    console.log(str);
                }
                console.log(str);
            });

            console.log(sites);

            pusher.note(sender, "Websites", `${JSON.stringify(sites)}`, (err, resp) => {
                if (err) console.log(err);
            });
            break;

        default:
            console.log(msg);
    }
}