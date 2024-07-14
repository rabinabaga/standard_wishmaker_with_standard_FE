import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: string;
  name: string;
  placeHolder: string;
  type: string;
  required?: boolean;
  styles: string;
  passwordMatch?: (value: string) => void;
  passwordValue?:string
}

const CustomInput: React.FC<Props> = ({
  defaultValue,
  name,
  placeHolder,
  type,
  required,
  styles,
  
}) => {
  const {
    register,
    watch,
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
    <div>
      <input
        type={type}
        className={styles}
        placeholder={placeHolder}
        {...register(name, validationRules)}
      />
      <div>
        {required && errors[name] && (
          <span className="text-red-500 text-sm">
            {errors[name]?.message?.toString()}
          </span>
        )}
      </div>
    </div>



  );
};

export default CustomInput;
