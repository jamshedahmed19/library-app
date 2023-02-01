import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
// * MUI IMPORTS
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// * COMPONENTS IMPORTS
import InputField from "../../components/InputFields";
//* Add data/utils import below this comment
import { fieldNames } from "../../utils/constants/formConstants";
import { NewspaperFormContext } from "../../context/NewspaperFormContext";

interface IAddEditNewspaperFormProps {
  formType: "Add" | "Edit";
}

const AddEditNewspaperForm: React.FC<IAddEditNewspaperFormProps> = ({ formType }) => {
  const { id } = useParams<{ id: string }>();
  const {
    values,
    errors,
    isLoading,
    resetForm,
    handleInputChange,
    handleCheckboxChange,
    handleDateInputChange,
    handleNewspaperFormSubmit,
    getNewspaper,
  } = useContext(NewspaperFormContext);

  useEffect(() => {
    if (id) {
      getNewspaper(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    return () => {
      resetForm();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "350px",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Box sx={{ margin: "50px" }}>
          <Grid container spacing={2} justifyContent="flex-start">
            <Grid item xs={12} lg={12}>
              <Typography variant="h5" component="h1">
                {formType} Newspaper Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <InputField
                label={"Newspaper Title"}
                name={fieldNames.title}
                value={values.title}
                error={errors.title !== "" ? true : false}
                helperText={errors.title}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputField
                label={"Language"}
                name={fieldNames.language}
                value={values.language}
                error={errors.language !== "" ? true : false}
                helperText={errors.language}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputField
                label={"Borrowed By"}
                name={fieldNames.borrowed_by}
                value={values.borrowed_by}
                helperText={errors.borrowed_by}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Borrowed Date"
                  value={values.date_of_borrow}
                  onChange={(newValue) => {
                    handleDateInputChange(newValue, fieldNames.date_of_borrow);
                  }}
                  renderInput={(params) => (
                    <InputField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Published Date"
                  value={values.publishedDate}
                  onChange={(newValue) => {
                    handleDateInputChange(newValue, fieldNames.publishedDate);
                  }}
                  renderInput={(params) => (
                    <InputField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Expected Date Of Return"
                  value={values.expected_date_of_return}
                  onChange={(newValue) => {
                    handleDateInputChange(
                      newValue,
                      fieldNames.expected_date_of_return
                    );
                  }}
                  renderInput={(params) => (
                    <InputField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={fieldNames.available}
                      checked={values.available}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Available"
                  labelPlacement="end"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <InputField
                multiline
                rows={5}
                label={"News Content"}
                name={fieldNames.newsContent}
                value={values.newsContent}
                error={errors.newsContent !== "" ? true : false}
                helperText={errors.newsContent}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => handleNewspaperFormSubmit(formType, id)}
                >
                  {formType} Newspaper
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AddEditNewspaperForm;
