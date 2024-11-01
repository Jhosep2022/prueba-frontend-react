import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Episodes from '../pages/Episodes/Episodes';
import Locations from '../pages/Locations/Locations';
import Characters from '../pages/Characters/Characters';
import Navbar from '../components/Navbar/Navbar';
import Favorites from '../pages/Favorites/Favorites';


function AppRoutes() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
