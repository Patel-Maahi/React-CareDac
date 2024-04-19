import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import {
  addCondition,
  deleteCondition,
  getCondition,
} from "../../api/Services/patient/condition";
import {
  addSpecialNeeds,
  deleteSpecialNeeds,
  getSpecialNeeds,
} from "../../api/Services/patient/specialNeeds";
import { ToastContainer, toast } from "react-toastify";

const MyCondition = ({
  closeMyCondition,
  modalValue,
  onListChange,
  conditionsList,
  specialNeedsList,
}) => {
  console.log(modalValue);
  const [condition, setCondition] = useState();
  const [conditionList, setConditionList] = useState([]);
  const [specialNeeds, setSpecialNeeds] = useState();
  const [specialNeedList, setSpecialNeedsList] = useState([]);

  useEffect(() => {
    setConditionList(conditionsList);
    setSpecialNeedsList(specialNeedsList);
    console.log(specialNeedsList);
    // if (modalValue === "My Condition") {
    //   // getCondition().then((res) => {
    //   //   const conditionData = res.data;
    //   //   setConditionList(conditionData);
    //   // });
    //   setConditionList(conditionsList);
    // } else {
    //   // getSpecialNeeds().then((res) => {
    //   //   const specialNeedsData = res.data;
    //   //   setSpecialNeedsList(specialNeedsData);
    //   // });
    //   setSpecialNeeds(specialNeedsList);
    // }
  }, []);
  const handleAdd = () => {
    if (modalValue === "My Condition") {
      const formData = {
        conditions: condition,
      };
      addCondition(formData).then((res) => {
        setConditionList((prevConditions) => [...prevConditions, res.data]);
        if (res) {
          onListChange();
          getCondition().then((res) => {
            const conditionData = res.data;
            setConditionList(conditionData);
          });
        }
      });
    } else {
      const formData = {
        needs: specialNeeds,
      };
      addSpecialNeeds(formData).then((res) => {
        if (res) {
          onListChange();
          getSpecialNeeds().then((res) => {
            const specialNeedsData = res.data;
            setSpecialNeedsList(specialNeedsData);
          });
        }
      });
    }
    setCondition("");
    setSpecialNeeds("");
  };

  const handleDelete = (id) => {
    if (modalValue === "My Condition") {
      deleteCondition(id).then((res) => {
        if (res) {
          onListChange();
          getCondition().then((res) => {
            const conditionData = res.data;
            setConditionList(conditionData);
          });
        }
      });
    } else {
      deleteSpecialNeeds(id).then((res) => {
        if (res) {
          onListChange();
          getSpecialNeeds().then((res) => {
            const specialNeedsData = res.data;
            setSpecialNeedsList(specialNeedsData);
          });
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalValue === "My Condition") {
      const formData = {
        conditions: condition,
      };
      addCondition(formData).then((res) => {
        if (res) {
          onListChange();
          getCondition().then((res) => {
            const conditionData = res.data;
            setConditionList(conditionData);
          });
        }
      });
    } else {
      const formData = {
        needs: specialNeeds,
      };
      addSpecialNeeds(formData).then((res) => {
        if (res) {
          onListChange();
          getSpecialNeeds().then((res) => {
            const specialNeedsData = res.data;
            setSpecialNeedsList(specialNeedsData);
          });
        }
      });
    }

    setCondition("");
    setSpecialNeeds("");
    closeMyCondition();
    console.log(specialNeedList);
    console.log(conditionList);
  };
  console.log(specialNeedList);
  console.log(conditionList);

  return (
    <>
      <Box
        padding={"20px"}
        maxHeight={"424px"}
        overflow={"auto"}
        maxWidth={"500px"}
      >
        <Typography fontSize={"36px"} fontWeight={"600"} color={"#101828"}>
          {modalValue === "My Condition" ? "My Condition" : "Special Needs"}
        </Typography>
        <Divider sx={{ backgroundColor: "#EAECF0", marginTop: "10px" }} />
        <Box padding={"10px"}>
          <Box>
            <MenuList>
              {modalValue === "My Condition"
                ? conditionList.map((item) => (
                    <MenuItem>
                      <ListItemIcon>
                        {modalValue === "My Condition" ? (
                          <TaskAltIcon color="success" />
                        ) : (
                          <CircleIcon fontSize="1px" />
                        )}
                      </ListItemIcon>

                      <ListItemText>{item.conditions}</ListItemText>
                      <ListItemIcon onClick={() => handleDelete(item.id)}>
                        <DeleteOutlineIcon sx={{ color: "#292D32" }} />
                      </ListItemIcon>
                    </MenuItem>
                  ))
                : specialNeedList.map((item) => (
                    <MenuItem>
                      <ListItemIcon>
                        {modalValue === "My Condition" ? (
                          <TaskAltIcon color="success" />
                        ) : (
                          <CircleIcon fontSize="1px" />
                        )}
                      </ListItemIcon>

                      <ListItemText>{item.needs}</ListItemText>
                      <ListItemIcon onClick={() => handleDelete(item.id)}>
                        <DeleteOutlineIcon sx={{ color: "#292D32" }} />
                      </ListItemIcon>
                    </MenuItem>
                  ))}
            </MenuList>
          </Box>
          <Divider sx={{ backgroundColor: "#EAECF0", marginTop: "20px" }} />
          <Box marginTop={3} component={"form"} onSubmit={handleSubmit}>
            <Typography gutterBottom>
              {" "}
              {modalValue === "My Condition" ? "Add Condition" : "Add Needs"}
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <TextField
                placeholder={
                  modalValue === "My Condition"
                    ? "Enter Condition"
                    : "Enter Needs"
                }
                fullWidth
                value={modalValue === "My Condition" ? condition : specialNeeds}
                onChange={(e) =>
                  modalValue === "My Condition"
                    ? setCondition(e.target.value)
                    : setSpecialNeeds(e.target.value)
                }
              />
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Stack>
            <Stack
              marginTop={3}
              direction={"row"}
              justifyContent={"space-between"}
              spacing={2}
            >
              <Button
                variant="outlined"
                onClick={closeMyCondition}
                sx={{ padding: "15px 60px", borderRadius: "40px" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ padding: "15px 70px", borderRadius: "40px" }}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyCondition;
