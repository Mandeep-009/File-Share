import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Send from './components/Send';
import Receive from './components/Receive';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/send' element={<Send/>}/>
          <Route path='/receive' element={<Receive/>}/>
          <Route path='/ss' elemen={<Upload />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
