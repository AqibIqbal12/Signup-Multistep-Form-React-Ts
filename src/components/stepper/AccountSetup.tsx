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

let AccountSetupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("This field is required"),
});

type Props = {
  // eslint-disable-next-line
  onSubmit: ({ }) => void;
  formValues: FormValues;
};

const AccountSetup: React.FC<Props> = ({ onSubmit, formValues }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.password,
      }}
      validationSchema={AccountSetupSchema}
      onSubmit={(values) => {
        onSubmit(values);
        //console.log(formValues);
      }}
    >
      {({ errors, handleChange, touched, values }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={values.email}
                fullWidth
                error={errors.email && touched.email ? true : false}
                onChange={handleChange}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errors.email && touched.email ? errors.email : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.password}
                fullWidth
                error={errors.password && touched.password ? true : false}
                onChange={handleChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errors.password && touched.password ? errors.password : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.confirmPassword}
                fullWidth
                error={errors.confirmPassword && touched.confirmPassword ? true : false}
                onChange={handleChange}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AccountSetup;
