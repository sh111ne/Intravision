import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

import logo from '/img/logo.png?url';
import book from '/img/book_v2.svg?url';
import paper from '/img/paper_v2.svg?url';
import users from '/img/users_v2.svg?url';
import city from '/img/city_v2.svg?url';
import monitor from '/img/monitor_v2.svg?url';
import settings from '/img/settings_v2.svg?url';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.listLogo}>
          <img src={logo} alt="logo" className={styles.logo} />
        </li>
        <li className={styles.listEl}>
          <Link to="/base" className={styles.listElText}>
            <img src={book} alt="book" className={styles.book} />
            <span>База знаний</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/" className={styles.listElText}>
            <img src={paper} alt="paper" className={styles.paper} />
            <span>Заявки</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/employees" className={styles.listElText}>
            <img src={users} alt="users" className={styles.users} />
            <span>Сотрудники</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/clients" className={styles.listElText}>
            <img src={city} alt="city" className={styles.city} />
            <span>Клиенты</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/assets" className={styles.listElText}>
            <img src={monitor} alt="monitor" className={styles.monitor} />
            <span>Активы</span>
          </Link>
        </li>
        <li className={styles.listEl}>
          <Link to="/settings" className={styles.listElText}>
            <img src={settings} alt="settings" className={styles.settings} />
            <span>Настройки</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
