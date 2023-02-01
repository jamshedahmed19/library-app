import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
//* MUI IMPORTS
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// * COMPONENTS IMPORTS
import Skeletons from "../../components/Skeletons";
// * FUNCS IMPORT
import { NewspaperFormContext } from "../../context/NewspaperFormContext";
//* ASSETS / ICONS IMPORTS
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
// * UTILS
import { INewspaper } from "../../utils/interfaces/newspaper.interface";
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  padding: "20px",
}));

const Newspapers: React.FC = () => {
  const navigate = useNavigate();

  const { newspaperList, isLoading } = useContext(NewspaperFormContext);


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent="space-between">
        <Typography variant="h4">Newspapers List</Typography>
        <Button variant="contained" size="medium" onClick={() => navigate(paths.addNewspaper)}>
          ADD NEWSPAPER
        </Button>
      </Grid>
      {!isLoading && newspaperList !== null && newspaperList.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h6">No Newspaper available</Typography>
        </Grid>
      )}
      {isLoading ? (
        <Grid item xs={12}>
          <Skeletons count={5} />
        </Grid>
      ) : (
        newspaperList &&
        newspaperList.length > 0 &&
        newspaperList.map((newspaper: INewspaper) => (
          <Grid item xs={12} key={uuid()}>
            <Paper
              sx={{
                borderLeft: `5px solid ${ newspaper.available ? "#4BD66D" : "#D92525"}`,
              }}
            >
              <CardContent>
                <Typography variant="h6">{newspaper.title}</Typography>
                <Button
                  endIcon={<ArrowRightAltRoundedIcon />}
                  onClick={() =>
                    navigate(paths.newspaperDetails + newspaper.newspaper_id)
                  }
                >
                  {`View Newspapers Details`}
                </Button>
              </CardContent>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Newspapers;
