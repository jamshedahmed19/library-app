import Dashboard from "../pages/dashboard";
import Books from "../pages/books";
import BookDetails from "../pages/bookDetails.tsx";
import AddEditBookForm from "../sections/AddEditBookForm";
import Documentaries from "../pages/documentaries";
import DocumentaryDetails from "../pages/documentariesDetails.tsx";
import AddEditDocumentaryForm from "../sections/AddEditDocumentaryForm";
import AddEditNewspaperForm from "../sections/AddEditNewspaperForm";
import NewspaperDetails from "../pages/newspaperDetails.tsx";
import Newspapers from "../pages/newspapers";

export const paths = {
  dashboard: "/",
  newspapers: "/newspapers",
  addNewspaper: "/add-newspaper",
  editNewspaper: "/edit-newspaper/",
  newspaperDetails: "/newspapers-details/",
  documentaries: "/documentaries",
  addDocumentary: "/add-documentary",
  editDocumentary: "/edit-documentary/",
  documentaryDetails: "/documentary-details/",
  books: "/books",
  bookDetails: "/book-details/",
  addBook: "/add-book/",
  editBook: "/edit-book/",
  error: "*",
};

export const routes = {
  dashboard: '/',
  newspapers: "/newspapers",
  addNewspaper: "/add-newspaper",
  editNewspaper: "/edit-newspaper/:id",
  newspaperDetails: "/newspapers-details/:id",
  documentaries: "/documentaries",
  addDocumentary: "/add-documentary",
  editDocumentary: "/edit-documentary/:id",
  documentaryDetails: "/documentary-details/:id",
  books: "/books",
  bookDetails: "/book-details/:id",
  addBook: "/add-book/",
  editBook: "/edit-book/:id",
  error: "*",
};

export const publicRoutes = {
  [paths.dashboard]: {
    name: "Dashboard",
    path: routes.dashboard,
    component: <Dashboard />,
  },
  [paths.books]: {
    name: "Books",
    path: routes.books,
    component: <Books />,
  },
  [paths.bookDetails]: {
    name: "Book Details",
    path: routes.bookDetails,
    component: <BookDetails />,
  },
  [paths.addBook]: {
    name: "Add Book",
    path: routes.addBook,
    component: <AddEditBookForm formType="Add"/>,
  },
  [paths.editBook]: {
    name: "Edit Book",
    path: routes.editBook,
    component: <AddEditBookForm formType="Edit"/>,
  },
  [paths.documentaries]: {
    name: "Documentaries",
    path: routes.documentaries,
    component: <Documentaries />,
  },
  [paths.documentaryDetails]: {
    name: "Documentary Details",
    path: routes.documentaryDetails,
    component: <DocumentaryDetails />,
  },
  [paths.addDocumentary]: {
    name: "Add Documentary",
    path: routes.addDocumentary,
    component: <AddEditDocumentaryForm formType="Add"/>,
  },
  [paths.editDocumentary]: {
    name: "Edit Documentary",
    path: routes.editDocumentary,
    component: <AddEditDocumentaryForm formType="Edit"/>,
  },
  [paths.newspapers]: {
    name: "Newspaper",
    path: routes.newspapers,
    component: <Newspapers />,
  },
  [paths.newspaperDetails]: {
    name: "Newspaper Details",
    path: routes.newspaperDetails,
    component: <NewspaperDetails />,
  },
  [paths.addNewspaper]: {
    name: "Add Newspaper",
    path: routes.addNewspaper,
    component: <AddEditNewspaperForm formType="Add"/>,
  },
  [paths.editNewspaper]: {
    name: "Edit Newspaper",
    path: routes.editNewspaper,
    component: <AddEditNewspaperForm formType="Edit"/>,
  },
};
