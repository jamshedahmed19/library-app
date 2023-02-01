import {v4 as uuid} from 'uuid';
import { IDocumentary } from "../interfaces/documentaries.interface";

export const DOCUMENTARY_LIST: IDocumentary[] = [
  {
    documentary_id: uuid(),
    title: "Night and Fog",
    available: true,
    directed_by: "Alain Resnais",
    language: "English",
    genre: "History",
    publishedDate: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    borrowed_by: "Hammad",
    date_of_borrow: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    expected_date_of_return: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
  },
  {
    documentary_id: uuid(),
    title: "Primary",
    available: false,
    directed_by: "Robert Drew",
    language: "English",
    genre: "History",
    publishedDate: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    borrowed_by: "Ali",
    date_of_borrow: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    expected_date_of_return: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
  },
];