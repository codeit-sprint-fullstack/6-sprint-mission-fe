import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import FreeBoard from './pages/FreeBoard';
import SecondHandMarket from './pages/SecondHandMarket';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import ProductDetail from './pages/ProductDetail';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path : '/',
    element : <Root />,
    errorElement : <NotFound />,
    children : [
      {index : true, element : <Home />},
      {path : '/product/:detail', element : <ProductDetail />},
      {path : '/freeboard', element : <FreeBoard />},
      {path : '/secondhandmarket', element : <SecondHandMarket />},
      {path : '/privacy', element : <PrivacyPolicy />},
      {path : '/faq', element : <FAQ />},
    ]
  }
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
