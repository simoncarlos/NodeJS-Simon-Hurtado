export function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.sendStatus(400);
    }
}