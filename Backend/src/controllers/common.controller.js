exports.handleRedirect = (req, res) => {
    const redirectUrl = req.query.next;
    
    if (!redirectUrl) {
        return res.status(400).send("Parameter redirect 'next' is missing.");
    }
    
    const allowedDomains = [
        'http://localhost:3001',
        'http://localhost:3000'
    ];

    const isWhitelisted = allowedDomains.some(domain => redirectUrl.startsWith(domain));
    const isRelativePath = redirectUrl.startsWith('/') && !redirectUrl.startsWith('//');

    if (isWhitelisted || isRelativePath) {
        console.log(`[SECURE] Redirecting user to: ${redirectUrl}`);
        return res.redirect(redirectUrl);
    } else {
        console.warn(`[BLOCKED] Percobaan Open Redirect terdeteksi ke: ${redirectUrl}`);
        return res.redirect('http://localhost:3001/'); 
    }
};