exports.run = async ({ sock, msg, command, text, from, isGroup, sender, config }) => {
    switch(command) {
        case 'ping':
            const timestamp = Date.now();
            await sock.sendMessage(from, { text: `Pong! 🏓 ${Date.now() - timestamp}ms` }, { quoted: msg });
            break;

        case 'owner':
            await sock.sendMessage(from, { 
                text: config.ownerContact,
                contacts: { displayName: 'Owner', contacts: [{ vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Owner;;;\nFN:Owner\nitem1.TEL;waid=6281234567890:+62 812-3456-7890\nitem1.X-ABLabel:Mobile\nEND:VCARD' }] }
            }, { quoted: msg });
            break;
    }
};
