import { Request, RequestHandler, Response } from 'express';
import { Query, TvshowAvailableFields } from '../@types/tvshows';
import { Tvshow } from '../models/tvshowsModel';
import { v4 as uuidv4 } from "uuid";


export const getTvshows: RequestHandler = async (req: Request, res: Response) => {
  try {
    const tvshows = await Tvshow.find({}, { id: 1, title: 1, seasons: 1, genre: 1, release: 1, _id: 0 });
    if (!tvshows) return res.status(401).json({ message: "GET all tv-shows: FAILED" })
    res.status(200).json({ message: "GET all tv-shows: SUCCESS", tvshows })
  } catch (error) {
    res.status(500).json({ message: "GET all tv-shows: Server Error" })
  }
}

export const getTvshow: RequestHandler = async (req: Request<{}, {}, {}, Query>, res: Response) => {
  try {
    const { query } = req;
    const tvshow = await Tvshow.find({ id: query.id }, { id: 1, title: 1, seasons: 1, genre: 1, release: 1, _id: 0 });
    if (!tvshow) return res.status(400).json({ message: "GET get a single tv-show: FAILED" });
    res.status(200).json({ message: "GET get a single tv-show: SUCCESS", tvshow })
  } catch (error) {
    res.status(500).json({ message: "GET get a single tv-show: Server Error" })
  }
}

export const createTvshow: RequestHandler = async (req: Request, res: Response) => {
  try {
    const tvshow: TvshowAvailableFields = req.body;
    const saveTvshow = await new Tvshow({ ...tvshow, id: uuidv4() }).save();
    if (!saveTvshow) return res.status(400).json({ message: "POST create tv-show: FAILED" })
    res.status(201).json({ message: "POST create tv-show: SUCCESS", saveTvshow })
  } catch (error) {
    res.status(500).json({ message: "POST create tv-show: SUCCESS: Server Error" })
  }
}

export const updateTvshow: RequestHandler = async (req: Request<{}, {}, {}, Query>, res: Response) => {
  try {
    const { query } = req;
    const tvshow: TvshowAvailableFields = req.body;
    const updateTvshow = await Tvshow.findOneAndUpdate(
      { id: query.id },
      {
        $set: {
          title: tvshow.title,
          release: tvshow.release,
          seasons: tvshow.seasons,
          genre: tvshow.genre,
        },
      },
      { new: true }
    );
    if (!updateTvshow) {
      return res.status(400).json({ message: "PUT update tv-show: FAILED" });
    }
    res.status(201).json({ message: "PUT update tv-show: SUCCESS", updateTvshow })
  } catch (error) {
    res.status(500).json({ message: "PUT update tv-show: FAILED: Server Error" })
  }
}

export const deleteTvshow: RequestHandler = async (req: Request<{}, {}, {}, Query>, res: Response) => {
  try {
    const { query } = req;
    const tvshow = await Tvshow.deleteOne({ id: query.id });
    if (tvshow.deletedCount === 0) return res.status(400).json({ message: "DELETE delete tv-show: FAILED" });
    res.status(201).json({ message: "DELETE delete tv-show: SUCCESS", })
  } catch (error) {
    res.status(500).json({ message: "DELETE delete tv-show: Server Error" })
  }
}