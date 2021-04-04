"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wcu0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    //   const collection = client.db("test").collection("devices");
    //   perform actions on the collection object
    if (err) {
        console.log("Error, not connected");
        mongoose_1.default.connection.close().then((message) => {
            console.log("Closed:", message);
        }).catch((message) => {
            console.log("Error on close:", message);
        });
    }
    else {
        console.log("Connected");
    }
    return;
});
//# sourceMappingURL=index.js.map