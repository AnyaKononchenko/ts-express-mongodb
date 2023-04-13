import { Schema, model, Document } from "mongoose";
import { ITvshow } from "../@types/tvshows";

const tvshowSchema: Schema = new Schema({
  id: {
    type: String,
    required: [true, "TV-show has to have an ID"],
  },
  title: {
    type: String,
    minlength: [3, "The title is too short"],
    maxlength: [200, "The title is too long"],
    required: [true, "TV-show has to have a title"],
  },
  release: {
    type: Number,
    min: [1970, "Please, add a tv-show released after 1970"],
    max: [new Date().getFullYear(), "Only already aired show can be added"],
    required: [true, "TV-show has to have a release year"],
  },
  seasons: {
    type: Number,
    min: 1,
    required: [true, "TV-show has to have a number of seasons"],
  },
  genre: [
    {
      type: String,
      required: [true, "TV-show has to have a genre"],
    },
  ],
  createdOn: { type: Date, default: Date.now },
})

export const Tvshow = model<ITvshow>("Tvshows", tvshowSchema)