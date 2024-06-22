import mongoose from "mongoose";
import { Logger } from "./logger";
import config from '../config'

async function connect() {
  const dbUri = config[config.environment].dbUri

  try {
    await mongoose.connect(dbUri);
    Logger.info('Connected to the database');

  } catch (err: any) {
    Logger.error(`Couldn't connect to the database ${err?.message}`);

  }
}

export { connect };