import express from "express";
import Url from "../schema/Url.js";
import { nanoid } from "nanoid";
import validUrl from "validator";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const baseUrl = process.env.BASE_URL;

// home route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the URL Shortener API" });
});

// POST /shorten
router.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;

    // Validate URL format
    if (!validUrl.isURL(originalUrl, { require_protocol: true })) {
        return res.status(400).json({ error: "Invalid URL. Must include http/https." });
    }

    try {
        // Check if original URL already exists
        let url = await Url.findOne({ originalUrl });
        if (url) return res.json({ shortUrl: url.shortUrl });

        const shortId = nanoid(8);
        const shortUrl = `${baseUrl}/${shortId}`;

        // Create and save new entry
        url = new Url({
            originalUrl,
            shortUrl,
        });

        await url.save();

        res.status(201).json({
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
        });
    } catch (err) {
        console.error("Shorten Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /:shortId - redirect to original URL
router.get("/:shortId", async (req, res) => {
    try {
        const shortUrl = `${baseUrl}/${req.params.shortId}`;
        const url = await Url.findOne({ shortUrl });

        if (!url) return res.status(404).json({ error: "Short URL not found" });

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET /clicks/:shortId - get click count
router.get("/clicks/:shortId", async (req, res) => {
    try {
        const shortUrl = `${baseUrl}/${req.params.shortId}`;
        const url = await Url.findOne({ shortUrl });

        if (!url) return res.status(404).json({ error: "Short URL not found" });

        res.json({ clicks: url.clicks });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
