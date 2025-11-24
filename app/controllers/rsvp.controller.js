// rsvp-backend/app/controllers/rsvp.controller.js
const rsvpModel = require('../models/rsvp.model');

exports.submitRsvp = (req, res) => {
    const { name, message, attendance } = req.body;

    // --- KERENTANAN DOS LOGIS DITANAM DI SINI ---
    // Target: Message input yang sangat panjang memicu loop yang boros CPU.
    if (message && message.length > 5000) {
        console.log("!!! DOS LOGIS TERPICU: Memproses message yang terlalu panjang...");
        
        let dummyOperation = 0;
        // Loop yang boros CPU. Semakin panjang pesan (message.length), semakin lama.
        for (let i = 0; i < message.length / 10; i++) { 
            for (let j = 0; j < 1000; j++) {
                dummyOperation += Math.sqrt(Math.random() * i * j); 
            }
        }
        console.log("DOS Logis Selesai, server kembali merespons.");
    }
    // --- AKHIR KERENTANAN DOS ---

    // Simpan data
    const newRsvp = rsvpModel.save({ name, message, attendance });

    // Setelah berhasil, arahkan ke endpoint redirect (yang vulnerable Open Redirect)
    return res.status(200).json({ 
        success: true,
        message: 'RSVP submitted successfully!',
        redirectUrl: `/redirect?next=/thanks` 
    });
};