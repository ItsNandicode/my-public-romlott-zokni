const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Ez a "fiktív" adatbázisunk
let orders = []; 

const tourDates = [
  { id: 1, date: '2026.05.20', city: 'Budapest', venue: 'Penészes Pince', ticketUrl: 'https://peneszespince.hu/tickets' },
  { id: 2, date: '2026.06.05', city: 'Debrecen', venue: 'Szakadt Húr Pub', ticketUrl: 'https://szakadthur.hu/jegyek' },
  { id: 3, date: '2026.06.12', city: 'Szeged', venue: 'Zajos Garázs', ticketUrl: 'https://zajosgarazs.hu/booking' },
  { id: 4, date: '2026.06.20', city: 'Győr', venue: 'Rozsdás Gyár', ticketUrl: 'https://rozsdasgyar.hu/merch' },
  { id: 5, date: '2026.07.04', city: 'Pécs', venue: 'Füstös Alagsor', ticketUrl: 'https://fustos-alagsor.hu/entry' },
  { id: 6, date: '2026.07.18', city: 'Miskolc', venue: 'Gépzaj Klub', ticketUrl: 'https://gepzaj-miskolc.hu/tickets' },
  { id: 7, date: '2026.08.01', city: 'Veszprém', venue: 'Beton Kert', ticketUrl: 'https://betonkert.hu/info' },
  { id: 8, date: '2026.08.15', city: 'Sopron', venue: 'Zokni-fesztivál', ticketUrl: 'https://zoknifest.hu/vip' },
  { id: 9, date: '2026.08.29', city: 'Eger', venue: 'Vár-Árok Underground', ticketUrl: 'https://vararok.hu/tickets' },
  { id: 10, date: '2026.09.12', city: 'Székesfehérvár', venue: 'Kód-Kocsma', ticketUrl: 'https://kodkocsma.hu/jegy' },
  { id: 11, date: '2026.10.10', city: 'Kecskemét', venue: 'Bit-Bár', ticketUrl: 'https://bitbar.hu/event' },
  { id: 12, date: '2026.11.07', city: 'Budapest', venue: 'Záró-Káosz Aréna', ticketUrl: 'https://arena.hu/romlottzokni' }
];

// Turnédátumok lekérése
app.get('/api/tour-dates', (req, res) => {
    res.json(tourDates);
});

// Vendég vásárlás végpont (A tanár kérése!)
app.post('/api/checkout', (req, res) => {
    const { email, address, cart } = req.body;
    const newOrder = { id: Date.now(), email, address, cart, status: 'Feldolgozás alatt' };
    orders.push(newOrder);
    console.log("Új vendég rendelés:", newOrder);
    res.status(201).json({ message: "Sikeres rendelés!", orderId: newOrder.id });
});

app.listen(5000, () => console.log("Szerver fut az 5000-es porton"));