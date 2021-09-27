// import mongoose from "mongoose";
// import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// const connectDB =
//   (handler: NextApiHandler) =>
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     if (mongoose.connections[0].readyState) {
//       // Use current db connection
//       return handler(req, res);
//     }
//     // Use new db connection
//     await mongoose.connect(process.env.MONGODB_URL!, {
//       // useUnifiedTopology: true,
//       // useNewUrlParser: true,
//       // useCreateIndex: true,
//       // useFindAndModify: true,
//     });
//     return handler(req, res);
//   };

// export default connectDB;

// ---------------------------------------------------------------------

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: false,
      // useCreateIndex: true,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
