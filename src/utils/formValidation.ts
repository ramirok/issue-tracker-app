import { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
  required?: { value: boolean; message: string };
  pattern?: { value: string; message: string };
  custom?: { isValid: (value: string) => boolean; message: string };
}
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;
type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange =
    (key: keyof T) =>
    (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      setData((prevState) => ({ ...prevState, [key]: value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<any> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        //   REQUIRED
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        // PATTERN
        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        // CUSTOM
        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return { data, setData, handleChange, handleSubmit, errors };
};
