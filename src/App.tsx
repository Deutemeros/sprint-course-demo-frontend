import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { Layout } from 'antd';
import { MathPage } from './components/math';
import { NavBar } from './components/navbar';
import { Home } from './components/home/home';
import { FigureForm, Figures } from './components/figures';
import { FieldForm, Fields } from './components/fields';

function App() {
  return (
    <div className="App">
      <Layout>
        <NavBar/>
        <Layout.Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fastmath" element={<MathPage />} />
              <Route path="/figure" element={<Figures />} />
              <Route path="/figure/:id" element={<FigureForm />} />
              <Route path="/field" element={<Fields/>} />
              <Route path="/field/:id" element={<FieldForm/>} />
            </Routes>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
