import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">База знаний</Link>
        </li>
        <li>
          <Link to="/applications">Заявки</Link>
        </li>
        <li>
          <Link to="/employees">Сотрудники</Link>
        </li>
        <li>
          <Link to="/clients">Клиенты</Link>
        </li>
        <li>
          <Link to="/assets">Активы</Link>
        </li>
        <li>
          <Link to="/settings">Настройки</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
