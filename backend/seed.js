import mongoose from "mongoose";
import * as dotenv from "dotenv";
import data from "./mock.js";
import { Product } from "./models/Product.js";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany({});
await Product.insertMany(data);

mongoose.connection.close();
