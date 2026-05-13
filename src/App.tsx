import { useState } from 'react';
import './index-v4.css';

const products = [
  { id: 1, name: 'Developer Keyboard', price: 149, category: 'Peripherals' },
  { id: 2, name: 'Mechanical Mouse', price: 89, category: 'Peripherals' },
  { id: 3, name: 'USB-C Hub', price: 59, category: 'Accessories' },
  { id: 4, name: 'Monitor Stand', price: 79, category: 'Desk' },
  { id: 5, name: 'Desk Mat', price: 39, category: 'Desk' },
  { id: 6, name: 'Webcam Pro', price: 199, category: 'Video' },
  { id: 7, name: 'LED Desk Lamp', price: 69, category: 'Lighting' },
  { id: 8, name: 'Cable Organizer', price: 29, category: 'Accessories' },
];

function Nav() {
  return (
    <nav style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--text-on-secondary)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: '700' }}>DevShop</span>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {['Products', 'Categories', 'Deals'].map(item => (
          <a key={item} href="#" style={{ color: 'var(--text-on-secondary)', textDecoration: 'none' }}>{item}</a>
        ))}
        <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-accent)', color: 'var(--text-on-accent)', border: 'none', borderRadius: '0.375rem', fontWeight: '600', cursor: 'pointer' }}>
          Cart (0)
        </button>
      </div>
    </nav>
  );
}

function App() {
  const [cart, setCart] = useState<number[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <section style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--text-on-secondary)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>Shop</h1>
            <p style={{ color: 'var(--text-on-secondary-secondary)' }}>Tools for the serious developer</p>
          </div>
        </section>

        <section style={{ backgroundColor: 'var(--color-dominant)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {products.map(product => (
                <div key={product.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <div style={{
                    height: '180px',
                    backgroundColor: 'var(--color-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-on-secondary)',
                    fontSize: '0.875rem',
                  }}>
                    Product Image
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-on-dominant-secondary)', marginBottom: '0.25rem' }}>{product.category}</div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-on-dominant)' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-on-dominant)' }}>${product.price}</span>
                      <button
                        onClick={() => setCart(c => [...c, product.id])}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'var(--color-accent)',
                          color: 'var(--text-on-accent)',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--text-on-secondary)', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-on-secondary-secondary)', fontSize: '0.875rem' }}>Built with React + 60-30-10 color system</p>
      </footer>
    </div>
  );
}

export default App;
