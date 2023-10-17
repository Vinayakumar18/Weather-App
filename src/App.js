import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Weather } from './components/Weather';
function App() {
  const apikey = '' //Your api key
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Weather api={apikey} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
