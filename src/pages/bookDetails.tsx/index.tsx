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
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
// * FUNCS IMPORT
import { BookFormContext } from "../../context/BookFormContext";
// * UTILS
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
}));

const BookDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, getBook, bookData, deleteBook } = useContext(BookFormContext);

  useEffect(() => {
    if (id) {
      getBook(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Paper sx={{
          borderLeft: `5px solid ${bookData !== null ? bookData.available ? "#4BD66D" : "#D92525" : "#878787"}`,
        }}>
        <Box p={4}>
          {isLoading ? (
            <DetailsSkeletons />
          ) : (
            bookData && (
              <>
                <MenuBookRoundedIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  {bookData.title}
                </Typography>
                <CardContent>
                  <Typography variant="h6">
                    Author: {bookData.author}
                  </Typography>
                  <Typography variant="subtitle2">
                    Date of borrow:{" "}
                    {bookData.date_of_borrow !== null
                      ? bookData.date_of_borrow.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Expected date of return:{" "}
                    {bookData.expected_date_of_return !== null
                      ? bookData.expected_date_of_return.toString()
                      : "NAN"}
                  </Typography>
                  <Typography variant="caption">
                    Borrowed by: {bookData.borrowed_by}
                  </Typography>
                </CardContent>
              </>
            )
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => navigate(paths.editBook + bookData?.book_id)}
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={() => deleteBook(bookData?.book_id)}>
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default BookDetails;
