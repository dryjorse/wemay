import { useEffect, useState } from "react";
import { IValidations, useValidation } from "./useValidation";

export const useInput = (initialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    isDirty && setErrorMsg(valid.errorMsg);
  }, [valid.errorMsg, isDirty]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      validations.isSWBL
        ? (e.target.value[0]?.toUpperCase() || "") + e.target.value.slice(1)
        : e.target.value
    );
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
    errorMsg,
  };
};
