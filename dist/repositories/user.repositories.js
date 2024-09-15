"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const findUserById = async (id) => {
    const userDoc = await user_model_1.default.findById(id).lean();
    if (!userDoc) {
        return null;
    }
    // Map the Mongoose document to your User entity
    const user = {
        id: userDoc._id.toString(), // Convert ObjectId to string
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
    };
    return user;
};
exports.findUserById = findUserById;
