import { body } from "express-validator"

export const postValidation = [
    body("category").exists().withMessage("This field is mandatory!"),
    body("title").exists().withMessage("This field is mandatory!"),
    body("cover").exists().withMessage("This field is mandatory!"),

    body("author.name").exists().withMessage("This field is mandatory!"),
    body("author.avatar").exists().withMessage("This field is mandatory!"),
    body("content").exists().withMessage("This field is mandatory!")
]