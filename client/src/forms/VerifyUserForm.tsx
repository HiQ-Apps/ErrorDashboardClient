import { useToast } from "components/ui/use-toast";
import { useSelector } from "react-redux";
import { UpdateIcon } from "@radix-ui/react-icons";

import {
  type VerifyUserSchema,
  verifyUserSchema,
} from "schemas/verifyUserSchema";
import useForm from "hooks/useForm";
import { BaseButton, Input, Label } from "components/base";
import { type ButtonClickEvent } from "shared/types/extra";
import { PasswordType } from "shared/context/modalHandlerContext";
import { selectIsLoading } from "features/modalSlice";

interface VerifyUserFormProps {
  onConfirm: ({ password }: PasswordType) => void;
}

const VerifyUserForm = ({ onConfirm }: VerifyUserFormProps) => {
  const { toast } = useToast();
  const isLoading = useSelector(selectIsLoading);

  const { form, handleChange, validate, errors } = useForm<VerifyUserSchema>(
    { password: "" },
    verifyUserSchema
  );

  const handleSubmit = async (event: ButtonClickEvent) => {
    event.preventDefault();
    if (validate()) {
      onConfirm(form);
    } else {
      toast({
        title: "Error Verifying User",
        description: "Please check the form and try again",
      });
    }
  };

  return (
    <form className="flex flex-col space-y-2">
      <h1>Verify User</h1>
      <div className="space-y-2">
        <Label htmlFor="password" text="Password" />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          overrideStyles={errors.errorMessages.password ? "border-red-500" : ""}
        />
        {errors.errorMessages.password && (
          <p className="text-red-500 text-xs italic">
            {errors.errorMessages.password}
          </p>
        )}
        <BaseButton
          variant="accent"
          size="sm"
          overrideStyles="px-3"
          onClick={handleSubmit}
          content={
            isLoading ? (
              <UpdateIcon className="animate-ease-in-out-rotation" />
            ) : (
              "Verify"
            )
          }
        />
      </div>
    </form>
  );
};

export default VerifyUserForm;
