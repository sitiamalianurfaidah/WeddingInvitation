// rsvp-backend/app/models/rsvp.model.js
const rsvps = []; // Simple in-memory storage

exports.save = (data) => {
    const newRsvp = { 
        id: rsvps.length + 1, 
        timestamp: new Date(), 
        ...data 
    };
    rsvps.push(newRsvp);
    console.log(`New RSVP saved: ${newRsvp.name}`);
    return newRsvp;
};

exports.getAll = () => {
    return rsvps;
};