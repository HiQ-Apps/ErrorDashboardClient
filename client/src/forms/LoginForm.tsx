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
import type { ServerError } from "shared/types/extra";
import { parseServerError } from "shared/utils/parseString";

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
        dispatch(setToken(data.accessToken));
        dispatch(setUser(data.user));
        dispatch(setProfile(data.userProfile));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        const err = error as ServerError;
        const message = parseServerError(err);
        toast({
          title: "Failed to Login",
          description: message,
        });
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
      <div className="w-full">
        <BaseButton
          onClick={handleLoginClick}
          variant="accent"
          overrideStyles="w-full"
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
      </div>
    </form>
  );
};

export default LoginForm;
