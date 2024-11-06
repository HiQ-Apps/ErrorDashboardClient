import { useParams } from "react-router-dom";
import type { FormEvent, ChangeEvent } from "react";
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";

import { UpdateIcon } from "@radix-ui/react-icons";
import { useResetPasswordMutation } from "features/userApiSlice";
import {
  type ForgotPasswordSchema,
  forgotPasswordSchema,
} from "schemas/forgotPasswordSchema";
import useForm from "hooks/useForm";

const ForgotPasswordForm = () => {
  const { id } = useParams();
  const { toast } = useToast();

  if (!id) {
    throw new Error("Error ID is required for password reset");
  }

  const { form, setForm, handleChange, validate, errors } =
    useForm<ForgotPasswordSchema>(
      {
        email: "",
        password: "",
        confirmPassword: "",
      },
      forgotPasswordSchema
    );

  const [resetPassword, { isSuccess, isLoading, isError, error }] =
    useResetPasswordMutation();

  const handleResetPasswordClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await resetPassword({
          id: id,
          email: form.email,
          password: form.password,
        }).unwrap();
        toast({
          title: `Password reset successfully`,
        });
      } catch (err) {
        toast({
          title: "Failed to reset password",
        });
      }
    }
  };

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
          value={form.password}
          name="password"
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
          id="confirmPassword"
          type="password"
          value={form.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />
        {errors.errorMessages.confirmPassword && (
          <span className="text-error text-sm">
            {errors.errorMessages.confirmPassword}
          </span>
        )}
      </div>
      <BaseButton
        onClick={handleResetPasswordClick}
        variant="accent"
        overrideStyles="w-full"
        content={
          isSuccess ? (
            "Success"
          ) : isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            "Reset Password"
          )
        }
      />
    </form>
  );
};

export default ForgotPasswordForm;
