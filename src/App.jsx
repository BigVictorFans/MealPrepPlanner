import { BrowserRouter as Router, Routes, Route } from "react-router";
import ShoppingList from "./pages/ShoppingList";
import AddMeals from "./pages/AddMeals";
import Homepage from "./pages/HomePage";
import MealPlan from "./pages/MealPlan";
import ResponsiveAppBar from "./components/appbar";

function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add" element={<AddMeals />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
          <Route path="/meal/1" element={<MealPlan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
