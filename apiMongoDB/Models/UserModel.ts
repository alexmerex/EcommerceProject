import { userAddressProps, userModelParams } from "../dto/User";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
});
