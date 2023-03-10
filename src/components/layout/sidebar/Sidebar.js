import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <img
          src="/assets/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>List Categories</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-categories" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Category</p>
                </Link>
              </li>
            </li>
            <li className="nav-item">
              <Link to="/balance-requests" className="nav-link">
                <i className="far fa-circle nav-icon"></i>
                <p>Load balance request</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
