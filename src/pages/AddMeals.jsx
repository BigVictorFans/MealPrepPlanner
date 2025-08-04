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
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";

function AddMeals() {
  const navigate = useNavigate();

  const [day, setDay] = useLocalStorage("selectedtab");
  const [category, setCategory] = useState("");

  // meal name
  const [name, setName] = useState("");

  // ingredients array (all ingredients)
  const [ingredients, setIngredients] = useState([]);

  // individual ingredients
  const [item, setItem] = useState("");

  const [steps, setSteps] = useState("");

  const [preptimeHour, setPreptimeHour] = useState("");
  const [preptimeMin, setPreptimeMin] = useState("");

  const [status, setStatus] = useState("planned");

  //image
  const [image, setImage] = useState("");

  // create a state to store the meal plan data from local storage
  const [mealplan, setMealPlan] = useLocalStorage("mealplanlist", []);

  // add an ingredient to ingredients array
  const addIngredient = () => {
    if (item.trim() === "") {
      toast("Please fill in the ingredients field.");
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
      day === "" ||
      category === "" ||
      name.trim() === "" ||
      ingredients === "" ||
      steps === "" ||
      preptimeMin.trim() === ""
    ) {
      toast("Please fill up all the fields.");
    } else if (
      preptimeMin <= 0 ||
      preptimeMin >= 60 ||
      (preptimeHour !== "" && (preptimeHour <= 0 || preptimeHour >= 24))
    ) {
      toast("Please fill in a valid prep time");
    } else {
      const updatedMealPlan = [
        ...mealplan,
        {
          id: nanoid(),
          day: day,
          category: category,
          name: name,
          ingredients: ingredients,
          steps: steps,
          preptimehour: preptimeHour,
          preptimemin: preptimeMin,
          status: status,
          image: image,
        },
      ];
      setMealPlan(updatedMealPlan);
      console.log("Meal plan added successfully!");
      navigate("/");
      toast("Meal plan added successfully!");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Typography variant="h4">Add a new meal plan</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          {/* box for day and category */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mt: "20px",
            }}
          >
            {/* day */}
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
            {/* category */}
            <FormControl fullWidth>
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
          </Box>
          {/* meal name */}
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
          {/* ingredients */}
          <Box>
            <InputLabel sx={{ mt: "20px" }}>
              Ingredients ({ingredients.length})
            </InputLabel>
            {/* map added ingredients */}
            <List sx={{ width: "100%" }}>
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
          </Box>
          {/* meal image */}
          <Box sx={{ mt: "20px" }}>
            <InputLabel>Meal Image</InputLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                mt: "10px",
              }}
            >
              {/* preview of the uploaded image */}
              {image && (
                <Box
                  component="img"
                  src={image}
                  alt="Preview"
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              )}
              {/* upload image button */}
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </Box>
          </Box>
          {/* steps */}
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
          {/* prep time */}
          <InputLabel sx={{ mt: "20px", mb: "10px" }}>Prep Time</InputLabel>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <TextField
              type="number"
              fullWidth
              id="prep_time"
              variant="outlined"
              value={preptimeHour}
              onChange={(event) => {
                setPreptimeHour(event.target.value);
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">hours</InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              type="number"
              fullWidth
              id="prep_time"
              variant="outlined"
              value={preptimeMin}
              onChange={(event) => {
                setPreptimeMin(event.target.value);
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">minutes</InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Paper>
        {/* buttons */}
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
          <Button variant="outlined" component={RouterLink} to="/">
            Cancel
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddMeals;
