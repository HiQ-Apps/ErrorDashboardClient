import { type FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";

import { BaseButton, Input, Label } from "components/base";
import {
  registrationSchema,
  type RegistrationSchema,
} from "schemas/registrationSchema";
import useForm from "src/hooks/useForm";
import {
  setUser,
  setToken,
  setIsAuthenticated,
  setProfile,
} from "features/authSlice";
import { useRegisterMutation } from "features/userApiSlice";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useToast } from "components/ui/use-toast";

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { form, handleChange, validate, errors } = useForm<RegistrationSchema>(
    { email: "", username: "", password: "", confirmPassword: "" },
    registrationSchema
  );

  const [register, { data, isSuccess, isLoading, isError }] =
    useRegisterMutation();

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
      dispatch(setToken(data.accessToken));
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
      dispatch(setProfile(data.userProfile));
      onClose();
      toast({
        title: "Registration successful",
        description: `Welcome, ${form.username}`,
      });
    } else if (isError) {
      onClose();
      toast({
        title: "Error Registering User",
        description: "Please check the form and try again",
      });
    }
  }, [isSuccess, isError]);

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="email" text="Email" />
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.errorMessages.email && (
          <span className="text-error text-sm">
            {errors.errorMessages.email}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="username" text="Username" />
        <Input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.errorMessages.username && (
          <span className="text-error text-sm">
            {errors.errorMessages.username}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="password" text="Password" />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.errorMessages.password && (
          <span className="text-error text-sm">
            {errors.errorMessages.password}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="confirmPassword" text="Confirm Password" />
        <Input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.errorMessages.confirmPassword && (
          <span className="text-error text-sm">
            {errors.errorMessages.confirmPassword}
          </span>
        )}
      </div>
      <div className="w-full space-y-2">
        <BaseButton
          onClick={handleSubmit}
          overrideStyles="w-full"
          variant="accent"
          content={
            isSuccess ? (
              "Success"
            ) : isLoading ? (
              <UpdateIcon className="animate-ease-in-out-rotation" />
            ) : (
              "Register"
            )
          }
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
