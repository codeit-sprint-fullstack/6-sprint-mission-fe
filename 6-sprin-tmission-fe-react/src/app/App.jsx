import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './../pages/home/Home';
import UsedMarket from './../pages/used-market/Index';
import NotFound from '../pages/error/NotFound';
import Layout from './layout/Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/used-market' element={<UsedMarket />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
