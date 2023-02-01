import { useState } from 'react';
import { fieldNames } from '../constants/formConstants';
import {
  validateName,
  isRequired
} from '../helperfunctions/validations';

const useValidation = (values: any) => {
  const [errors, setErrors] = useState(values);
  const [error] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.title in fieldValues) {
      temp.title = validateName(fieldValues.title);
    }

    if (fieldNames.author in fieldValues) {
      temp.author = validateName(fieldValues.author);
    }

    if (fieldNames.directed_by in fieldValues) {
      temp.directed_by = validateName(fieldValues.directed_by);
    }

    if (fieldNames.language in fieldValues) {
      temp.language = isRequired(fieldValues.language);
    }

    if (fieldNames.genre in fieldValues) {
      temp.genre = isRequired(fieldValues.genre);
    }

    setErrors({
      ...temp
    });

    return Object.values(temp).every((x) => x === '');
  };
  return {
    error,
    validate,
    errors,
    setErrors
  };
};

export default useValidation;