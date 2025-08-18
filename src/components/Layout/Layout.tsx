import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.outlet}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
