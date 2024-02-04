import Home from "./components/Home";
import { Routes,Route,BrowserRouter as Router } from "react-router-dom";
import Manage from "./components/Manage";
function App() {
  return (
    <div className="App">
      <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/get" element={<Manage />}/>
    </Routes>
   </Router>

    </div>
  );
}

export default App;
