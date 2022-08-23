import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import EquipAnalysis from './pages/Equipment/EquipAnalysis';
import EquipList from './pages/Equipment/EquipList';
import Progress from './pages/Progress/Progress';
import AreaList from './pages/Area/AreaList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Main />} />
          <Route path="/equipment/analysis" element={<EquipAnalysis />} />
          <Route path="/equipment/list" element={<EquipList />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/area/list" element={<AreaList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
