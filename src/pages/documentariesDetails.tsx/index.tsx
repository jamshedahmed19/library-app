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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
// * FUNCS IMPORT
import { DocumentaryFormContext } from "../../context/DocumentaryFormContext";
// * UTILS
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
}));

const DocumentaryDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, getDocumentary, documentaryData, deleteDocumentary } = useContext(DocumentaryFormContext);

  useEffect(() => {
    if (id) {
      getDocumentary(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Paper sx={{
          borderLeft: `5px solid ${documentaryData !== null ? documentaryData.available ? "#4BD66D" : "#D92525" : "#878787"}`,
        }}>
        <Box p={4}>
          {isLoading ? (
            <DetailsSkeletons />
          ) : (
            documentaryData && (
              <>
                <HistoryEduRoundedIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  {documentaryData.title}
                </Typography>
                <CardContent>
                  <Typography variant="h6">
                    Directed By: {documentaryData.directed_by}
                  </Typography>
                  <Typography variant="h6">
                    Genre By: {documentaryData.genre}
                  </Typography>
                  <Typography variant="h6">
                    Language: {documentaryData.language}
                  </Typography>
                  <Typography variant="subtitle2">
                    Published Date:{" "}
                    {documentaryData.publishedDate !== null &&
                    documentaryData.publishedDate !== undefined
                      ? documentaryData.publishedDate.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Date of borrow:{" "}
                    {documentaryData.date_of_borrow !== null
                      ? documentaryData.date_of_borrow.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Expected date of return:{" "}
                    {documentaryData.expected_date_of_return !== null
                      ? documentaryData.expected_date_of_return.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="caption">
                    Borrowed by: {documentaryData.borrowed_by}
                  </Typography>
                </CardContent>
              </>
            )
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() =>
                navigate(
                  paths.editDocumentary + documentaryData?.documentary_id
                )
              }
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteDocumentary(documentaryData?.documentary_id)}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default DocumentaryDetails;
