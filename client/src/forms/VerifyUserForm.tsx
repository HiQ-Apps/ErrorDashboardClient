import { useToast } from "components/ui/use-toast";
import {
  type VerifyUserSchema,
  verifyUserSchema,
} from "schemas/verifyUserSchema";
import useForm from "hooks/useForm";
import { BaseButton, Input, Label } from "components/base";
import { type ButtonClickEvent } from "shared/types/extra";
import { PasswordType } from "shared/context/modalHandlerContext";

interface VerifyUserFormProps {
  onConfirm: ({ password }: PasswordType) => void;
}

const VerifyUserForm = ({ onConfirm }: VerifyUserFormProps) => {
  const { toast } = useToast();

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
    <div className="flex flex-col">
      <h1>Verify User</h1>
      <form>
        <Label htmlFor="password" text="Password" />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          override_styles={
            errors.errorMessages.password ? "border-red-500" : ""
          }
        />
        {errors.errorMessages.password && (
          <p className="text-red-500 text-xs italic">
            {errors.errorMessages.password}
          </p>
        )}
        <BaseButton
          variant="success"
          size="sm"
          onClick={handleSubmit}
          content="Verify"
        />
      </form>
    </div>
  );
};

export default VerifyUserForm;
