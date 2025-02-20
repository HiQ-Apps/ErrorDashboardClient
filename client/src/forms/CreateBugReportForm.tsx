import { type FormEvent } from "react";

import { useCreateBugReportMutation } from "features/bugReportApiSlice";
import { useToast } from "components/ui/use-toast";
import { Textarea } from "components/ui/textarea";
import { Input, Label, BaseButton } from "components/base";
import useForm from "hooks/useForm";
import { UpdateIcon } from "@radix-ui/react-icons";
import {
  createBugReportSchema,
  type CreateBugReportSchema,
} from "schemas/createBugReportSchema";

const CreateBugReportForm = () => {
  const { toast } = useToast();

  const { form, handleChange, validate, errors } =
    useForm<CreateBugReportSchema>(
      { issue: "", description: "" },
      createBugReportSchema
    );

  const [createBugReport, { isSuccess, isLoading }] =
    useCreateBugReportMutation();

  const handleCreateBugReportClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await createBugReport(form).unwrap();
        toast({
          title: "Bug Report created successfully",
          description:
            "Thank you for your feedback! We take your feedback seriously and will review it soon.",
        });
      } catch (err) {
        toast({
          title: "Failed to create Bug Report",
          description: "Please try again",
        });
      }
    }
  };

  return (
    <form>
      <div className="flex flex-col space-y-4">
        <Label htmlFor="issue" text="Issue" />
        <Input
          type="text"
          name="issue"
          value={form.issue}
          onChange={handleChange}
        />
        {errors.errorMessages.issue && (
          <span className="text-error text-sm">
            {errors.errorMessages.issue}
          </span>
        )}
        <Label htmlFor="description" text="Description" />
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the issue you are facing"
        />
        {errors.errorMessages.description && (
          <span className="text-error text-sm">
            {errors.errorMessages.description}
          </span>
        )}
        <BaseButton
          onClick={handleCreateBugReportClick}
          variant="accent"
          overrideStyles="py-2 px-3"
          content={
            isSuccess ? (
              "Success"
            ) : isLoading ? (
              <UpdateIcon className="animate-ease-in-out-rotation" />
            ) : (
              "Send bug report!"
            )
          }
        />
      </div>
    </form>
  );
};

export default CreateBugReportForm;
