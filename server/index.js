const express = require("express");
const cors = require("cors");
const monk = require("monk");
const uniqid = require("uniqid");
const socketIo = require("socket.io");
const http = require("http");
const { Socket } = require("dgram");
//const socketHandler = require("./socketHandler.js");

const app = express();

const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_DB_URI || "localhost/PixelWar")

const pixels = db.get("/Pixels");
const pixelIds = db.get("/IDs");

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());


pixelXSize = process.env.CanvasX || 100;
pixelYSize = process.env.CanvasY || 100;

async function createDataBase() {
    await pixels.drop();
    await pixelIds.drop();
    for (x = 0; x < pixelXSize; x++) {
        for (y = 0; y < pixelYSize; y++) {
            const ID = uniqid();
            const data = {
                pixelID: ID,
                color: "Red",
                createDate: Date(),
                user: null
            }
            const IdData = {
                pixelID: ID
            }
            await pixels.insert(data)
            await pixelIds.insert(IdData)
        }
    }
}

createDataBase();

const sockets = [];

/* SOCKET */
io.on("connection", (socket) => {
    console.log("New client connected");
    sockets.push(socket);

    const date = new Date();
    socket.emit("ResivedSocket", date);

    socket.on("CreatePixel", async data => {
        const x = data.x;
        const y = data.y;
        console.log("Pos: " + x + " : " + y);
        const pos = parseInt(pixelXSize * x) + parseInt(y);
        const ids = await pixelIds.find();
        const currentID = ids[pos];

        const dataBaseData = {
            pixelID: currentID.pixelID,
            createDate: Date(),
            user: data.user,
            color: data.color,
        }

        await pixels.update({ pixelID: currentID.pixelID }, { $set: dataBaseData })
            //const etst = await pixels.findOne({ pixelID: currentID.pixelID });
        console.log("Test");
        await UpdateCanvas();
        socket.emit("Pixels", await GetPixelArray())
    })

    socket.on("GetPixels", async data => {
        pixelArray = await GetPixelArray();
        socket.emit("Pixels", pixelArray);
    })

    socket.on("disconnect", data => {
        console.log("DISCONNECT");
        for (i = 0; i < sockets.length; i++) {
            if (sockets[i] === socket) {
                sockets.splice(i);
            }
        }
        console.log(sockets.length);
    })
})

async function UpdateCanvas() {
    pixelArray = await GetPixelArray();
    for (i = 0; i < sockets.length; i++) {
        sockets[i].emit("Pixels", pixelArray);
    }
}

async function GetPixelArray() {
    const currentPixels = await pixels.find();
    const pixelArray = [];
    let count = 0;
    let row = [];
    for (i = 0; i < currentPixels.length; i++) {

        row.push(currentPixels[i].color);

        count += 1;
        if (count === pixelXSize) {
            count = 0;
            pixelArray.push(row);
            row = [];
        }
    }
    return pixelArray;
}
//#region APP
/*
app.post("/Create/Pixel/:x/:y", async(req, res) => {
    const x = req.params.x;
    const y = req.params.y;
    console.log("Pos: " + x + " : " + y);
    const pos = parseInt(pixelXSize * x) + parseInt(y);
    const ids = await pixelIds.find();
    const currentID = ids[pos];

    const data = {
        pixelID: currentID.pixelID,
        createDate: Date(),
        user: req.body.user,
        color: req.body.color,
    }

    await pixels.update({ pixelID: currentID.pixelID }, { $set: data })
        //const etst = await pixels.findOne({ pixelID: currentID.pixelID });
    console.log("Test");
    res.json(await GetPixelArray())
})
app.get("/Pixels", async(req, res) => {

    pixelArray = await GetPixelArray();
    res.json(pixelArray);
})

app.listen(PORT, () => {
    console.log("Listening on http://localhost:" + PORT.toString())
})
*/
//#endregion
server.listen(PORT, () => console.log("Socket IO server online"));