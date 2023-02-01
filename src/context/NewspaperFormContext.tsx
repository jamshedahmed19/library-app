import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { v4 as uuid } from "uuid";
// * FUNCS IMPORT
import useValidation from "../utils/hooks/useValidation";
// * UTILS
import { paths } from "../routes/paths";
import { NEWSPAPER_LIST } from "../utils/mockData/newspapers";
import { INewspaper } from "../utils/interfaces/newspaper.interface";

export interface IFormValues {
  [k: string]: string | number | null | Date | boolean | undefined;
  title: string;
  newsContent: string;
  borrowed_by: string;
  date_of_borrow: string | null | Date;
  expected_date_of_return: string | null | Date;
  publishedDate?: string | null | Date;
  language: string;
  available: boolean;
}

export interface IFormErrors {
  title: string;
  newsContent: string;
  publishedDate: string;
  language: string;
  borrowed_by: string;
  date_of_borrow: string;
  expected_date_of_return: string;
}

interface INewspaperFormContextState {
  newspaperData: INewspaper | null;
  newspaperList: INewspaper[] | null;
  isLoading: boolean;
  values: IFormValues;
  errors: IFormErrors;
  resetForm: () => void,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateInputChange: (newValue: Date | string | null | undefined, name: string) => void;
  getNewspapers: () => void;
  addNewspaper: () => void;
  getNewspaper: (id: string) => void;
  updateNewspaper: (id: string) => void;
  deleteNewspaper: (id: string | undefined) => void;
  handleNewspaperFormSubmit: (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => void;
}

const defaultState: INewspaperFormContextState = {
  isLoading: false,
  newspaperList: NEWSPAPER_LIST,
  newspaperData: null,
  values: {
    newspaper_id: "",
    title: "",
    available: false,
    publishedDate: null,
    language: "",
    newsContent: "",
    borrowed_by: "",
    date_of_borrow: null,
    expected_date_of_return: null,
  },
  errors: {
    title: "",
    borrowed_by: "",
    newsContent: "",
    language: "",
    publishedDate: "",
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
  getNewspapers: async () => {},
  addNewspaper: () => {},
  getNewspaper: async (id: string) => {},
  updateNewspaper: async (id: string) => {},
  deleteNewspaper: async (id: string | undefined) => {},
  handleNewspaperFormSubmit: (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => {},
};

export const NewspaperFormContext = createContext<INewspaperFormContextState>(defaultState);

export const NewspaperFormContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [values, setValues] = useState<IFormValues>(defaultState.values);
  const [newspaperData, setNewspaperData] = useState<INewspaper | null>(defaultState.newspaperData);
  const [newspaperList, setNewspaperList] = useState<INewspaper[] | null>(
    defaultState.newspaperList
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

  const getNewspapers = async () => {
    setIsLoading(true);

    setTimeout(() => {
      if (newspaperList === null || newspaperList.length === 0) {
        setNewspaperList(NEWSPAPER_LIST);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getNewspaper = async (id: string) => {
    setIsLoading(true);
    let newspaper: INewspaper | undefined;

    setTimeout(() => {
      if (newspaperList !== null) {
        newspaper = newspaperList.find((newspaper) => newspaper.newspaper_id === id);
      } else {
        newspaper = NEWSPAPER_LIST.find((newspaper) => newspaper.newspaper_id === id);
      }
      setIsLoading(false);
      if (newspaper) {
        setNewspaperData(newspaper);
        const newValue = {
          title: newspaper.title,
          borrowed_by: newspaper.borrowed_by,
          date_of_borrow: newspaper.date_of_borrow,
          expected_date_of_return: newspaper.expected_date_of_return,
          available: newspaper.available,
          publishedDate: newspaper.publishedDate,
          language: newspaper.language,
          newsContent: newspaper.newsContent,
        };
        setValues(newValue);
      }
    }, 1000);
  };

  const addNewspaper = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newValue: INewspaper = {
        newspaper_id: uuid(),
        title: values.title,
        borrowed_by: values.borrowed_by,
        date_of_borrow:
          values.date_of_borrow !== null ? values.date_of_borrow : null,
        expected_date_of_return:
          values.expected_date_of_return !== null
            ? values.expected_date_of_return
            : null,
        publishedDate:
          values.publishedDate !== null
            ? values.publishedDate
            : null,
        available: values.available,
        language: values.language,
        newsContent: values.newsContent
      };
      if (newspaperList) {
        setNewspaperList([...newspaperList, newValue]);
        navigate(paths.newspapers);
      }
    }, 1000);
  };

  const updateNewspaper = async (id: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const updatedNewspaper: INewspaper = {
        newspaper_id: id,
        title: values.title,
        borrowed_by: values.borrowed_by,
        date_of_borrow:
          values.date_of_borrow !== null ? values.date_of_borrow : null,
        expected_date_of_return:
          values.expected_date_of_return !== null
            ? values.expected_date_of_return
            : null,
        publishedDate:
          values.publishedDate !== null ? values.publishedDate : null,
        available: values.available,
        language: values.language,
        newsContent: values.newsContent
      };

      let index: number;
      if (newspaperList !== null) {
        index = newspaperList.findIndex((newspaper) => newspaper.newspaper_id === id);
      } else {
        index = NEWSPAPER_LIST.findIndex((newspaper) => newspaper.newspaper_id === id);
      }

      const updatedNewspaperList = update(newspaperList, {
        $splice: [[index, 1, updatedNewspaper]],
      });

      setNewspaperList(updatedNewspaperList);
      navigate(paths.newspaperDetails + id);
    }, 1000);
  };

  const deleteNewspaper = async (id: string | undefined) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      let index: number;
      if (newspaperList !== null) {
        index = newspaperList.findIndex((newspaper) => newspaper.newspaper_id === id);
      } else {
        index = NEWSPAPER_LIST.findIndex((newspaper) => newspaper.newspaper_id === id);
      }

      let updateNewspaperList;
      if (newspaperList !== null) {
        updateNewspaperList = [...newspaperList];
      } else {
        updateNewspaperList = [...NEWSPAPER_LIST];
      }

      if (index > -1) {
        updateNewspaperList.splice(index, 1); // * 2nd parameter means remove one item only
      }
      setNewspaperList(updateNewspaperList);

      // * navigate to the listing page
      navigate(paths.documentaries);
    }, 1000);
  };

  const handleNewspaperFormSubmit = (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => {
    if (formType === "Add") {
      addNewspaper();
    } else {
      if (id) {
        updateNewspaper(id);
      }
    }
  };

  const formContextData = {
    values,
    errors,
    isLoading,   
    addNewspaper,  
    getNewspaper,   
    getNewspapers,
    updateNewspaper,
    deleteNewspaper,
    newspaperData,
    newspaperList,
    handleInputChange,
    resetForm,
    handleNewspaperFormSubmit,
    handleCheckboxChange,
    handleDateInputChange,
  };

  return (
    <NewspaperFormContext.Provider value={formContextData}>
      {children}
    </NewspaperFormContext.Provider>
  );
};

export default NewspaperFormContextProvider;
