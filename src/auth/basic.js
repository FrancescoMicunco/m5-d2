import createHttpError from "http-errors"
import atob from "atob"

export const basicAuthMMiddleware = async(req, res, next) => {
    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide credentials in Authorization header!"));
    } else {
        const baseCredential = req.headers.authorization.split(" ")[1];
        const decodedCredential = atob(baseCredential)
        const [email, password] = decodedCredential.split(":")
        const user = await UserModel.checkCredentials(email, password)

        if (user) {
            req.user = user
            next()
        } else {
            next(createHttpError(401, "Credentials are not ok!"))
        }
    }
}





}

}