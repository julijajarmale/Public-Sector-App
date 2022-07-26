import './Layout.scss';
import './crud.scss';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
  
} from "react-router-dom";
import Front from './Components/Front/Front';
import Back from './Components/Back/Back';


function App() {
  return (
    <BrowserRouter>
    <Routes> 
        <Route path="/" element={<Front/>} />
        <Route path="/admin" element={<Back show="admin" />} /> 
        <Route path="/admin/municipalities" element={<Back show="municipalities" />} />
        <Route path="/admin/sectors" element={<Back show="sectors" />} />
    </Routes>
        
    </BrowserRouter>
)
}


  
export default App;