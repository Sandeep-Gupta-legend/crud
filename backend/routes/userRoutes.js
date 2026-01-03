const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   POST /api/users
 * @desc    Create a new user
 */
router.post("/", async (req, res) => {
    try {
        const { name, email } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route   GET /api/users
 * @desc    Get all users
 */
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 */
router.put("/:id", async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 */
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
