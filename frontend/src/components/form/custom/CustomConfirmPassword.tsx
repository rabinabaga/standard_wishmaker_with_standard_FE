import { useFormContext } from "react-hook-form";
interface Props {
    defaultValue?: string;
}

const ConfirmPassword: React.FC<Props> = ({ defaultValue }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    const password = watch("password");

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-1">
                Password
                <input
                    type="password"
                    defaultValue={defaultValue}
                    className="py-4 px-2 rounded-md border border-1 border-black-light"
                    placeholder="Type a Password"
                    {...register("password", { required: "This field is required" })}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password.message?.toString()}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                Confirm Password
                <input
                    type="password"
                    defaultValue={defaultValue}
                    className="py-4 px-2 rounded-md border border-1 border-black-light"
                    placeholder="Confirm Password"
                    {...register("confirm_password", {
                        required: "This field is required",
                        validate: (value) => value === password || "Password do not match",
                    })}
                />
                {errors.confirm_password && (
                    <span className="text-red-500 text-sm">
                        {errors.confirm_password.message?.toString()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ConfirmPassword;