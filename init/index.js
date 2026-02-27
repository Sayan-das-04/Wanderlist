const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDB(); // ✅ run AFTER connection
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listings = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("69818ef71c7f08881d5c578e"),
  }));

  await Listing.insertMany(listings);
  console.log("data was initialized");
};
