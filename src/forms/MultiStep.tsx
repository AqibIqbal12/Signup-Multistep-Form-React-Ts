import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AccountSetup from "../components/stepper/AccountSetup";
import PersonalDetails from "../components/stepper/PersonalDetails";
import SocialProfiles from "../components/stepper/SocialProfiles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
}));

function getSteps() {
  return ["Account Setup", "Social Profiles", "Personal Details"];
}

export type FormValues = {
  email: string;
  password: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  firstName: string;
  lastName: string;
  phone: number;
  address: string;
};

const MultiStep = () => {
  const initialFormValues: FormValues = {
    email: "",
    password: "",
    facebook: "",
    twitter: "",
    linkedIn: "",
    firstName: "",
    lastName: "",
    phone: 0,
    address: "",
  };
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormValues(initialFormValues);
    setIsSubmitted(false);
  };

  const handleSubmit = (values: any, isLastStep = false) => {
    setFormValues({ ...formValues, ...values });
    if (!isLastStep) handleNext();
    else {
      alert("Form Submitted Successfully.");
      setIsSubmitted(isLastStep);
    }
  };
  //console.log(formValues)

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (<AccountSetup onSubmit={handleSubmit} formValues={formValues} />);
      case 1:
        return (<SocialProfiles onSubmit={handleSubmit} onBack={handleBack} formValues={formValues} />);
      case 2:
        return (<PersonalDetails onSubmit={handleSubmit} onBack={handleBack} formValues={formValues} />);
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {isSubmitted ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
              <div>{getStepContent(activeStep)}</div>
            )}
        </div>
      </Container>
    </div>
  );
};

export default MultiStep;
