import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavView } from './components/Nav/NavView';
import { Main } from './pages/Main/Main';
import EquipAnalysis from './pages/Equipment/EquipAnalysis';
import EquipList from './pages/Equipment/EquipList';
import Progress from './pages/Progress/Progress';
import { AreaList } from './pages/Area/AreaList';
import EquipDetail from './pages/Equipment/EquipDetail';
import AreaDetail from './pages/Area/AreaDetail';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavView />}>
          <Route path="/" element={<Main />} />
          <Route path="/equipment/analysis" element={<EquipAnalysis />} />
          <Route path="/equipment/list" element={<EquipList />} />
          <Route path="/equipment/:equipment_id" element={<EquipDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/area/list" element={<AreaList />} />
          <Route path="/area/detail/:area_id" element={<AreaDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
