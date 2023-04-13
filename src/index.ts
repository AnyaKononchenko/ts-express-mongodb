import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connectDB } from "./config/connectDB"
import { serverPort } from "./config";
import routerTvshows from "./routes/tvshows";

const app: Application = express();

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(routerTvshows)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello from the outside"
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.listen(serverPort, () => {
  console.log(`App is running at http://localhost:${serverPort}`);
  connectDB();
})