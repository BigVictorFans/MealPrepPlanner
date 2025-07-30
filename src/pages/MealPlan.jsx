import { useState } from "react";
import { useNavigate } from "react-router";

function MealPlan() {
  // get id from url params (uncomment when using real id)
  // const { id } = useParams();
  // const navigate = useNavigate();

  // load the meal plan data from local storage
  const mealplanLocalStorage = localStorage.getItem("mealplanlist");
  // create a state to store the meal plan data from local storage
  const [mealplan, setMealPlan] = useState(
    mealplanLocalStorage ? JSON.parse(mealplanLocalStorage) : []
  );

  // loading the existing data from the meal plan in
  // const selectedMealPlan = mealplan.find((m) => m.id === id);

  // if that id don't exist, useNavigate to another page (either error or home page)
  // if (!selectedMeal) { navigate("/") }

  // set states for every single object (week, day, categories, name, ingredients, steps, preptime)

  // make it so that if it is the selected meal plan that the user is viewing, show the stuff inside
  // const [name, setName] = useState(selectedMealPlan ? selectedMealPlan.name : "");
  // const [category, setCategory] = useState(selectedMealPlan ? selectedMealPlan.category || "");
  // // ingredients array (all ingredients)
  // const [ingredients, setIngredients] = useState(selectedMealPlan ? selectedMealPlan.ingredients || []);
  // const [steps, setSteps] = useState(selectedMealPlan ? selectedMealPlan.steps || "");
  // const [preptime, setPreptime] = useState(selectedMealPlan ? selectedMealPlan.preptime || "");

  return (
    <>
      {mealplan.map((meal) =>
        meal.ingredients.map((ingredient) => <div>{ingredient.name}</div>)
      )}
      <div style={{ whiteSpace: "pre-wrap" }}>{mealplan[0].steps}</div>
    </>
  );
}

export default MealPlan;
