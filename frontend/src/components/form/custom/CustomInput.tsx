import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: string;
  name: string;
  placeHolder: string;
  type: string;
  required?: boolean;
  label:string
}

const CustomInput: React.FC<Props> = ({
  defaultValue,
  name,
  placeHolder,
  type,
  required,
  label
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const validationRules: {
    [key: string]: string | { value: RegExp; message: string };
  } = {};

  if (required) {
    validationRules.required = "This field is required";
  }

  if (type === "email") {
    validationRules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    };
  }

  return (
    <div className="flex flex-col gap-1">
      <p>{label} </p>
      <input
        type={type}
        className="py-4 px-2 rounded"
        placeholder={placeHolder}        style={{ width: "492px" }}
        {...register(name, validationRules)}
      />
      {required && errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
    
  );
};

export default CustomInput;
