"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTvshow = exports.updateTvshow = exports.createTvshow = exports.getTvshow = exports.getTvshows = void 0;
const tvshowsModel_1 = require("../models/tvshowsModel");
const uuid_1 = require("uuid");
const getTvshows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tvshows = yield tvshowsModel_1.Tvshow.find({}, { id: 1, title: 1, seasons: 1, genre: 1, release: 1, _id: 0 });
        if (!tvshows)
            return res.status(401).json({ message: "GET all tv-shows: FAILED" });
        res.status(200).json({ message: "GET all tv-shows: SUCCESS", tvshows });
    }
    catch (error) {
        res.status(500).json({ message: "GET all tv-shows: Server Error" });
    }
});
exports.getTvshows = getTvshows;
const getTvshow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const tvshow = yield tvshowsModel_1.Tvshow.find({ id: query.id }, { id: 1, title: 1, seasons: 1, genre: 1, release: 1, _id: 0 });
        if (!tvshow)
            return res.status(400).json({ message: "GET get a single tv-show: FAILED" });
        res.status(200).json({ message: "GET get a single tv-show: SUCCESS", tvshow });
    }
    catch (error) {
        res.status(500).json({ message: "GET get a single tv-show: Server Error" });
    }
});
exports.getTvshow = getTvshow;
const createTvshow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tvshow = req.body;
        const saveTvshow = yield new tvshowsModel_1.Tvshow(Object.assign(Object.assign({}, tvshow), { id: (0, uuid_1.v4)() })).save();
        if (!saveTvshow)
            return res.status(400).json({ message: "POST create tv-show: FAILED" });
        res.status(201).json({ message: "POST create tv-show: SUCCESS", saveTvshow });
    }
    catch (error) {
        res.status(500).json({ message: "POST create tv-show: SUCCESS: Server Error" });
    }
});
exports.createTvshow = createTvshow;
const updateTvshow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const tvshow = req.body;
        const updateTvshow = yield tvshowsModel_1.Tvshow.findOneAndUpdate({ id: query.id }, {
            $set: {
                title: tvshow.title,
                release: tvshow.release,
                seasons: tvshow.seasons,
                genre: tvshow.genre,
            },
        }, { new: true });
        if (!updateTvshow) {
            return res.status(400).json({ message: "PUT update tv-show: FAILED" });
        }
        res.status(201).json({ message: "PUT update tv-show: SUCCESS", updateTvshow });
    }
    catch (error) {
        res.status(500).json({ message: "PUT update tv-show: FAILED: Server Error" });
    }
});
exports.updateTvshow = updateTvshow;
const deleteTvshow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const tvshow = yield tvshowsModel_1.Tvshow.deleteOne({ id: query.id });
        if (tvshow.deletedCount === 0)
            return res.status(400).json({ message: "DELETE delete tv-show: FAILED" });
        res.status(201).json({ message: "DELETE delete tv-show: SUCCESS", });
    }
    catch (error) {
        res.status(500).json({ message: "DELETE delete tv-show: Server Error" });
    }
});
exports.deleteTvshow = deleteTvshow;
