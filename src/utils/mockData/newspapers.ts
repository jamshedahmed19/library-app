import { v4 as uuid } from "uuid";
import { INewspaper } from "../interfaces/newspaper.interface";

export const NEWSPAPER_LIST: INewspaper[] = [
  {
    newspaper_id: uuid(),
    title: "Wall Street Journal",
    newsContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel viverra ipsum. Nunc placerat sapien ac ligula maximus maximus. Cras bibendum orci in purus venenatis malesuada. Donec hendrerit sit amet justo eu ultricies. Aenean suscipit ultrices magna, eget mattis sem tempor quis. In hac habitasse platea dictumst. Proin luctus erat in velit feugiat, sed pulvinar leo suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pretium justo ac ligula vehicula molestie. Duis a eros eu mauris consectetur finibus id in lectus. Duis ullamcorper posuere congue. Quisque orci massa, pretium sed viverra id, imperdiet vitae turpis. Vestibulum a volutpat sapien. Aenean commodo volutpat maximus.",
    available: true,
    language: "English",
    publishedDate: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    borrowed_by: "Hammad",
    date_of_borrow: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    expected_date_of_return: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
  },
  {
    newspaper_id: uuid(),
    title: "New York Times",
    newsContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel viverra ipsum. Nunc placerat sapien ac ligula maximus maximus. Cras bibendum orci in purus venenatis malesuada. Donec hendrerit sit amet justo eu ultricies. Aenean suscipit ultrices magna, eget mattis sem tempor quis. In hac habitasse platea dictumst. Proin luctus erat in velit feugiat, sed pulvinar leo suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pretium justo ac ligula vehicula molestie. Duis a eros eu mauris consectetur finibus id in lectus. Duis ullamcorper posuere congue. Quisque orci massa, pretium sed viverra id, imperdiet vitae turpis. Vestibulum a volutpat sapien. Aenean commodo volutpat maximus.",
    available: false,
    language: "English",
    publishedDate: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    borrowed_by: "Ali",
    date_of_borrow: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
    expected_date_of_return: "Mon May 16 2022 20:18:08 GMT+0500 (Pakistan Standard Time)",
  },
];
