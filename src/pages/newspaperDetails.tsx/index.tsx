import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
//* MUI IMPORTS
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// * COMPONENTS IMPORTS
import DetailsSkeletons from "../../components/Skeletons/DetailsSkeleton";
//* ASSETS / ICONS IMPORTS
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
// * FUNCS IMPORT
import { NewspaperFormContext } from "../../context/NewspaperFormContext";
// * UTILS
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
}));

const NewspaperDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, getNewspaper, newspaperData, deleteNewspaper } = useContext(NewspaperFormContext);

  useEffect(() => {
    if (id) {
      getNewspaper(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Paper sx={{
          borderLeft: `5px solid ${newspaperData !== null ? newspaperData.available ? "#4BD66D" : "#D92525" : "#878787"}`,
        }}>
        <Box p={4}>
          {isLoading ? (
            <DetailsSkeletons />
          ) : (
            newspaperData && (
              <>
                <NewspaperRoundedIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  {newspaperData.title}
                </Typography>
                <CardContent>
                  <Typography variant="subtitle2">
                    Language: {newspaperData.language}
                  </Typography>
                  <Typography variant="subtitle2">
                    Published Date:{" "}
                    {newspaperData.publishedDate !== null &&
                    newspaperData.publishedDate !== undefined
                      ? newspaperData.publishedDate.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Date of borrow:{" "}
                    {newspaperData.date_of_borrow !== null
                      ? newspaperData.date_of_borrow.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Expected date of return:{" "}
                    {newspaperData.expected_date_of_return !== null
                      ? newspaperData.expected_date_of_return.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="caption">
                    Borrowed by: {newspaperData.borrowed_by}
                  </Typography>
                  <Typography variant="caption">
                    News Content: {newspaperData.newsContent}
                  </Typography>
                </CardContent>
              </>
            )
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() =>
                navigate(paths.editNewspaper + newspaperData?.newspaper_id)
              }
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteNewspaper(newspaperData?.newspaper_id)}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default NewspaperDetails;
