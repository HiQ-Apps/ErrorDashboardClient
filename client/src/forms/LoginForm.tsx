import { type FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Input, Label, BaseButton } from "components/base";
import { UpdateIcon } from "@radix-ui/react-icons";
import {
  setIsAuthenticated,
  setToken,
  setUser,
  setProfile,
} from "features/authSlice";
import { useLoginMutation } from "features/userApiSlice";
import { type LoginSchema, loginSchema } from "schemas/loginSchema";
import useForm from "hooks/useForm";
import { useToast } from "components/ui/use-toast";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { form, handleChange, validate, errors } = useForm<LoginSchema>(
    { email: "", password: "" },
    loginSchema
  );

  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const handleLoginClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        const data = await login(form).unwrap();
        dispatch(setToken(data.access_token));
        dispatch(setUser(data.user));
        dispatch(setProfile(data.user_profile));
        dispatch(setIsAuthenticated(true));
      } catch (err) {
        console.error("Failed to login:", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Login successful",
        description: `Welcome back, ${form.email}`,
      });
    }
  }, [isSuccess]);

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="email" text="Email" />
        <Input
          id="email"
          type="email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        {errors.errorMessages.email && (
          <span className="text-error text-sm">
            {errors.errorMessages.email}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="password" text="Password" />
        <Input
          id="password"
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
      <BaseButton
        size="sm"
        onClick={handleLoginClick}
        variant="accent"
        content={
          isSuccess ? (
            "Success"
          ) : isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            "Login"
          )
        }
      />
    </form>
  );
};

export default LoginForm;
