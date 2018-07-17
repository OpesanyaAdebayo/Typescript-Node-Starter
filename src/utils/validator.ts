import { body } from 'express-validator/check'

export const checkSignup = [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").isLength({ min: 7 }).withMessage("Password should be at least 7 characters.")
]