import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ShoppingList from './pages/ShoppingList';
import AddMeals from './pages/AddMeals';
import Homepage from './pages/HomePage';



function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="addmeals" element={<AddMeals />} />
          <Route path="list" element={<ShoppingList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
