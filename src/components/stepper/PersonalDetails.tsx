import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormValues } from "../../forms/MultiStep";

import { Formik, Form } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
  },

}));

let PersonalDetailsSchema = yup.object().shape({
  firstName: yup.string().required("This field is required."),
  lastName: yup.string().required("This field is required."),
  phone: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(3)
    .required("A phone number is required"),
  address: yup.string().required("This field is required."),
});

type Props = {
  // eslint-disable-next-line
  onSubmit: ({ }, isLastStep: boolean) => void;
  onBack: () => void;
  formValues: FormValues;
};

const PersonalDetails: React.FC<Props> = ({ onSubmit, onBack, formValues }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phone: formValues.phone,
        address: formValues.address,
      }}
      validationSchema={PersonalDetailsSchema}
      onSubmit={(values) => {
        onSubmit(values, true);
        // console.log(JSON.stringify(formValues));
      }}
    >
      {({ errors, handleChange, touched, values }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.firstName}
                autoComplete="firstName"
                error={errors.firstName && touched.firstName ? true : false}
                name="firstName"
                fullWidth
                onChange={handleChange}
                id="firstName"
                label="First Name"
                autoFocus
                helperText={errors.firstName && touched.firstName ? errors.firstName : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.lastName}
                fullWidth
                error={errors.lastName && touched.lastName ? true : false}
                onChange={handleChange}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                helperText={errors.lastName && touched.lastName ? errors.lastName : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.phone}
                fullWidth
                error={errors.phone && touched.phone ? true : false}
                onChange={handleChange}
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
                helperText={errors.phone && touched.phone ? errors.phone : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.address}
                fullWidth
                error={errors.address && touched.address ? true : false}
                multiline
                rows={3}
                onChange={handleChange}
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                helperText={errors.address && touched.address ? errors.address : null}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetails;
