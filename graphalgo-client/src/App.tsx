import { ConfigProvider } from 'antd';
import './App.css';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <ConfigProvider
            theme={{
                token: {
                    controlHeightLG: 60
                }
            }}
        >
    <HomePage/>
    </ConfigProvider>
  );
}

export default App;
