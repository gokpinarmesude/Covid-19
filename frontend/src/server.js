// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const axios = require('axios');

// const PORT = process.env.PORT || 3001;

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// let clients = [];
// let latestStats = {};

// // API'den COVID-19 istatistiklerini almak için kullanılacak URL
// const covidAPIUrl = 'https://api.covid19api.com/summary';

// // WebSocket bağlantısını dinleme
// wss.on('connection', (ws) => {
//     clients.push(ws);
//     sendLatestStats(ws); // Bağlanan istemciye en son istatistikleri gönder

//     ws.on('close', () => {
//         clients = clients.filter(client => client !== ws); // Bağlantısı kesilen istemciyi listeden çıkar
//     });
// });

// // API'den güncel istatistikleri al ve istemcilere gönder
// const fetchAndSendStats = async () => {
//     try {
//         const response = await axios.get(covidAPIUrl);
//         const { Global, Date, Countries } = response.data;
//         latestStats = {
//             global: Global,
//             date: Date,
//             countries: Countries
//         };
//         broadcastLatestStats(); // Tüm istemcilere güncel istatistikleri gönder
//     } catch (error) {
//         console.error('Error fetching data from COVID API:', error);
//     }
// };

// // WebSocket bağlantısını güncelle
// const broadcastLatestStats = () => {
//     clients.forEach(client => {
//         sendLatestStats(client);
//     });
// };

// // Bağlı istemciye en son istatistikleri gönder
// const sendLatestStats = (client) => {
//     if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(latestStats));
//     }
// };

// // Belirli aralıklarla istatistikleri güncelle
// setInterval(fetchAndSendStats, 10000); // Her 10 saniyede bir güncelle

// // Express uygulamasını başlat
// server.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });
