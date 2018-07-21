import { body } from 'express-validator/check'
export const checkInput = [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").isLength({ min: 7 }).withMessage("Password should be at least 7 characters.")
]


export const checkChangePasswordInput = [
    body("password")
        .isLength({ min: 7 })
        .withMessage("Password should be at least 7 characters."),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            return Promise.reject("Password confirmation does not match password");
        }
        else {
            return Promise.resolve();
        }
    })
]