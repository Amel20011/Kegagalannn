const { sendMenu, sendSubMenu } = require('./menu');
const fs = require('fs');
const path = require('path');

const handler = async ({ sock, msg, command, text, from, isGroup, sender, config }) => {
    // Daftar command yang tidak memerlukan file terpisah (List Menu Logic)
    const menuCommands = ['menu', 'ownermenu', 'downloadmenu', 'groupmenu', 'usermenu', 'premiummenu', 'donasi', 'script', 'funmenu', 'toolsmenu'];

    if (menuCommands.includes(command)) {
        if (command === 'menu') {
            await sendMenu(sock, msg, from);
        } else {
            await sendSubMenu(sock, msg, from, command);
        }
        return;
    }

    // Logika untuk memuat perintah dari folder command/
    // Format nama file harus sama dengan command (contoh: owner.js untuk command .addprem)
    // Kita perlu mapping command ke file karena command bisa banyak dalam satu file (misal: owner.js punya addprem, delprem)
    
    const commandPath = path.join(__dirname, '../command');
    const categories = {
        'addprem': 'owner.js', 'delprem': 'owner.js', 'public': 'owner.js', 'self': 'owner.js',
        'ytmp3': 'download.js', 'ytmp4': 'download.js', 'tiktok': 'download.js',
        'add': 'group.js', 'kick': 'group.js', 'linkgc': 'group.js',
        'ping': 'user.js', 'owner': 'user.js',
        'joke': 'fun.js', 'quote': 'fun.js',
        'cekid': 'tools.js', 'shortlink': 'tools.js'
    };

    const targetFile = categories[command];

    if (targetFile) {
        try {
            const commandFile = require(path.join(commandPath, targetFile));
            // Panggil fungsi run di file command (pastikan setiap file mengekspor fungsi run)
            await commandFile.run({ sock, msg, command, text, from, isGroup, sender, config });
        } catch (error) {
            console.error(`Error executing ${targetFile}:`, error);
            sock.sendMessage(from, { text: "❌ Terjadi kesalahan pada command tersebut." }, { quoted: msg });
        }
    } else {
        // Jika command tidak ditemukan
        // sock.sendMessage(from, { text: "❌ Command tidak ditemukan! Ketik .menu untuk melihat daftar." }, { quoted: msg });
    }
};

module.exports = { handler };
