import { check, validationResult } from 'express-validator/check'

export const checkSignup = [
    check("email").isEmail().withMessage("Please enter a valid email address."),
    check('password').isLength({ min: 7 }).withMessage("Passowrd should be at least 7 characters.")
]