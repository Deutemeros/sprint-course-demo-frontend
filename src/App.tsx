import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { Layout } from 'antd';
import { MathPage } from './components/math';
import { NavBar } from './components/navbar';
import { Home } from './components/home/home';

function App() {
  return (
    <div className="App">
      <Layout>
        <NavBar/>
        <Layout.Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fastmath" element={<MathPage />} />
              <Route path="/figures" element={<div>Figures</div>} />
            </Routes>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
