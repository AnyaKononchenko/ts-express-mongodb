"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tvshowSchema = new mongoose_1.Schema({
    id: {
        required: [true, "TV-show has to have an ID"],
    },
    title: {
        minlength: [3, "The title is too short"],
        maxlength: [200, "The title is too long"],
        required: [true, "TV-show has to have a title"],
    },
    release: {
        min: [1970, "Please, add a tv-show released after 1970"],
        max: [new Date().getFullYear(), "Only already aired show can be added"],
        required: [true, "TV-show has to have a release year"],
    },
    seasons: {
        min: 1,
        required: [true, "TV-show has to have a number of seasons"],
    },
    genre: [
        {
            required: [true, "TV-show has to have a genre"],
        },
    ],
    createdOn: { type: Date, default: Date.now },
});
const Tvshow = (0, mongoose_1.model)("Tvshows", tvshowSchema);
