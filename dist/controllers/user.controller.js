"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const user_service_1 = require("../services/user.service");
const getUser = async (req, res) => {
    try {
        const user = await (0, user_service_1.getUserById)(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getUser = getUser;
