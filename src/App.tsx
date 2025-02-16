import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/fonts/fonts.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Layout } from './components/Layout/Layout';
import { AppProvider } from './context/context';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import store from './store/store';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <AppProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </AppProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
