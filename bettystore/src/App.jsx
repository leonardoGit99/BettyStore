import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MostrarInventario from './views/MostrarInventario';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/mostrarinventario' element={<MostrarInventario />}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
