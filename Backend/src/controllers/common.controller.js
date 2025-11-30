exports.handleRedirect = (req, res) => {
    const redirectUrl = req.query.next;
    
    if (!redirectUrl) {
        return res.status(400).send("Parameter redirect 'next' is missing.");
    }

    console.log(`Redirecting user to: ${redirectUrl}`);
    
    res.redirect(redirectUrl);
};