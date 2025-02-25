import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/fonts/fonts.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Layout } from './components/Layout/Layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
