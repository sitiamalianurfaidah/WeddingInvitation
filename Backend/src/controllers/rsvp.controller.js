const rsvpModel = require('../models/rsvp.model');

exports.submitRsvp = async (req, res) => {
    const { name, partner, email, message, attendance } = req.body;

    if (message && message.length > 50) { 
        console.log("SERANGAN DOS TERDETEKSI...");
        const complexity = message.length * 50000; 
        let dummy = 0;
        for (let i = 0; i < complexity; i++) {
            dummy += Math.sqrt(i) * Math.tan(i) / Math.cos(i);
        }
        console.log("DOS Selesai.");
    }

    try {
        const savedData = await rsvpModel.save({ 
            name, 
            partner, 
            email, 
            message, 
            attendance 
        });

        return res.status(200).json({ 
            success: true,
            message: 'RSVP Berhasil Disimpan!',
            data: savedData,
            redirectUrl: `/redirect?next=/thanks` 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: 'Gagal menyimpan data.',
            error: error.message
        });
    }
};