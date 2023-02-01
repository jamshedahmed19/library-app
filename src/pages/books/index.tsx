import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
// * MUI IMPORTS
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeletons from "../../components/Skeletons";
// * IMPORT FUNC
import { BookFormContext } from "../../context/BookFormContext";
// * ICON/ASSETS IMPORTS
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
// * UTILS IMPORTS
import { IBook } from "../../utils/interfaces/book.interface";
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  padding: "20px",
}));

const Books: React.FC = () => {
  const navigate = useNavigate();

  const { bookList, isLoading } = useContext(BookFormContext);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignContent="center"
      >
        <Typography align="center" variant="h4">
          Books List
        </Typography>

        <Button
          variant="contained"
          size="medium"
          onClick={() => navigate(paths.addBook)}
        >
          ADD BOOK
        </Button>
      </Grid>
      {!isLoading && bookList !== null && bookList.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h6">No books available</Typography>
        </Grid>
      )}
      {isLoading ? (
        <Grid item xs={12}>
          <Skeletons count={5} />
        </Grid>
      ) : (
        bookList &&
        bookList.length > 0 &&
        bookList.map((book: IBook) => (
          <Grid item xs={12} key={uuid()}>
            <Paper
              sx={{
                borderLeft: `5px solid ${
                  book.available ? "#4BD66D" : "#D92525"
                }`,
              }}
            >
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Button
                  endIcon={<ArrowRightAltRoundedIcon />}
                  onClick={() => navigate(paths.bookDetails + book.book_id)}
                >
                  {`View Books Details`}
                </Button>
              </CardContent>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Books;
