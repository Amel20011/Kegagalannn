const config = require('../config');

const sendMenu = async (sock, msg, from) => {
    // Pesan Pembuka Aesthetic
    const textMessage = `
💗 WHATSAPP BOT 💗
Haii Kak 💗
Aku siap bantu kamu 🌷
Silakan pilih menu favorit kamu ya ✨🫶🏻

Powered by Baileys-Pro
    `.trim();

    const sections = [
        {
            title: "💐 MAIN MENU",
            rows: [
                { title: "👑 Owner Menu", rowId: ".ownermenu", description: "Fitur khusus owner bot" },
                { title: "📥 Download Menu", rowId: ".downloadmenu", description: "Download video/audio sosmed" },
                { title: "👥 Group Menu", rowId: ".groupmenu", description: "Fitur administrasi grup" }
            ]
        },
        {
            title: "🌷 USER MENU",
            rows: [
                { title: "🙋‍♀️ User Menu", rowId: ".usermenu", description: "Fitur umum pengguna" },
                { title: "💎 Premium Menu", rowId: ".premiummenu", description: "Fitur eksklusif premium" },
                { title: "🎁 Donasi Menu", rowId: ".donasi", description: "Dukung developer bot" }
            ]
        },
        {
            title: "✨ OTHER MENU",
            rows: [
                { title: "📜 Script Info", rowId: ".script", description: "Informasi script bot" },
                { title: "🎉 Fun Menu", rowId: ".funmenu", description: "Game dan seru-seruan" },
                { title: "🛠️ Tools Menu", rowId: ".toolsmenu", description: "Utilitas bermanfaat" }
            ]
        }
    ];

    const listMessage = {
        text: textMessage,
        footer: "🌷 Aesthetic Bot MD 🌷",
        title: "PILIH MENU DISINI",
        buttonText: "🌸 Open Menu 🌸",
        sections: sections
    };

    await sock.sendMessage(from, listMessage, { quoted: msg });
};

const sendSubMenu = async (sock, msg, from, type) => {
    let menuText = "";
    let title = "";

    switch(type) {
        case 'ownermenu':
            title = "👑 OWNER MENU";
            menuText = "• addprem\n• delprem\n• public\n• self";
            break;
        case 'downloadmenu':
            title = "📥 DOWNLOAD MENU";
            menuText = "• ytmp3\n• ytmp4\n• tiktok";
            break;
        case 'groupmenu':
            title = "👥 GROUP MENU";
            menuText = "• add\n• kick\n• linkgc";
            break;
        case 'usermenu':
            title = "🙋‍♀️ USER MENU";
            menuText = "• menu\n• ping\n• owner";
            break;
        case 'premiummenu':
            title = "💎 PREMIUM MENU";
            menuText = "• Unlimited fitur\n• Fast response\n• Prioritas support";
            break;
        case 'donasi':
            title = "🎁 DONASI MENU";
            menuText = "• Dana\n• OVO\n• Gopay\n\nTerima kasih sudah support 💗";
            break;
        case 'script':
            title = "📜 SCRIPT MENU";
            menuText = "• Base : Baileys-Pro\n• Type : Multi Device\n• Style : Aesthetic";
            break;
        case 'funmenu':
            title = "🎉 FUN MENU";
            menuText = "• joke\n• quote";
            break;
        case 'toolsmenu':
            title = "🛠️ TOOLS MENU";
            menuText = "• cekid\n• shortlink";
            break;
        default:
            return;
    }

    await sock.sendMessage(from, { 
        text: `${title}\n\n${menuText}` 
    }, { quoted: msg });
};

module.exports = { sendMenu, sendSubMenu };
