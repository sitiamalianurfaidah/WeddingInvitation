// rsvp-backend/app/controllers/common.controller.js

exports.handleRedirect = (req, res) => {
    // Ambil nilai dari parameter query 'next'
    const redirectUrl = req.query.next;
    
    if (!redirectUrl) {
        return res.status(400).send("Parameter redirect 'next' is missing.");
    }

    // --- KERENTANAN OPEN REDIRECT DITANAM DI SINI ---
    // TIDAK ADA VALIDASI: Langsung redirect ke URL yang diberikan, termasuk URL eksternal.
    
    console.log(`Redirecting user to: ${redirectUrl}`);
    
    // Eksploitasi: Penyerang set 'next' menjadi 'http://situs-phishing.com'
    res.redirect(redirectUrl);
    
    // --- AKHIR KERENTANAN OPEN REDIRECT ---
};