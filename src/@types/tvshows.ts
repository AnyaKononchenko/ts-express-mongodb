import { Document } from "mongoose";

export interface ITvshow extends Document {
  id: String,
  title: String,
  release: number,
  seasons: number,
  genre: Genre[],
  createdOn: Date,
}

enum Genre {
  drama = "Drama",
  sitcom = "Sitcom",
  mystery = "Mystery",
  suspence = "Suspence",
  horror = "Horror",
  thriller = "Thriller",
  anime = "Anime",
  adventure = "Adventure",
  scienceFiction = "Science Fiction",
  fantasy = "Fantasy",
  comedy = "Comedy",
  unknown = "Unknown",
}

export type TvshowAvailableFields = {
  title?: String,
  seasons?: Number,
  release?: Number,
  genre?: String[],
}

export interface Query {
  id?: String,
  title?: String,
  release?: Number,
  seasons?: Number,
  genre?: String,
}