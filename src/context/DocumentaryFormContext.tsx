import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { v4 as uuid } from "uuid";
// * FUNCS IMPORT
import useValidation from "../utils/hooks/useValidation";
// * UTILS
import { paths } from "../routes/paths";
import { IDocumentary } from "../utils/interfaces/documentaries.interface";
import { DOCUMENTARY_LIST } from "../utils/mockData/documentaries";

export interface IFormValues {
  [k: string]: string | number | null | Date | boolean | undefined;
  title: string;
  directed_by: string;
  borrowed_by: string;
  date_of_borrow: string | null | Date;
  expected_date_of_return: string | null | Date;
  publishedDate?: string | null | Date;
  genre: string;
  language: string;
  available: boolean;
}

export interface IFormErrors {
  title: string;
  directed_by: string;
  genre: string;
  publishedDate: string;
  language: string;
  borrowed_by: string;
  date_of_borrow: string;
  expected_date_of_return: string;
}

interface IDocumentaryFormContextState {
  documentaryData: IDocumentary | null;
  documentaryList: IDocumentary[] | null;
  isLoading: boolean;
  values: IFormValues;
  errors: IFormErrors;
  resetForm: () => void,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateInputChange: (newValue: Date | string | null | undefined, name: string) => void;
  getDocumentaries: () => void;
  addDocumentary: () => void;
  getDocumentary: (id: string) => void;
  updateDocumentary: (id: string) => void;
  deleteDocumentary: (id: string | undefined) => void;
  handleDocumentaryFormSubmit: (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => void;
}

const defaultState: IDocumentaryFormContextState = {
  isLoading: false,
  documentaryList: DOCUMENTARY_LIST,
  documentaryData: null,
  values: {
    documentary_id: "",
    title: "",
    available: false,
    publishedDate: null,
    genre: "",
    language: "",
    directed_by: "",
    borrowed_by: "",
    date_of_borrow: null,
    expected_date_of_return: null,
  },
  errors: {
    title: "",
    borrowed_by: "",
    date_of_borrow: "",
    expected_date_of_return: "",
    publishedDate: "",
    genre: "",
    language: "",
    directed_by: "",
  },
  resetForm: () => {},
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleDateInputChange: (
    newValue: Date | string | null | undefined,
    name: string
  ) => {},
  getDocumentaries: async () => {},
  addDocumentary: () => {},
  getDocumentary: async (id: string) => {},
  updateDocumentary: async (id: string) => {},
  deleteDocumentary: async (id: string | undefined) => {},
  handleDocumentaryFormSubmit: (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => {},
};

export const DocumentaryFormContext = createContext<IDocumentaryFormContextState>(defaultState);

export const DocumentaryFormContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [values, setValues] = useState<IFormValues>(defaultState.values);
  const [documentaryData, setDocumentaryData] = useState<IDocumentary | null>(defaultState.documentaryData);
  const [documentaryList, setDocumentaryList] = useState<IDocumentary[] | null>(
    defaultState.documentaryList
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

  const getDocumentaries = async () => {
    setIsLoading(true);

    setTimeout(() => {
      if (documentaryList === null || documentaryList.length === 0) {
        setDocumentaryList(DOCUMENTARY_LIST);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getDocumentary = async (id: string) => {
    setIsLoading(true);
    let documentary: IDocumentary | undefined;

    setTimeout(() => {
      if (documentaryList !== null) {
        documentary = documentaryList.find((documentary) => documentary.documentary_id === id);
      } else {
        documentary = DOCUMENTARY_LIST.find((documentary) => documentary.documentary_id === id);
      }
      setIsLoading(false);
      if (documentary) {
        setDocumentaryData(documentary);
        const newValue = {
          title: documentary.title,
          directed_by: documentary.directed_by,
          borrowed_by: documentary.borrowed_by,
          date_of_borrow: documentary.date_of_borrow,
          expected_date_of_return: documentary.expected_date_of_return,
          available: documentary.available,
          publishedDate: documentary.publishedDate,
          genre: documentary.genre,
          language: documentary.language,
        };
        setValues(newValue);
      }
    }, 1000);
  };

  const addDocumentary = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newValue: IDocumentary = {
        documentary_id: uuid(),
        title: values.title,
        directed_by: values.directed_by,
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
        genre: values.genre,
        language: values.language,
      };
      if (documentaryList) {
        setDocumentaryList([...documentaryList, newValue]);
        navigate(paths.documentaries);
      }
    }, 1000);
  };

  const updateDocumentary = async (id: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const updatedDocumentary: IDocumentary = {
        documentary_id: id,
        title: values.title,
        directed_by: values.directed_by,
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
        genre: values.genre,
        language: values.language,
      };

      let index: number;
      if (documentaryList !== null) {
        index = documentaryList.findIndex((documentary) => documentary.documentary_id === id);
      } else {
        index = DOCUMENTARY_LIST.findIndex((documentary) => documentary.documentary_id === id);
      }

      const updatedDocumentaryList = update(documentaryList, {
        $splice: [[index, 1, updatedDocumentary]],
      });

      setDocumentaryList(updatedDocumentaryList);
      navigate(paths.documentaryDetails + id)
    }, 1000);
  };

  const deleteDocumentary = async (id: string | undefined) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      let index: number;
      if (documentaryList !== null) {
        index = documentaryList.findIndex((documentary) => documentary.documentary_id === id);
      } else {
        index = DOCUMENTARY_LIST.findIndex((documentary) => documentary.documentary_id === id);
      }

      let updateDocumentaryList;
      if (documentaryList !== null) {
        updateDocumentaryList = [...documentaryList];
      } else {
        updateDocumentaryList = [...DOCUMENTARY_LIST];
      }

      if (index > -1) {
        updateDocumentaryList.splice(index, 1); // * 2nd parameter means remove one item only
      }
      setDocumentaryList(updateDocumentaryList);

      // * navigate to the listing page
      navigate(paths.documentaries);
    }, 1000);
  };

  const handleDocumentaryFormSubmit = (
    formType: "Add" | "Edit",
    id: string | undefined
  ) => {
    if (formType === "Add") {
      addDocumentary();
    } else {
      if (id) {
        updateDocumentary(id);
      }
    }
  };

  const formContextData = {
    values,
    errors,
    isLoading,   
    addDocumentary,  
    getDocumentary,   
    getDocumentaries,
    updateDocumentary,
    deleteDocumentary,
    documentaryData,
    documentaryList,
    handleInputChange,
    resetForm,
    handleDocumentaryFormSubmit,
    handleCheckboxChange,
    handleDateInputChange,
  };

  return (
    <DocumentaryFormContext.Provider value={formContextData}>
      {children}
    </DocumentaryFormContext.Provider>
  );
};

export default DocumentaryFormContextProvider;
