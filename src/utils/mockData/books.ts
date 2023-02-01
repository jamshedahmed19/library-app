import {v4 as uuid} from 'uuid';
import { IBook } from "../interfaces/book.interface";

export const BOOKS_LIST: IBook[] = [
  {
    book_id: uuid(),
    title: "The Lord of the Rings",
    available: true,
    author: "J.R.R. Tolkien",
    borrowed_by: "Hammad",
    date_of_borrow: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    expected_date_of_return: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
  },
  {
    book_id: uuid(),
    title: "The Hobbit",
    available: false,
    author: "J.R.R. Tolkien",
    borrowed_by: "Ali",
    date_of_borrow: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    expected_date_of_return: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
  },
];