import { BrowserRouter as Router, Routes, Route } from "react-router";
import ShoppingList from './pages/ShoppingList';
import AddMeals from './pages/AddMeals';
import Homepage from './pages/HomePage';
import ResponsiveAppBar from './components/appbar';
import ViewMeals from './pages/ViewFood';


function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add" element={<AddMeals />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
          <Route path="/view" element={<ViewMeals />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
