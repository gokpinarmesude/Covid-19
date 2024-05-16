const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const fetchCovidData = async () => {
  try {
    const response = await axios.get('https://covid-api.com/api/reports/total');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching COVID-19 data:', error);
    return null;
  }
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const interval = setInterval(async () => {
    const data = await fetchCovidData();
    if (data) {
      socket.emit("FromAPI", data);
    }
  }, 10000);



  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING ON PORT 3001");
});
