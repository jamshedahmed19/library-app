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
import { DocumentaryFormContext } from "../../context/DocumentaryFormContext";
//* ASSETS / ICONS IMPORTS
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
// * UTILS
import { IDocumentary } from "../../utils/interfaces/documentaries.interface";
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  padding: "20px",
}));

const Documentaries: React.FC = () => {
  const navigate = useNavigate();

  const { documentaryList, isLoading } = useContext(DocumentaryFormContext);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent="space-between">
        <Typography variant="h4">Documentaries List</Typography>

        <Button variant="contained" size="medium" onClick={() => navigate(paths.addDocumentary)}>
          ADD DOCUMENTARY
        </Button>
      </Grid>

      {!isLoading && documentaryList !== null && documentaryList.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h6">No Documentaries available</Typography>
        </Grid>
      )}
      {isLoading ? (
        <Grid item xs={12}>
          <Skeletons count={5} />
        </Grid>
      ) : (
        documentaryList &&
        documentaryList.length > 0 &&
        documentaryList.map((documentary: IDocumentary) => (
          <Grid item xs={12} key={uuid()}>
            <Paper
              sx={{
                borderLeft: `5px solid ${
                  documentary.available ? "#4BD66D" : "#D92525"
                }`,
              }}
            >
              <CardContent>
                <Typography variant="h6">{documentary.title}</Typography>
                <Button
                  endIcon={<ArrowRightAltRoundedIcon />}
                  onClick={() =>
                    navigate(
                      paths.documentaryDetails + documentary.documentary_id
                    )
                  }
                >
                  {`View Documentaries Details`}
                </Button>
              </CardContent>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Documentaries;
