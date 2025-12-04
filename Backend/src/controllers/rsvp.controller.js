const rsvpModel = require('../models/rsvp.model');

exports.submitRsvp = async (req, res) => {
    const { name, partner, email, message, attendance } = req.body;

    if (message && message.length > 5000) { 
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
            redirectUrl: `/redirect?next=http://localhost:3001/thanks?next=https://www.google.com`
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

exports.getAllRsvps = async (req, res) => {
    try {
        const rsvps = await rsvpModel.getAll(); 
        return res.status(200).json({
            success: true,
            data: rsvps
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil data tamu.',
            error: error.message
        });
    }
};

exports.deleteRsvp = async (req, res) => {
    try {
        const { id } = req.params; 
        const deleted = await rsvpModel.deleteById(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        }

        return res.status(200).json({
            success: true,
            message: 'Data berhasil dihapus'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Gagal menghapus data.',
            error: error.message
        });
    }
};