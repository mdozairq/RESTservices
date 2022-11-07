import mongoose from "mongoose";
import { App } from "./App";
import dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() =>
    App.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
  )
  .catch((error) => console.log(error));
