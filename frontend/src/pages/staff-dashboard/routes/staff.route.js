import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedicationIcon from '@mui/icons-material/Medication';
import { useAuthContext } from "../../../hooks/useAuthContext";

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
        <ListItem button onClick={() => handleRouteChange("/cashier")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Cashier" />
        </ListItem>
      )}
      {user.jobTitle === "receptionist" && (
        <ListItem button onClick={() => handleRouteChange("/receptionist")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Receptionist" />
        </ListItem>
      )}
      {user.jobTitle === "labassistant" && (
        <ListItem button onClick={() => handleRouteChange("/labassistant")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Lab Assistant" />
        </ListItem>
      )}
      {user.jobTitle === "nurse" && (
        <ListItem button onClick={() => handleRouteChange("/nurse")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Nurse" />
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
