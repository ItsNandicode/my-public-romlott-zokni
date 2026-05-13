import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index-v4.css';

// --- STATIKUS ADATOK ---
const products = [
  { id: 1, name: 'Romlott Zokni Turné Póló', price: 5500, category: 'Ruházat', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Büdös a lábam - Dedikált zokni', price: 2500, category: 'Kiegészítők', sizes: ['36-40', '41-45'] },
  { id: 3, name: 'Punk-Injekció (Zenei CD)', price: 3000, category: 'Zene', sizes: [] },
  { id: 4, name: 'Szakadt Húr Pengető szett', price: 1200, category: 'Kiegészítők', sizes: [] },
];

function Nav({ cartCount }: { cartCount: number }) {
  return (
    <nav style={{ 
      backgroundColor: '#0a0a0a', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      borderBottom: '2px solid #5bdc00' // A navigáció alja is kapott egy csíkot
    }}>
      <Link to="/" style={{ color: '#5bdc00', fontSize: '1.8rem', fontWeight: '900', textDecoration: 'none' }}>
        ROMLOTT ZOKNI
      </Link>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>FŐOLDAL</Link>
        <Link to="/merch" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>MERCH</Link>
        <Link to="/merch" style={{ backgroundColor: '#5bdc00', color: 'black', padding: '0.5rem 1.2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: '800' }}>
          🛒 KOSÁR ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

function Home() {
  const [dates, setDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/tour-dates')
      .then(res => res.json())
      .then(data => { setDates(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ color: 'white' }}>
      <header style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '85vh', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)'
      }}>
        <img 
          src="/logo.svg" 
          alt="Romlott Zokni Logo" 
          style={{ 
            width: '90%',
            maxWidth: '650px',
            filter: 'drop-shadow(0 0 15px rgba(91, 220, 0, 0.6))', // Pontos zöld ragyogás
            marginBottom: '2rem'
          }} 
        />
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '6px', color: '#5bdc00', fontWeight: '300' }}>
          PUNK IS NOT DEAD, JUST SMELLS FUNNY
        </h1>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <section id="bio" style={{ marginBottom: '6rem', backgroundColor: '#111', padding: '3rem', borderRadius: '15px', border: '1px solid #222' }}>
  <h2 style={{ fontSize: '2.5rem', color: '#5bdc00', marginBottom: '1.5rem', textTransform: 'uppercase' }}>A SZTORI</h2>
  <p style={{ lineHeight: '1.9', fontSize: '1.15rem', color: '#ddd' }}>
    A ROMLOTT ZOKNI története nem egy sikersztori, hanem egy statisztikai hiba. 2024-ben, egy átbulizott éjszaka után Lyukas Laci (ének/basszus) rájött, hogy a mérnöki precizitás és a punk káosz nem zárják ki egymást. 
    <br /><br />
    A zenekar alapításának pillanata az volt, amikor Szakadt Szandi (gitár) véletlenül rálépett egy effektpedálra, és az a hang, ami kijött a hangfalból, jobban fájt, mint egy elrontott adatbázis-migráció. Ehhez csatlakozott Büdös Berci (dobok), aki korábban csak kávégépeken dobolt a vizsgaidőszakban, de nálunk végre igazi bőröket püfölhet. 
    <br /><br />
    Nem vagyunk virtuózok, nem ismerjük a kottát, és a hangszerünk is gyakran elhangolódik a koncert felénél, de egyvalamit garantálunk: a hangerőt. A zenénk olyan, mint a kedvenc zoknid: lehet, hogy szakadt, lehet, hogy büdös, de elválaszthatatlan vagy tőle. Mi vagyunk a budapesti underground digitális lázadói!
  </p>
</section>

        <section>
          <h2 style={{ color: '#5bdc00', fontSize: '2rem', marginBottom: '2rem' }}>TURNÉ 2026</h2>
          {loading ? <p>Töltés...</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {dates.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #222' }}>
                    <td style={{ padding: '1.5rem 0', color: '#888' }}>{t.date}</td>
                    <td style={{ fontWeight: 'bold' }}>{t.city.toUpperCase()}</td>
                    <td>{t.venue}</td>
                    <td style={{ textAlign: 'right' }}>
                      <a href={t.ticketUrl} target="_blank" rel="noreferrer" style={{ color: '#5bdc00', fontWeight: 'bold', textDecoration: 'none', border: '1px solid #5bdc00', padding: '0.4rem 1rem' }}>JEGYEK</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

function Merch({ cart, addToCart, clearCart }: { cart: any[], addToCart: (p: any, s: string) => void, clearCart: () => void }) {
  const [email, setEmail] = useState('');
  const handleOrder = async () => {
    const response = await fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cart })
    });
    if (response.ok) { alert("SIKERES RENDELÉS!"); clearCart(); }
  };

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', color: '#5bdc00' }}>MERCH STORE</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {products.map(product => {
          const [size, setSize] = useState(product.sizes[0] || 'N/A');
          return (
            <div key={product.id} style={{ backgroundColor: '#111', border: '1px solid #222', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ height: '200px', backgroundColor: '#222', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🎸</div>
              <h3 style={{ color: 'white' }}>{product.name}</h3>
              <p style={{ color: '#5bdc00', fontSize: '1.5rem', fontWeight: 'bold' }}>{product.price} Ft</p>
              {product.sizes.length > 0 && (
                <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#222', color: 'white', marginBottom: '1rem' }}>
                  {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
              <button onClick={() => addToCart(product, size)} style={{ width: '100%', padding: '1rem', backgroundColor: '#5bdc00', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>KOSÁRBA</button>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: '5rem', padding: '3rem', border: '2px solid #5bdc00', borderRadius: '8px' }}>
          <h2 style={{ color: '#5bdc00' }}>GUEST CHECKOUT</h2>
          <input type="email" placeholder="email@pelda.hu" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '1rem', width: '300px', marginRight: '1rem' }} />
          <button onClick={handleOrder} style={{ padding: '1rem 2rem', backgroundColor: '#5bdc00', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>RENDELÉS LEADÁSA</button>
        </div>
      )}
    </div>
  );
}

export function App() {
  const [cart, setCart] = useState<any[]>([]);
  const addToCart = (product: any, size: string) => setCart(prev => [...prev, { ...product, selectedSize: size }]);
  const clearCart = () => setCart([]);

  return (
    <Router>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', fontFamily: 'monospace' }}>
        <Nav cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merch" element={<Merch cart={cart} addToCart={addToCart} clearCart={clearCart} />} />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '4rem', color: '#333' }}>© 2026 ROMLOTT ZOKNI</footer>
      </div>
    </Router>
  );
}

export default App;