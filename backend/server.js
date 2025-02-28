require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const callRoutes = require("./routes/callRoutes"); // Previously `call.js`

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/call", callRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); // update for security. Only include trusted ip

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("callUser", ({ to, signalData, from }) => {
    io.to(to).emit("incomingCall", { from, signalData });
  });
  socket.on("answerCall", ({ to, signal }) => {
    io.to(to).emit("callAnswered", { signal });
  });
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB error:", err));

server.listen(process.env.PORT, "0.0.0.0", () => console.log(`Server running on ${process.env.PORT}`));
