import { Link } from 'react-router-dom';

export default function SideItem(props) {
  return (
    <li className="nav-item">
      <Link to={props.href } className="nav-link">
        <i className={ props.logo }></i>
        <p>{ props.label }</p>
      </Link>
    </li>
  );
}
