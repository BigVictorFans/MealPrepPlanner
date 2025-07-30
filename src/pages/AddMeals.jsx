import { Link as RouterLink, useNavigate } from "react-router";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Select,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { nanoid } from "nanoid";

function AddMeals() {
  const navigate = useNavigate();

  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");
  const [category, setCategory] = useState("");
  // meal name
  const [name, setName] = useState("");
  // ingredients array (all ingredients)
  const [ingredients, setIngredients] = useState([]);
  // individual ingredients
  const [item, setItem] = useState("");
  const [steps, setSteps] = useState("");
  const [preptime, setPreptime] = useState("");

  // load the meal plan data from local storage
  const mealplanLocalStorage = localStorage.getItem("mealplanlist");
  // create a state to store the meal plan data from local storage
  const [mealplan, setMealPlan] = useState(
    mealplanLocalStorage ? JSON.parse(mealplanLocalStorage) : []
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

  // add meal plan to local storage
  const addNewMealPlan = () => {
    if (
      week === "" ||
      day === "" ||
      category === "" ||
      name === "" ||
      ingredients === "" ||
      steps === "" ||
      preptime === ""
    ) {
      alert("Please fill up all the fields");
    } else {
      const updatedMealPlan = [
        ...mealplan,
        {
          id: nanoid(),
          week: week,
          day: day,
          category: category,
          name: name,
          ingredients: ingredients,
          steps: steps,
          preptime: preptime,
        },
      ];
      setMealPlan(updatedMealPlan);
      localStorage.setItem("mealplanlist", JSON.stringify(updatedMealPlan));
      navigate("/");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Typography variant="h3">Add a new meal plan</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mt: "20px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="meal_week_label">Week</InputLabel>
              <Select
                labelId="meal_week_label"
                id="meal_week"
                label="Week"
                value={week}
                onChange={(event) => {
                  setWeek(event.target.value);
                }}
              >
                <MenuItem value="w1">Week 1</MenuItem>
                <MenuItem value="w2">Week 2</MenuItem>
                <MenuItem value="w3">Week 3</MenuItem>
                <MenuItem value="w4">Week 4</MenuItem>
              </Select>
            </FormControl>
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
          </Box>
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
          <InputLabel sx={{ mt: "20px" }}>
            Ingredients ({ingredients.length})
          </InputLabel>
          <List sx={{ width: "100%" }}>
            {ingredients.map((ingredient) => (
              <ListItem
                key={ingredient.id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton onClick={() => deleteIngredient(ingredient.id)}>
                      <ClearIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`${ingredient.name}`} />
              </ListItem>
            ))}
          </List>
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
              autoFocus
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
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Button color="primary" variant="contained" onClick={addNewMealPlan}>
            Save Meal
          </Button>
          <Button variant="outlined" component={RouterLink} to={`/meal/1`}>
            Go to meal page
          </Button>
          <Button variant="outlined" component={RouterLink} to="/">
            Cancel
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddMeals;
