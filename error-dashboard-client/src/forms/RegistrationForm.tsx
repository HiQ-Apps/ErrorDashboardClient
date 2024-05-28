import { type FormEvent } from "react";
import {
  registrationSchema,
  type RegistrationSchema,
} from "schemas/registrationSchema";
import useForm from "src/hooks/useForm";
import { useRegisterMutation } from "features/userSlice";

const RegistrationForm = () => {
  const { form, handleChange, validate, errors } = useForm<RegistrationSchema>(
    { email: "", password: "", confirmPassword: "" },
    registrationSchema
  );

  const [register] = useRegisterMutation();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      register(form);
    }
  };

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
          <span className="text-red-500 text-sm">
            {errors.errorMessages.email}
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
          <span className="text-red-500 text-sm">
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
          <span className="text-red-500 text-sm">
            {errors.errorMessages.confirmPassword}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="border border-transparent bg-success text-white justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
