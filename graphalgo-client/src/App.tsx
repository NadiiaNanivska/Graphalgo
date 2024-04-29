import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PublicRoute from './PublicRoute';
import { FRONTEND_ROUTES } from './app/constants/Constants';
import GraphCalculatorPage from './pages/GraphCalculatorPage/GraphCalculatorPage';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { UserProvider } from './contexts/GraphOptionsContext';
import HistoryPage from './pages/HistoryPage/HistoryPage';

function App() {
  return (
    <div className='app'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FD744F',
            colorBorder: '#fcbdac',
            colorLink: '#AD2831',
            controlHeightLG: 60
          }
        }}
      >
        <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoute />}>
              <Route index path='' element={<HomePage />} />
              <Route index path={FRONTEND_ROUTES.CALCULATOR} element={<GraphCalculatorPage  />} />
              <Route index path={FRONTEND_ROUTES.HISTORY} element={<HistoryPage />} />
            </Route>
            <Route path={FRONTEND_ROUTES.SIGNIN} element={<SignInPage />} />
            <Route path={FRONTEND_ROUTES.SIGNUP} element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        </UserProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
