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
} from "@mui/material";
import { useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { nanoid } from "nanoid";

function ShoppingList() {
  // 1. load the data from the local storage (key is shoppinglist).
  const listInLocalStorage = JSON.parse(localStorage.getItem("shoppinglist"));

  /* mapping data from mealplanlist to get ingredients to add into shopping list (doesnt work) */
  // const mealPlanList = JSON.parse(localStorage.getItem("mealplanlist"));

  // const ingredients = mealPlanList?.map((meal) => {
  //   return meal.ingredients;
  // });

  // localStorage.setItem("shoppinglist", JSON.stringify(ingredients));
  // const listInLocalStorage = JSON.parse(localStorage.getItem("shoppinglist"));

  // states for item and shopping list
  const [item, setItem] = useState("");
  const [shoppinglist, setShoppingList] = useState(listInLocalStorage || []);

  // function for updating the local storage
  const updatedLocalStorage = (updatedShoppingList) => {
    localStorage.setItem("shoppinglist", JSON.stringify(updatedShoppingList));
  };

  // 3. handle auto generator
  const handleAutoGenerate = () => {
    const confirmation = confirm(
      "Are you sure you want to auto generate the shopping list? This will overwrite your current shopping list."
    )
    if (confirmation) {
          // 1. Get the mealplanlist from localStorage
          const mealPlanList = JSON.parse(localStorage.getItem("mealplanlist")) || [];
          // 2. Extract and flatten all ingredients (no nested arrays)
          const allIngredients = mealPlanList.flatMap(meal => meal.ingredients || []);
          // 3. uniqueIngredients = allIngredients
          const uniqueIngredients = allIngredients
          // 4. Update state
          setShoppingList(uniqueIngredients);
          // 5. Save to localStorage
          localStorage.setItem("shoppinglist", JSON.stringify(uniqueIngredients));
          // 6. Feedback
          alert("The Shopping list has been replaced with all ingredients from your meal plan!");
    }
  };



  // 4. function to add new item into the state and also save it into local storage
  const handleAddNew = () => {
    // 4a. make sure the field is not empty, show error
    if (item === "") {
      alert("Please fill in the field");
    } else {
      // 4b. add the new item to the state
      const updatedShoppingList = [
        ...shoppinglist,
        { id: nanoid(), name: item },
      ];
      setShoppingList(updatedShoppingList);
      // show notification of success message
      alert("Item has been added to the shopping list!");
      // reset the field
      setItem("");
      // 4c. update the local storage with the updated shopping list
      updatedLocalStorage(updatedShoppingList);
    }
  };

  // 5. function to update the item name
  const handleUpdate = (list) => {
    // 5a. prompt the user to update the new name for the selected item (pass in the current value)
    const newListItem = prompt(
      "Please enter the new name for the category",
      list.name
    );

    if (newListItem) {
      const updatedShoppingList = [...shoppinglist];
      setShoppingList(
        updatedShoppingList.map((item) => {
          if (item.id === list.id) {
            item.name = newListItem;
          }
          return item;
        })
      );

      // show notification of success message
      alert("Category has been successfully updated.");
      // 5c. update the local storage with the udpated shopping list
      updatedLocalStorage(updatedShoppingList);
    }
  };

  // 6. function to delete the item from shopping list
  const handleDelete = (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmation) {
      // 6a. delete the item from the shopping list state
      const updatedShoppingList = shoppinglist.filter((item) => {
        if (item.id !== id) {
          return true; // keep
        } else {
          return false; // throw away
        }
      });
      setShoppingList(updatedShoppingList);
      // show notification of success message
      alert("Category has been successfully deleted.");
      // 6b. update the local storage with the updated shopping list
      updatedLocalStorage(updatedShoppingList);
    }
  };

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">
          <ShoppingCartIcon sx={{ fontSize: "25px", paddingRight: "10px" }} />
          Shopping List
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Add an item</InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              fullWidth
              label="Item"
              variant="outlined"
              value={item}
              onChange={(event) => setItem(event.target.value)}
            />
            <Button color="primary" variant="contained" onClick={handleAddNew}>
              Add
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Existing Categories ({shoppinglist.length})</InputLabel>
          <List sx={{ width: "100%" }}>
            {/* map shopping list items */}
            {shoppinglist.map((list) => (
              <ListItem
                key={list.id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton onClick={() => handleUpdate(list)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(list.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`${list.name}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Button variant="contained" color="primary" sx={{ mt: "20px" }} onClick={handleAutoGenerate}>
          Auto Generate Shopping List
        </Button>
      </Container>
    </>
  );
}

export default ShoppingList;
