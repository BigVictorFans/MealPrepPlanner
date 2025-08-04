import { Button, Container, Typography, Grid, Chip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router";
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";

function MealPlan() {
  // get id from url params (uncomment when using real id)
  const { id } = useParams();

  // create a state to store the meal plan data from local storage
  const [mealplan, setMealPlan] = useLocalStorage("mealplanlist", []);

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
          <Typography variant="h2">404</Typography>
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
  // prep time (minutes)
  const [preptimeMin, setPreptimeMin] = useState(
    selectedMealPlan ? selectedMealPlan.preptimemin : ""
  );
  // prep time (hour)
  const [preptimeHour, setPreptimeHour] = useState(
    selectedMealPlan ? selectedMealPlan.preptimehour : ""
  );
  // image
  const [image, setImage] = useState(
    selectedMealPlan ? selectedMealPlan.image : ""
  );
  const [status, setStatus] = useState(
    selectedMealPlan ? selectedMealPlan.status : ""
  );

  const handleComplete = () => {
    // set new status
    const newStatus = status === "planned" ? "completed" : "planned";
    setStatus(newStatus);

    // update status
    const updatedMealPlanList = mealplan.map((meal) =>
      meal.id === id ? { ...meal, status: newStatus } : meal
    );

    setMealPlan(updatedMealPlanList);
    toast(
      status === "planned"
        ? "Meal plan marked as completed!"
        : "Meal plan marked as planned."
    );
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: "30px" }}>
        <Box sx={{ display: "flex", gap: "60px", py: "10px" }}>
          {/* image of food (to be implemented soon) */}
          <Box>
            <img
              src={
                image ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
              }
              style={{ width: "350px", height: "350px" }}
            />
          </Box>
          {/* box for name, category and prep time of meal */}
          <Box>
            <Typography variant="h1" sx={{ py: "10px" }}>
              {name}
            </Typography>
            <Chip sx={{ textTransform: "capitalize" }} label={`${category}`} />
            <Typography sx={{ py: "10px" }}>
              Prep Time:
              {preptimeHour === ""
                ? ` ${preptimeMin} minutes`
                : ` ${preptimeHour} hours ${preptimeMin} minutes`}
            </Typography>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white" }}
                onClick={handleComplete}
              >
                {status === "completed"
                  ? "Mark as Planned"
                  : "Mark as Completed"}
              </Button>
              {/* if status is planned, show edit button, else show nothing */}
              {status === "planned" ? (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/edit/${id}`}
                >
                  <EditIcon sx={{ paddingRight: "10px" }} />
                  Edit Meal Plan
                </Button>
              ) : null}
            </Box>
          </Box>
        </Box>
        {/* steps and ingredients */}
        <Grid container spacing={5} sx={{ mt: "30px" }}>
          <Grid size={6}>
            <Typography variant="h5" sx={{ mb: "10px" }}>
              Ingredients:
            </Typography>
            {/* mapping out the individual ingredients from the ingredients array */}
            {ingredients.map((ingredient) => (
              <Box key={ingredient.id}>• {ingredient.name}</Box>
            ))}
          </Grid>
          <Grid size={6}>
            <Typography variant="h5" sx={{ mb: "10px" }}>
              Steps:
            </Typography>
            {/* the steps to make the meal */}
            <Box style={{ whiteSpace: "pre-wrap" }}>{steps}</Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MealPlan;
