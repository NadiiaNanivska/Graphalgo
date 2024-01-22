import { ConfigProvider } from 'antd';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import { FRONTEND_ROUTES } from './api/utils/constants/Constants';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
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
          <Route path='/' element={<HomePage />}>
            {/* <Route index path={FRONTEND_ROUTES.HOME} element={<HomePage userName={username} />} />
              <Route index path={FRONTEND_ROUTES.HISTORY} element={<CalculationHistory />} /> */}
          </Route>
          <Route path={FRONTEND_ROUTES.LOGIN} element={<SignInPage />}></Route>
          <Route path={FRONTEND_ROUTES.REGISTER} element={<SignUpPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
