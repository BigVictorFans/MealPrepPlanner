import { BrowserRouter as Router, Routes, Route } from "react-router";
import ResponsiveAppBar from "./components/appbar.jsx";
import ShoppingList from "./pages/ShoppingList";
import AddMeals from "./pages/AddMeals";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add" element={<AddMeals />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
