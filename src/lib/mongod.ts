import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;
const options = {};

if (!uri) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local",
	);
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
	// Allow global caching in development
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise!;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
