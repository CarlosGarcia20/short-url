import { rateLimit } from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: "Demasiadas request desde esta IP, inténtalo de nuevo mas tarde "
    }
})

export default limiter;