const express = require("express");
const cors = require("cors");
const monk = require("monk");
const uniqid = require("uniqid");
const http = require("http");
const { compileFunction } = require("vm");
const { time } = require("console");
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 5000;

const db = monk(process.env.MONGO_DB_URI || "localhost/PixelWar")

const pixels = db.get("/Pixels");
const pixelIds = db.get("/IDs");
const users = db.get("/Users");

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());


pixelXSize = parseInt(process.env.CANVAS_X || 100);
pixelYSize = parseInt(process.env.CANVAS_Y || 100);

async function createDataBase() {
    await pixels.drop();
    await pixelIds.drop();
    for (x = 0; x < pixelXSize; x++) {
        for (y = 0; y < pixelYSize; y++) {
            const ID = uniqid();
            const data = {
                pixelID: ID,
                color: "White",
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

//createDataBase();

const sockets = [];
const activeUsers = [];

/* SOCKET */
io.on("connection", (socket) => {
    console.log("New client connected");
    // Add socket to socket that are currently online
    sockets.push(socket);
    let myUser = null;

    const date = new Date();
    socket.emit("ResivedSocket", date);

    // Change a pixel on the canvas
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

    // Return a 2D array of every pixel
    socket.on("GetPixels", async data => {
        const pixelArray = await GetPixelArray();
        /*let i = 0;
        while (pixelArray.length === 0) {
            console.log(pixelArray.length);
            pixelArray = await GetPixelArray();
            console.log(pixelArray, "----")
            if (pixelArray.length !== 0) {
                console.log("Break");
                break;
            }

            i += 1;
            if (i >= 1000) {
                console.log("Get pixels overtry");
                return;
            }
        }*/
        if (pixelArray.length === pixelXSize) {
            console.log("Sending pixels");
            socket.emit("Pixels", pixelArray);
        } else {
            console.log("Error sending pixels");
        }
    })

    socket.on("Auth", async data => {
        const user = await UserExists(data);
        myUser = { user, socket };
        activeUsers.push(myUser);
    })

    // Client closed tab
    socket.on("disconnect", data => {
        console.log("DISCONNECT");
        for (i = 0; i < sockets.length; i++) {
            if (sockets[i] === socket) {
                sockets.splice(i);
            }
        }
        for (i = 0; i < activeUsers.length; i++) {
            if (activeUsers[i] === myUser) {
                console.log("Removing User");
                activeUsers.splice(i);
            }
        }
        console.log(sockets.length);
        console.log(activeUsers.length);
    })
})

const interval = process.env.CLOCK_INTERVAL; // Update every x secs
setInterval(async() => {
    //console.log(Date());
    //console.log(activeUsers);
    console.log("--New Clock Cycle--");
    const allUsers = await users.find();
    for (i = 0; i < allUsers.length; i++) {
        const currentUser = await users.findOne({ userid: allUsers[i].userid });
        const gainPixels = currentUser.factories * currentUser.factoryMult + currentUser.standardPixels;
        let newPixels = Math.round(currentUser.pixels + (gainPixels / 60 * interval));
        if (newPixels === Math.round(currentUser.pixels)) {
            newPixels += 1;
        }

        console.log(`User: ${currentUser.googleObj.name}, Adding: ${gainPixels}, Amount: ${newPixels}`)
        await users.update({ userid: allUsers[i].userid }, { $set: { pixels: newPixels } });
    }

    for (i = 0; i < activeUsers.length; i++) {
        const bigUser = activeUsers[i];
        const socket = bigUser.socket;
        const user = bigUser.user;

        const info = await users.findOne({ userid: user.userid });
        console.log(`User: ${user.googleObj.name}, sending info: ${info}`)
        socket.emit("Info", info);
    }
}, interval * 1000)



async function UserExists(user) {
    let result = await users.findOne({ googleObj: user.googleObj });

    if (result === null) {

        const data = {
            googleObj: user.googleObj,
            userid: uniqid(),
            factories: 2,
            factoryMult: 1.8,
            colors: 2,
            standardPixels: 10,
            pixels: 100
        }
        console.log("Creating user");
        result = await users.insert(data);
        console.log(result);
    } else {
        console.log("User already Exists");
        result = await users.findOne({ googleObj: user.googleObj })
        console.log(result);
    }

    return result;
}

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
    if (currentPixels.length !== pixelXSize * pixelYSize) { return ([]) }
    for (i = 0; i < currentPixels.length; i++) {
        row.push(currentPixels[i].color);

        count += 1;
        if (count == pixelXSize) {
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