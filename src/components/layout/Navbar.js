import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
