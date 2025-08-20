import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Applications from './pages/Applications/Applications';
import Base from './pages/Base/Base';
import Assets from './pages/Assets/Assets';
import Settings from './pages/Settings/Settings';
import Clients from './pages/Clients/Clients';
import Employees from './pages/Employees/Employees';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Applications />} />
        <Route path="base" element={<Base />} />
        <Route path="assets" element={<Assets />} />
        <Route path="settings" element={<Settings />} />
        <Route path="clients" element={<Clients />} />
        <Route path="employees" element={<Employees />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
