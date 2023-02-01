import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { v4 as uuid } from "uuid";
// * FUNCS IMPORT
import useValidation from "../utils/hooks/useValidation";
// * UTILS
import { IBook } from "../utils/interfaces/book.interface";
import { BOOKS_LIST } from "../utils/mockData/books";
import { paths } from "../routes/paths";

export interface IFormValues {
  [k: string]: string | number | null | Date | boolean | undefined;
  author: string;
  title: string;
  borrowed_by: string;
  date_of_borrow: string | null | Date;
  expected_date_of_return: string | null | Date;
  available: boolean;
}

export interface IFormErrors {
  title: string;
  author: string;
  borrowed_by: string;
  date_of_borrow: string;
  expected_date_of_return: string;
}

interface IBookFormContextState {
  bookData: IBook | null;
  bookList: IBook[] | null;
  isLoading: boolean;
  values: IFormValues;
  errors: IFormErrors;
  resetForm: () => void,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateInputChange: (newValue: Date | string | null | undefined, name: string) => void;
  getBooks: () => void;
  addBook: () => void;
  getBook: (id: string) => void;
  updateBook: (id: string) => void;
  deleteBook: (id: string | undefined) => void;
  handleBookFormSubmit: (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => void;
}

const defaultState: IBookFormContextState = {
  isLoading: false,
  bookList: BOOKS_LIST,
  bookData: null,
  values: {
    book_id: "",
    title: "",
    author: "",
    borrowed_by: "",
    date_of_borrow: null,
    expected_date_of_return: null,
    available: false,
  },
  
  errors: {
    title: "",
    author: "",
    borrowed_by: "",
    date_of_borrow: "",
    expected_date_of_return: "",
  },
  resetForm: () => {},
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleDateInputChange: (
    newValue: Date | string | null | undefined,
    name: string
  ) => {},
  getBooks: async () => {},
  addBook: async () => {},
  getBook: async (id: string) => {},
  updateBook: async (id: string) => {},
  deleteBook: async (id: string | undefined) => {},
  handleBookFormSubmit: (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => {},
};

export const BookFormContext = createContext<IBookFormContextState>(defaultState);

export const BookFormContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [values, setValues] = useState<IFormValues>(defaultState.values);
  const [bookData, setBookData] = useState<IBook | null>(defaultState.bookData);
  const [bookList, setBookList] = useState<IBook[] | null>(
    defaultState.bookList
  );
  const { errors, validate } = useValidation(defaultState.errors);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);

  //* to handle Input Change
  //* @param e: React.ChangeEvent<HTMLInputElement> - event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  //* to handle Checkbox Change
  //* @param e: React.ChangeEvent<HTMLInputElement> - event
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setValues({
      ...values,
      [name]: checked,
    });
  };

  //* to handle Date Input Change
  //* @param newValue: Date | string | null - new value
  //* @param name: string - name of the field
  const handleDateInputChange = (
    newValue: Date | string | null | undefined,
    name: string
  ) => {
    if(newValue) {
      const newItems = { ...values };
      newItems[name] = newValue;
      setValues(newItems);
    }
  };

  //* to reset the form
  const resetForm = () => {
    setValues(defaultState.values);
  };

  const getBooks = async () => {
    setIsLoading(true);

    setTimeout(() => {
      if (bookList === null || bookList.length === 0) {
        setBookList(BOOKS_LIST);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getBook = async (id: string) => {
    setIsLoading(true);
    let book: IBook | undefined;

    setTimeout(() => {
      if (bookList !== null) {
        book = bookList.find((book) => book.book_id === id);
      } else {
        book = BOOKS_LIST.find((book) => book.book_id === id);
      }
      setIsLoading(false);
      if (book !== undefined) {
        setBookData(book);
        const newValue = {
          title: book.title,
          author: book.author,
          borrowed_by: book.borrowed_by,
          date_of_borrow: book.date_of_borrow,
          expected_date_of_return: book.expected_date_of_return,
          available: book.available,
        };
        console.log('book', book);
        setValues(previousValues => {
          return {
            ...newValue,
          };
        });
      }
    }, 1000);
  };

  const addBook = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newValue: IBook = {
        book_id: uuid(),
        title: values.title,
        author: values.author,
        borrowed_by: values.borrowed_by,
        date_of_borrow:
          values.date_of_borrow !== null ? values.date_of_borrow : null,
        expected_date_of_return:
          values.expected_date_of_return !== null
            ? values.expected_date_of_return
            : null,
        available: values.available,
      };
      if (bookList) {
        setBookList([...bookList, newValue]);
        navigate(paths.books);
      }
    }, 1000);
  }

  const updateBook = async (id: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const updatedBook: IBook = {
        book_id: id,
        title: values.title,
        author: values.author,
        borrowed_by: values.borrowed_by,
        date_of_borrow:
          values.date_of_borrow !== null ? values.date_of_borrow : null,
        expected_date_of_return:
          values.expected_date_of_return !== null
            ? values.expected_date_of_return
            : null,
        available: values.available,
      };

      let index: number;
      if (bookList !== null) {
        index = bookList.findIndex((book) => book.book_id === id);
      } else {
        index = BOOKS_LIST.findIndex((book) => book.book_id === id);
      }

      const updatedBookList = update(bookList, {
        $splice: [[index, 1, updatedBook]],
      });

      setBookList(updatedBookList);
      navigate(paths.bookDetails + id);
    }, 1000);
  };

  const deleteBook = async (id: string | undefined) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      let index: number;
      if (bookList !== null) {
        index = bookList.findIndex((book) => book.book_id === id);
      } else {
        index = BOOKS_LIST.findIndex((book) => book.book_id === id);
      }

      let updateBookList;
      if (bookList !== null) {
        updateBookList = [...bookList];
      } else {
        updateBookList = [...BOOKS_LIST];
      }

      if (index > -1) {
        updateBookList.splice(index, 1); // * 2nd parameter means remove one item only
      }
      setBookList(updateBookList);

      // * navigate to the listing page
      navigate(paths.books);
    }, 1000);
  };

  const handleBookFormSubmit = (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => {
    if (formType === "Add") {
      addBook();
    } else {
      if (id) {
        updateBook(id);
      }
    }
  };

  useEffect(() => {

    console.log("values", values);
  }, [values]);

  const formContextData = {
    values,
    errors,
    isLoading,
    addBook,  
    getBook,    
    getBooks,  
    updateBook,
    deleteBook,
    bookData,
    bookList,
    handleInputChange,
    resetForm,
    handleBookFormSubmit,
    handleCheckboxChange,
    handleDateInputChange,
  };

  return (
    <BookFormContext.Provider value={formContextData}>
      {children}
    </BookFormContext.Provider>
  );
};

export default BookFormContextProvider;
