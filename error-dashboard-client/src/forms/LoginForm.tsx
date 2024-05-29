import { useLoginMutation } from "features/userApiSlice";
import { type FormEvent, useEffect } from "react";
import { LoginSchema, loginSchema } from "schemas/loginSchema";
import useForm from "hooks/useForm";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const { form, handleChange, validate, errors } = useForm<LoginSchema>(
    { email: "", password: "" },
    loginSchema
  );

  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const handleLoginClick = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        login(form).unwrap();
      } catch (err) {
        console.error("Failed to login:", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleLoginClick}>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.email && (
          <span className="text-error text-sm">
            {errors.errorMessages.email}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.password && (
          <span className="text-error text-sm">
            {errors.errorMessages.password}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="border border-transparent bg-success text-white justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2"
      >
        {isLoading ? "Logging In..." : "Login"}
      </button>
      {isSuccess && (
        <p className="text-success py-2 text-sm">Login Successful!</p>
      )}
    </form>
  );
};

export default LoginForm;
