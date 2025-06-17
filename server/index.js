import dotenv from "dotenv";
import express from "express";
dotenv.config();

import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = new createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
))

app.get("/", (req, res) => {
    res.send("server start successfully")
});

io.on("connection", (socket) => {
    console.log("User Connected");
    console.log("ID", socket.id);
    
    socket.on("message", ({room,message}) => {
        io.to(room).emit("recieve-msg", {room,message});
    });
 
    socket.on("Room-join", (room) => {
        socket.join(room);
    })
     
    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
    })
})


const PORT = process.env.PORT;

server.listen(PORT, (req, res) => {
    console.log("server start ", PORT);
})