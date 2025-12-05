exports.handleRedirect = (req, res) => {
    const redirectUrl = req.query.next;
    
    if (!redirectUrl) {
        return res.status(400).send("Parameter redirect 'next' is missing.");
    }
    
    const allowedDomains = [
        'http://localhost:3001', 
        'http://localhost:3000', 
        'https://weddinginvitation-production-a4b6.up.railway.app',         
        'https://nama-project-lo.vercel.app' 
    ];

    const isWhitelisted = allowedDomains.some(domain => redirectUrl.startsWith(domain));
    const isRelativePath = redirectUrl.startsWith('/') && !redirectUrl.startsWith('//');

    if (isWhitelisted || isRelativePath) {
        console.log(`[SECURE] Redirecting user to: ${redirectUrl}`);
        return res.redirect(redirectUrl);
    } else {
        console.warn(`[BLOCKED] Percobaan Open Redirect terdeteksi ke: ${redirectUrl}`);
        return res.redirect('https://nama-project-lo.vercel.app/'); 
    }
};