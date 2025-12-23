exports.run = async ({ sock, msg, command, text, from, isGroup, sender, config }) => {
    if (!config.ownerNumber.includes(sender.replace('@s.whatsapp.net', ''))) {
        return sock.sendMessage(from, { text: "🚫 Khusus Owner saja!" }, { quoted: msg });
    }

    switch(command) {
        case 'addprem':
            // Logika tambah premium
            sock.sendMessage(from, { text: "✅ Fitur Add Premium belum diimplementasikan logic-nya." }, { quoted: msg });
            break;
        
        case 'public':
            sock.sendMessage(from, { text: "✅ Mode Public Aktif." }, { quoted: msg });
            break;
            
        case 'self':
            sock.sendMessage(from, { text: "✅ Mode Self Aktif." }, { quoted: msg });
            break;

        default:
            break;
    }
};
