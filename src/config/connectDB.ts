import mongoose from "mongoose";
import { databaseUrl } from '.';

export const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Connection to DB is successfully established!")
  } catch (error: unknown) {
    if (typeof error === "string")
      console.log(`Could not connect to DB: ${error}`)
    else if (error instanceof Error) 
      console.log(`Could not connect to DB: ${error.message}`)
    else 
      console.log(`Could not connect to DB: Something went wrong 0_0`)  
  }
}