import { ConfigProvider } from 'antd';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import { FRONTEND_ROUTES } from './api/utils/constants/Constants';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import GraphCalculatorPage from './pages/GraphCalculatorPage/GraphCalculatorPage';
import { data } from './pages/GraphCalculatorPage/data';

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
          <Route path='/' element={<HomePage />} />
          <Route path='/calculator' element={<GraphCalculatorPage data={data} />} />
            {/* <Route index path={FRONTEND_ROUTES.HOME} element={<HomePage userName={username} />} />
              <Route index path={FRONTEND_ROUTES.HISTORY} element={<CalculationHistory />} /> */}
          <Route path={FRONTEND_ROUTES.LOGIN} element={<SignInPage />} />
          <Route path={FRONTEND_ROUTES.REGISTER} element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
    </div>
  );
}

export default App;
