import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },

  container: {
     display: "flex",
     alignItems: "center",
  },

  thumb: {
    color: "white",
  },
  track: {
    backgroundColor: theme.palette.common.black,
  },
}));

type NavProps = {
  showMultiStepForm: boolean;
  onFormTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Navbar: React.FC<NavProps> = ({ showMultiStepForm, onFormTypeChange,}) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.container}>
          <Typography component="h6" variant="h6">
            Sign Up
          </Typography>
          <Switch
            checked={showMultiStepForm}
            onChange={onFormTypeChange}
            name="show-signup"
            classes={{
              thumb: classes.thumb,
              track: classes.track,
            }}
          />
          <Typography component="h6" variant="h6">
            Multi Step
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
