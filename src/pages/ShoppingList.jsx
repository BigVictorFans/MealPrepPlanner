import {
  Container,
  Typography,
  Paper,
  TextField,
  Box,
  InputLabel,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { nanoid } from "nanoid";
import { toast } from "sonner";

function ShoppingList() {
  // 1. load the data from the local storage (key is shoppinglist).
  const listInLocalStorage = JSON.parse(localStorage.getItem("shoppinglist"));

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
    );
    if (confirmation) {
      // 1. Get the mealplanlist from localStorage
      const mealPlanList =
        JSON.parse(localStorage.getItem("mealplanlist")) || [];
      // 2. Extract and flatten all ingredients (no nested arrays)
      const allIngredients = mealPlanList.flatMap(
        (meal) => meal.ingredients || []
      );
      // 3. uniqueIngredients = allIngredients
      const uniqueIngredients = allIngredients;
      // 4. Update state
      setShoppingList(allIngredients);
      // 5. Save to localStorage
      localStorage.setItem("shoppinglist", JSON.stringify(uniqueIngredients));
      // 6. Feedback
      toast(
        "The Shopping list has been replaced with all ingredients from your meal plan!"
      );
    }
  };

  // 4. function to add new item into the state and also save it into local storage
  const handleAddNew = () => {
    // 4a. make sure the field is not empty, show error
    if (item === "") {
      toast("Please fill in the field.");
    } else {
      // 4b. add the new item to the state
      const updatedShoppingList = [
        ...shoppinglist,
        { id: nanoid(), name: item },
      ];
      setShoppingList(updatedShoppingList);
      // show notification of success message
      toast("Item has been added to the shopping list!");
      // reset the field
      setItem("");
      // 4c. update the local storage with the updated shopping list
      updatedLocalStorage(updatedShoppingList);
    }
  };

  const [editItem, setEditItem] = useState(null); // the object being edited
  const [editName, setEditName] = useState(""); // the new name
  const [deleteOpen, setDeleteOpen] = useState(false); // delete dialog open / close state
  const [editOpen, setEditOpen] = useState(false); // edit dialog open / close state

  const handleClickEditOpen = (item) => {
    setEditItem(item); // store the item object
    setEditName(item.name); // initialize edit field with current name
    setEditOpen(true); // open edit dialog
  };

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true); // open delete dialog
  };

  const handleEditClose = () => {
    setEditOpen(false); // close edit dialog
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false); // close delete dialog
  };

  // 5. function to update the item name
  const handleUpdate = () => {
    // if no value, tell the user to fill up the field
    if (editItem === null || editName.trim() === "") {
      toast("Please enter a new name for the item.");
      return;
    }

    const updatedShoppingList = [...shoppinglist];
    setShoppingList(
      updatedShoppingList.map((item) => {
        if (item.id === editItem.id) {
          item.name = editName;
        }
        return item;
      })
    );

    // show notification of success message
    toast("Item has been successfully updated.");
    // 5c. update the local storage with the udpated shopping list
    updatedLocalStorage(updatedShoppingList);
    // close the dialog
    handleEditClose();
  };

  // 6. function to delete the item from shopping list
  const handleDelete = (id) => {
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
    toast("Category has been successfully deleted.");
    // 6b. update the local storage with the updated shopping list
    updatedLocalStorage(updatedShoppingList);
    // close the dialog
    handleDeleteClose();
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
          <InputLabel>Items ({shoppinglist.length})</InputLabel>
          <List sx={{ width: "100%" }}>
            {/* map shopping list items */}
            {shoppinglist.map((list) => (
              <ListItem
                key={list.id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    {/* edit button */}
                    <Tooltip title="Edit" placement="top">
                      <IconButton onClick={() => handleClickEditOpen(list)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    {/* edit dialog start */}
                    <Dialog open={editOpen} onClose={handleEditClose}>
                      <DialogTitle>Edit Item</DialogTitle>
                      <DialogContent sx={{ paddingBottom: 0 }}>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="item"
                          name="item"
                          label="New Name"
                          type="text"
                          fullWidth
                          variant="standard"
                          value={editName}
                          onChange={(event) => setEditName(event.target.value)}
                        />
                        <DialogActions>
                          <Button onClick={handleEditClose}>Cancel</Button>
                          <Button onClick={handleUpdate}>Save</Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                    {/* edit dialog end */}
                    {/* delete button */}
                    <Tooltip title="Delete" placement="top">
                      <IconButton onClick={() => handleClickDeleteOpen()}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    {/* delete dialog start */}
                    <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                      <DialogTitle>
                        Are you sure you want to delete this meal plan?
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleDeleteClose}>Cancel</Button>
                        <Button onClick={() => handleDelete(list.id)}>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {/* delete dialog end */}
                  </Box>
                }
              >
                <ListItemText primary={`${list.name}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "20px" }}
          onClick={handleAutoGenerate}
        >
          Auto Generate Shopping List
        </Button>
      </Container>
    </>
  );
}

export default ShoppingList;
