const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { boom } = require('@hapi/boom');
const fs = require('fs');
const config = require('./config');
const { handler } = require('./handler/command');

// Fungsi start bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true,
        browser: ["Aesthetic Bot", "Chrome", "1.0"]
    });

    // Auto reconnect
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof boom.Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startBot();
            } else {
                console.log('Koneksi terputus.');
            }
        } else if (connection === 'open') {
            console.log('Bot Terhubung! ✨');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // Menangani pesan masuk
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        
        for (const msg of messages) {
            if (!msg.message) continue;

            const messageType = Object.keys(msg.message)[0];
            const messageContent = msg.message;
            const from = msg.key.remoteJid;
            const isGroup = from.endsWith('@g.us');
            const sender = isGroup ? msg.key.participant : from;

            // Mendapatkan teks pesan
            let text = '';
            if (messageType === 'conversation') {
                text = messageContent.conversation;
            } else if (messageType === 'extendedTextMessage') {
                text = messageContent.extendedTextMessage.text;
            } else if (messageType === 'imageMessage') {
                text = messageContent.imageMessage.caption;
            }

            // Cek prefix dan command
            const prefix = '.'; // Bisa diganti multi-prefix nanti
            const command = text.startsWith(prefix) ? text.slice(prefix.length).trim().split(' ')[0].toLowerCase() : false;

            if (command) {
                console.log(`Command: ${command} dari ${sender}`);
                await handler({ sock, msg, command, text, from, isGroup, sender, config });
            } else if (text.toLowerCase() === 'menu' || text.toLowerCase() === 'help') {
                // Jika user ketik "menu" tanpa prefix
                await handler({ sock, msg, command: 'menu', text, from, isGroup, sender, config });
            }
        }
    });
}

startBot();
