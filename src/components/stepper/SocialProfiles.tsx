import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Formik, Form } from "formik";
import * as yup from "yup";
import { FormValues } from "../../forms/MultiStep";

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

let SocialProfilesSchema = yup.object().shape({
  facebook: yup.string(),
  twitter: yup.string(),
  linkedIn: yup.string(),
});

type Props = {
  // eslint-disable-next-line
  onSubmit: ({ }) => void;
  onBack: () => void;
  formValues: FormValues;
};

const SocialProfiles: React.FC<Props> = ({ onSubmit, onBack, formValues }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        facebook: formValues.facebook,
        twitter: formValues.twitter,
        linkedIn: formValues.linkedIn,
      }}
      validationSchema={SocialProfilesSchema}
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
                value={values.facebook}
                error={errors.facebook && touched.facebook ? true : false}
                fullWidth
                onChange={handleChange}
                id="facebook"
                label="Facebook"
                name="facebook"
                autoComplete="facebook"
                helperText={errors.facebook && touched.facebook ? errors.facebook : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.twitter}
                error={errors.twitter && touched.twitter ? true : false}
                fullWidth
                onChange={handleChange}
                name="twitter"
                label="Twitter"
                id="twitter"
                autoComplete="twitter"
                helperText={errors.twitter && touched.twitter ? errors.twitter : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.linkedIn && touched.linkedIn ? true : false}
                value={values.linkedIn}
                fullWidth
                onChange={handleChange}
                name="linkedIn"
                label="LinkedIn"
                id="linkedIn"
                autoComplete="linkedIn"
                helperText={errors.linkedIn && touched.linkedIn ? errors.linkedIn : null}
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
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SocialProfiles;
