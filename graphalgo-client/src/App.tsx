import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PublicRoute from './PublicRoute';
import { FRONTEND_ROUTES } from './app/constants/Constants';
import GraphCalculatorPage from './pages/GraphCalculatorPage/GraphCalculatorPage';
import { data } from './app/utils/data';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

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
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoute />}>
              <Route index path='' element={<HomePage />} />
              <Route index path={FRONTEND_ROUTES.CALCULATOR} element={<GraphCalculatorPage  />} />
            </Route>
            <Route path={FRONTEND_ROUTES.SIGNIN} element={<SignInPage />} />
            <Route path={FRONTEND_ROUTES.SIGNUP} element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
