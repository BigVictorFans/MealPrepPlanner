import { BrowserRouter as Router, Routes, Route } from "react-router";

import ShoppingList from "./pages/ShoppingList";
import AddMeals from "./pages/AddMeals";
import Homepage from "./pages/HomePage";
import ResponsiveAppBar from "./components/appbar";
import MealPlan from "./pages/MealPlan";
import EditMeal from "./pages/EditMeal";

function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add" element={<AddMeals />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
          <Route path="/meal/:id" element={<MealPlan />} />
          <Route path="/edit/:id" element={<EditMeal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
