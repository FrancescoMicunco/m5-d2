import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String.apply, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" }
}, { timestamp: true })


UserSchema.pre("save", async function(next) {
    const newUser = this
    const plainPW = newUser.password
    if (newUser.isModified("password")) {
        const hash = await bcrypt.hash(plainPW, 10)
        newUser.password = hash
    }
    next()
})

UserSchema.methods.toJSON = function() {
    const userDoc = this;
    const userObj = userDoc.toObject();
    delete userObj.password;
    delete userObj.__v;
    return userObj
}

UserSchema.statistics.checkCredentials = async function(email, plainPW) {
    const user = await this.findOne({ email })
    if (user) {
        const isMatch = await bcrypt.compare(plainPW, user.password)
        if (isMatch) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}

export default model("User", UserSchema)