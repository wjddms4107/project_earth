import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import AreaAnalytics from './pages/Area/AreaAnalytics';
import AreaManage from './pages/Area/AreaManage';
import EquipAnalytics from './pages/Equipment/EquipAnalytics';
import EquipManage from './pages/Equipment/EquipManage';
import Monitoring from './pages/Monitoring/Monitoring';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/equipment/analytics" element={<EquipAnalytics />} />
        <Route path="/equipment/manage" element={<EquipManage />} />
        <Route path="/area/analytics" element={<AreaAnalytics />} />
        <Route path="/area/manage" element={<AreaManage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
