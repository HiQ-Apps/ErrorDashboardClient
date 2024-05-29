import { type FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  registrationSchema,
  type RegistrationSchema,
} from "schemas/registrationSchema";
import useForm from "src/hooks/useForm";
import { setUser, setToken, setIsAuthenticated } from "features/authSlice";
import { useRegisterMutation } from "features/userApiSlice";

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const dispatch = useDispatch();
  const { form, handleChange, validate, errors } = useForm<RegistrationSchema>(
    { email: "", username: "", password: "", confirmPassword: "" },
    registrationSchema
  );

  const [register, { data, isSuccess, isLoading }] = useRegisterMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await register(form).unwrap();
      } catch (err) {
        console.error("Failed to register:", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setToken(data.access_token));
        dispatch(setUser(data.user));
        dispatch(setIsAuthenticated(true));
        onClose();
      }, 100);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
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
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.username && (
          <span className="text-error text-sm">
            {errors.errorMessages.username}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.password && (
          <span className="text-error text-sm">
            {errors.errorMessages.password}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.confirmPassword && (
          <span className="text-error text-sm">
            {errors.errorMessages.confirmPassword}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="border border-transparent bg-success text-white justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {isSuccess && (
        <p className="text-success py-2 text-sm">Registration successful!</p>
      )}
    </form>
  );
};

export default RegistrationForm;
