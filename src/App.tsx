import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from 'antd';
import { MathPage } from './components/math';

function App() {
  return (
    <div className="App">
      <Layout>
        <Layout.Content>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MathPage />} />
            </Routes>
          </BrowserRouter>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
