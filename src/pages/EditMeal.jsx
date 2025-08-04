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
import { Link as RouterLink, useParams, useNavigate } from "react-router";
import { nanoid } from "nanoid";
import { toast } from "sonner";

function EditMeal() {
  //define navigate function
  const navigate = useNavigate();
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

  // set states for every single object (day, categories, name, ingredients, steps, preptime)
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

  // image
  const [image, setImage] = useState(
    selectedMealPlan ? selectedMealPlan.image : ""
  );

  // add an ingredient to ingredients array
  const addIngredient = () => {
    if (item === "") {
      toast("Please fill in the fields.");
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

  // handle update function
  const HandleUpdate = () => {
    if (
      day === "" ||
      category === "" ||
      name === "" ||
      ingredients === "" ||
      steps === "" ||
      preptime === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    } else {
      const updatedMealPlan = [...mealplan];
      setMealPlan(
        updatedMealPlan.map((mealplan) => {
          if (mealplan.id === id) {
            mealplan.day = day;
            mealplan.category = category;
            mealplan.name = name;
            mealplan.ingredients = ingredients;
            mealplan.steps = steps;
            mealplan.preptime = preptime;
            mealplan.image = image;
            mealplan.status = "planned"; // reset status to planned when updating
          }
          return mealplan;
        })
      );
      // update the notes in local storage
      setMealPlan(updatedMealPlan);
      localStorage.setItem("mealplanlist", JSON.stringify(updatedMealPlan));
      // show success message
      toast("Meal plan has been updated");
      // redirect back to home page
      navigate(`/meal/${id}`);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: "30px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-around", my: "20px" }}
        >
          <Button variant="outline" component={RouterLink} to={`/meal/${id}`}>
            <ArrowBackIcon />
            Back to Meal Page
          </Button>
          <Typography variant="h3">Edit Meal Plan</Typography>
          {/* update button */}
          <Button variant="contained" onClick={HandleUpdate}>
            Update Meal Plan
          </Button>
        </Box>
        {/* START Box for updating image, day, name, category, prep time */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "250px",
            my: "60px",
          }}
        >
          <Box>
            <InputLabel>Meal Image</InputLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                    width: 350,
                    height: 350,
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

          {/* START box for name, category and prep time of meal */}
          <Box sx={{ width: "100%" }}>
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
          {/* END Box for day, name, category, preptime */}
        </Box>
        {/* END Box for updating image, day, name, category, prep time */}
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EditMeal;
