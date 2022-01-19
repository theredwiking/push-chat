exports.Cases = (sender, msg, pusher) => {
    switch(msg) {
        case 'System status':
            pusher.note(sender, "Status", "Online", (err, resp) => {
                if (err) console.log(err);
            });
            break;
        default:
            console.log(msg);  
    }
}