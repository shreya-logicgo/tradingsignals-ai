import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/** mongodb+srv requires a real DNS hostname; a single segment like `ai` yields ENOTFOUND _mongodb._tcp.ai */
function assertPlausibleSrvHost(uri: string) {
  if (!uri.startsWith("mongodb+srv://")) return;
  const at = uri.indexOf("@");
  if (at === -1) return;
  const afterAt = uri.slice(at + 1);
  const host = afterAt.split("/")[0].split("?")[0];
  if (host.includes(".") || host === "localhost") return;
  if (host.length < 6) {
    throw new Error(
      `MONGODB_URI SRV host "${host}" looks invalid. Paste the full Atlas string (host should look like cluster0.xxxxx.mongodb.net).`
    );
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  assertPlausibleSrvHost(mongodbUri);

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongodbUri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
