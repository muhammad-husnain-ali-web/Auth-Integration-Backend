import mongoose from "mongoose"
const { Schema, model, models} = mongoose

const UsersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    createdAt: { type: Date, default: Date.now }
});

if (models.Users) {
    delete models.Users;
}

export default model("Users", UsersSchema);
