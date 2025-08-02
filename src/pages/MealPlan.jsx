import {
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router";

function MealPlan() {
  // get id from url params (uncomment when using real id)
  const { id } = useParams();

  // load the meal plan data from local storage
  const mealplanLocalStorage = localStorage.getItem("mealplanlist");
  // create a state to store the meal plan data from local storage
  const [mealplan, setMealPlan] = useState(
    mealplanLocalStorage ? JSON.parse(mealplanLocalStorage) : []
  );

  // loading the existing data from the meal plan that has the same id as the id in the url
  const selectedMealPlan = mealplan.find((m) => m.id === id);

  // if that id don't exist, useNavigate to another page (either error or home page) (doesnt work)
  // if (!selectedMealPlan) {
  //   navigate("/");
  // }

  // set states for every single object (week, day, categories, name, ingredients, steps, preptime)
  // make it so that if it is the selected meal plan that the user is viewing, show the data inside of that selected meal plan
  const [name, setName] = useState(
    selectedMealPlan ? selectedMealPlan.name : ""
  );
  const [category, setCategory] = useState(
    selectedMealPlan ? selectedMealPlan.category : ""
  );
  // ingredients array (all ingredients)
  const [ingredients, setIngredients] = useState(
    selectedMealPlan ? selectedMealPlan.ingredients : []
  );
  const [steps, setSteps] = useState(
    selectedMealPlan ? selectedMealPlan.steps : ""
  );
  const [preptime, setPreptime] = useState(
    selectedMealPlan ? selectedMealPlan.preptime : ""
  );

  // image
  const [image, setImage] = useState(
    selectedMealPlan ? selectedMealPlan.image : ""
  );

  console.log(mealplan)


  return (
    <>
      <Container maxWidth="lg" sx={{ py: "30px" }}>
        <Box sx={{ display: "flex", gap: "60px", py: "10px" }}>
          {/* image of food (to be implemented soon) */}
          <Box>
            <img
              src={image || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"}
              style={{ width: "350px", height: "350px" }}
            />
          </Box>
          {/* box for name, category and prep time of meal */}
          <Box>
            <Typography variant="h1" sx={{ py: "10px" }}>
              {name}
            </Typography>
            <Chip label={`${category}`} />
            <Typography sx={{ py: "10px" }}>Prep Time: {preptime}</Typography>
          </Box>
        </Box>
        {/* steps and ingredients */}
        <Grid container spacing={2}>
          <Grid size={6}>
            {/* mapping out the individual ingredients from the ingredients array */}
            {ingredients.map((ingredient) => (
              <Box key={ingredient.id}>- {ingredient.name}</Box>
            ))}
          </Grid>
          <Grid size={6}>
            <Typography>Steps: </Typography>
            {/* the steps to make the meal */}
            <Box style={{ whiteSpace: "pre-wrap" }}>{steps}</Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MealPlan;
