import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="nav">
      <div className="container">
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            MyApp
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
