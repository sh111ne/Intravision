import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

import logo from '../../../public/img/logo.svg';
import book from '../../../public/img/book.svg';
import paper from '../../../public/img/paper.svg';
import users from '../../../public/img/users.svg';
import city from '../../../public/img/city.svg';
import monitor from '../../../public/img/monitor.svg';
import settings from '../../../public/img/settings.svg';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.listEl}>
          <img src={logo} alt="logo" className={styles.logo} />
        </li>
        <li className={styles.listEl}>
          <img src={book} alt="book" className={styles.svg} />
          <Link to="/" className={styles.listElText}>
            База знаний
          </Link>
        </li>
        <li className={styles.listEl}>
          <img src={paper} alt="paper" className={styles.svg} />
          <Link to="/applications" className={styles.listElText}>
            Заявки
          </Link>
        </li>
        <li className={styles.listEl}>
          <img src={users} alt="users" className={styles.svg} />
          <Link to="/employees" className={styles.listElText}>
            Сотрудники
          </Link>
        </li>
        <li className={styles.listEl}>
          <img src={city} alt="city" className={styles.svg} />
          <Link to="/clients" className={styles.listElText}>
            Клиенты
          </Link>
        </li>
        <li className={styles.listEl}>
          <img src={monitor} alt="monitor" className={styles.svg} />
          <Link to="/assets" className={styles.listElText}>
            Активы
          </Link>
        </li>
        <li className={styles.listEl}>
          <img src={settings} alt="settings" className={styles.svg} />
          <Link to="/settings" className={styles.listElText}>
            Настройки
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
