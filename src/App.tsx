import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Applications from './pages/Applications/Applications';
import Base from './pages/Base/Base';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Base />} />
        <Route path="applications" element={<Applications />} />
      </Route>
    </Routes>
  );
}

export default App;
