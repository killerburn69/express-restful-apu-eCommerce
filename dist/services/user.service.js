"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const user_repositories_1 = require("../repositories/user.repositories");
const getUserById = async (id) => {
    const user = await (0, user_repositories_1.findUserById)(id);
    return user;
};
exports.getUserById = getUserById;
