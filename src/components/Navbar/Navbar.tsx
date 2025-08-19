import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

import logo from '/img/logo.svg?url';
import book from '/img/book.svg?url';
import paper from '/img/paper.svg?url';
import users from '/img/users.svg?url';
import city from '/img/city.svg?url';
import monitor from '/img/monitor.svg?url';
import settings from '/img/settings.svg?url';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.listLogo}>
          <img src={logo} alt="logo" className={styles.logo} />
        </li>
        <li className={styles.listEl}>
          <Link to="/" className={styles.listElText}>
            <img src={book} alt="book" className={styles.svg} />
            <span>База знаний</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/applications" className={styles.listElText}>
            <img src={paper} alt="paper" className={styles.svg} />
            <span>Заявки</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/employees" className={styles.listElText}>
            <img src={users} alt="users" className={styles.svg} />
            <span>Сотрудники</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/clients" className={styles.listElText}>
            <img src={city} alt="city" className={styles.svg} />
            <span>Клиенты</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/assets" className={styles.listElText}>
            <img src={monitor} alt="monitor" className={styles.svg} />
            <span>Активы</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/settings" className={styles.listElText}>
            <img src={settings} alt="settings" className={styles.svg} />
            <span>Настройки</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
