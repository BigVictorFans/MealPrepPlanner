import {
  Button,
  Container,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router";
import { nanoid } from "nanoid";

function EditMeal() {
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

  // if that id don't exist, show this error page and then bring them back to home page with button
  if (!selectedMealPlan) {
    return (
      <>
        <Box sx={{ textAlign: "center", mt: "30px" }}>
          <img
            src="https://media.istockphoto.com/id/134843485/vector/confused-emoticon.jpg?s=612x612&w=0&k=20&c=GnHI36kUMFWfl2FAFzDnGUiVSswjUXtVx46Up2qPwDc="
            style={{ height: "200px", width: "200px" }}
          />
          <Typography variant="h4">404</Typography>
          <Typography variant="body2" sx={{ my: "20px" }}>
            This page could not be found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
          >
            Return to home
          </Button>
        </Box>
      </>
    );
  }

  // set states for every single object (week, day, categories, name, ingredients, steps, preptime)
  // make it so that if it is the selected meal plan that the user is viewing, show the data inside of that selected meal plan
  const [day, setDay] = useState(selectedMealPlan ? selectedMealPlan.day : "");
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
  // individual ingredients
  const [item, setItem] = useState("");
  const [steps, setSteps] = useState(
    selectedMealPlan ? selectedMealPlan.steps : ""
  );
  const [preptime, setPreptime] = useState(
    selectedMealPlan ? selectedMealPlan.preptime : ""
  );

  // add an ingredient to ingredients array
  const addIngredient = () => {
    if (item === "") {
      alert("Please fill in the fields.");
    } else {
      const updatedIngredients = [...ingredients, { id: nanoid(), name: item }];
      setIngredients(updatedIngredients);
      setItem("");
    }
  };

  // delete ingredient from ingredients array
  const deleteIngredient = (id) => {
    const updatedIngredients = ingredients.filter((ingredient) => {
      if (ingredient.id !== id) {
        return true;
      }
      return false;
    });
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: "30px" }}>
        <Box sx={{ display: "flex", mb: "20px" }}>
          <Button
            variant="outline"
            component={RouterLink}
            to={`/meal/${id}`}
            sx={{ mt: "20px" }}
          >
            <ArrowBackIcon />
            Back to Meal Page
          </Button>
          <Typography variant="h2" sx={{ paddingLeft: "180px" }}>
            Edit Meal Plan
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "60px", py: "10px" }}>
          {/* image of food (to be implemented soon) */}
          <Box>
            <img
              src="https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-F5.jpg"
              style={{ width: "350px", height: "350px" }}
            />
            {/* upload image button here */}
          </Box>
          {/* box for name, category and prep time of meal */}
          <Box>
            {/* update day */}
            <FormControl fullWidth>
              <InputLabel id="meal_day_label">Day</InputLabel>
              <Select
                labelId="meal_day_label"
                id="meal_day"
                label="Day"
                value={day}
                onChange={(event) => {
                  setDay(event.target.value);
                }}
              >
                <MenuItem value="mon">Monday</MenuItem>
                <MenuItem value="tue">Tuesday</MenuItem>
                <MenuItem value="wed">Wednesday</MenuItem>
                <MenuItem value="thu">Thursday</MenuItem>
                <MenuItem value="fri">Friday</MenuItem>
                <MenuItem value="sat">Saturday</MenuItem>
                <MenuItem value="sun">Sunday</MenuItem>
              </Select>
            </FormControl>
            {/* update name */}
            <Box sx={{ mt: "20px" }}>
              <TextField
                fullWidth
                id="meal_name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Box>
            {/* update meal category */}
            <FormControl fullWidth sx={{ mt: "20px" }}>
              <InputLabel id="meal_category">Category</InputLabel>
              <Select
                labelId="meal_category"
                id="meal_day"
                label="Category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
              </Select>
            </FormControl>
            {/* update prep time */}
            <Box sx={{ mt: "20px" }}>
              <TextField
                fullWidth
                id="meal_name"
                label="Prep Time"
                variant="outlined"
                placeholder="Estimated Time"
                value={preptime}
                onChange={(event) => {
                  setPreptime(event.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* steps and ingredients grid */}
        <Grid container spacing={5}>
          <Grid size={6}>
            {/* update ingredients */}
            <InputLabel sx={{ mt: "20px" }}>
              Ingredients ({ingredients.length})
            </InputLabel>
            <List sx={{ width: "100%" }}>
              {/* map current ingredients in the meal plan */}
              {ingredients.map((ingredient) => (
                <ListItem
                  key={ingredient.id}
                  disableGutters
                  divider
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <IconButton
                        onClick={() => deleteIngredient(ingredient.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={`${ingredient.name}`} />
                </ListItem>
              ))}
            </List>
            {/* add ingredients */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "20px",
              }}
            >
              <TextField
                fullWidth
                id="meal_ingredients"
                label="Ingredients"
                variant="outlined"
                value={item}
                onChange={(event) => {
                  setItem(event.target.value);
                }}
              />
              <Button
                color="primary"
                variant="contained"
                sx={{ minHeight: "55px" }}
                onClick={addIngredient}
              >
                Add
              </Button>
            </Box>
          </Grid>
          {/* update steps */}
          <Grid size={6}>
            <Box sx={{ mt: "20px" }}>
              <TextField
                fullWidth
                multiline
                maxRows={8}
                id="meal_steps"
                label="Steps"
                variant="outlined"
                value={steps}
                onChange={(event) => {
                  setSteps(event.target.value);
                }}
              />
            </Box>
            {/* update button */}
            <Button variant="contained" fullWidth sx={{ mt: "20px" }}>
              Update Meal Plan
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EditMeal;
