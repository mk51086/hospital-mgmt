import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedicationIcon from "@mui/icons-material/Medication";
import { useAuthContext } from "../../../hooks/useAuthContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function MenuItems({ handleRouteChange }) {
  const { user } = useAuthContext();

  return (
    <div>
      <ListItem button onClick={() => handleRouteChange("")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      {user.jobTitle === "doctor" && (
        <ListItem button onClick={() => handleRouteChange("/doctor")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Prescriptions" />
        </ListItem>
      )}
      {user.jobTitle === "cashier" && (
        <ListItem button onClick={() => handleRouteChange("/createbill")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Bills" />
        </ListItem>
      )}
      {user.jobTitle === "receptionist" && (
        <ListItem button onClick={() => handleRouteChange("/createroom")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Create Room" />
        </ListItem>
      )}
      {user.jobTitle === "labassistant" && (
        <ListItem button onClick={() => handleRouteChange("/add-test")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Add Test" />
        </ListItem>
      )}
      {user.jobTitle === "labassistant" && (
        <ListItem button onClick={() => handleRouteChange("/tests")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Tests" />
        </ListItem>
      )}
      {user.jobTitle === "nurse" && (
        <ListItem
          button
          onClick={() => handleRouteChange("/view-examinations")}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Your Examinations" />
        </ListItem>
      )}
      {user.jobTitle === "nurse" && (
        <ListItem
          button
          onClick={() => handleRouteChange("/createexaminations")}
        >
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Create Examination" />
        </ListItem>
      )}

      {user.jobTitle === "pharmacist" && (
        <ListItem button onClick={() => handleRouteChange("/pharmacist")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Pharmacist" />
        </ListItem>
      )}
    </div>
  );
}
