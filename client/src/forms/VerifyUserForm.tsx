import { useToast } from "components/ui/use-toast";
import {
  type VerifyUserSchema,
  verifyUserSchema,
} from "schemas/verifyUserSchema";
import useForm from "hooks/useForm";
import BaseButton from "components/base/Button/Button";
import { type ButtonClickEvent } from "shared/types/extra";

interface VerifyUserFormProps {
  onClose: () => void;
  onConfirm: (credentials: { password: string }) => void;
}

const VerifyUserForm = ({ onClose, onConfirm }: VerifyUserFormProps) => {
  const { toast } = useToast();

  const { form, handleChange, validate, errors } = useForm<VerifyUserSchema>(
    { password: "" },
    verifyUserSchema
  );

  const handleSubmit = async (event: ButtonClickEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        onConfirm(form);
        onClose();
      } catch (err) {
        toast({
          title: "Error Verifying User",
          description: `Please try again`,
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Verify User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Confirm Password"
          className={`mt-2 p-2 border rounded w-full ${
            errors.errorMessages.password ? "border-red-500" : ""
          }`}
        />
        {errors.errorMessages.password && (
          <p className="text-red-500 text-xs italic">
            {errors.errorMessages.password}
          </p>
        )}
        <BaseButton
          variant="success"
          size="sm"
          content="Verify User"
          onClick={handleSubmit}
          override_styles="my-4"
        />
      </form>
    </div>
  );
};

export default VerifyUserForm;
