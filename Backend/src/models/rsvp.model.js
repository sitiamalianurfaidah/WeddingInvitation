const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama tamu wajib diisi'],
        trim: true
    },
    partner: {
        type: String,
        default: '-' 
    },
    email: {
        type: String,
        required: [true, 'Email wajib diisi'], 
        match: [/.+\@.+\..+/, 'Format email salah'] 
    },
    attendance: {
        type: String, 
        required: true
    },
    message: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

exports.save = async (data) => {
    const newRsvp = new Rsvp(data);
    return await newRsvp.save();
};

exports.getAll = async () => {
    return await Rsvp.find().sort({ timestamp: -1 });
};

exports.deleteById = async (id) => {
    return await Rsvp.findByIdAndDelete(id);
};