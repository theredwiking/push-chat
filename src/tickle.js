const note = require('./note')

exports.Tickle = (data, pusher) => {
    switch(data.type) {
        case 'link':
            console.log(data.url);
            break;
        case 'note':
            let msg = data.body;
            note.Cases(data.source_device_iden, msg, pusher);
            break;
        case 'file':
            console.log(data.file_url);
            break;
        default:
            console.log(data.pushes);
    }
}