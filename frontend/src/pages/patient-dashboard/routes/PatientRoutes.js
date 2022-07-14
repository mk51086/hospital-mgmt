import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function MenuItems({ handleRouteChange }) {
  return (
    <div>
      <ListItem button onClick={() => handleRouteChange("")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={() => handleRouteChange("/book-appointment")}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Book Appointment" />
      </ListItem>
      <ListItem button onClick={() => handleRouteChange("/view-appointments")}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="View Appointments" />
      </ListItem>
      <ListItem button onClick={() => handleRouteChange("/account-settings")}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItem>
    </div>
  );
}
