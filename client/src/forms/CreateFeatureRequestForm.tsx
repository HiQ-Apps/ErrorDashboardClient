import { type FormEvent } from "react";
import { useToast } from "components/ui/use-toast";

import { Input, Label, BaseButton } from "components/base";
import {
  createFeatureRequestSchema,
  type CreateFeatureRequestSchema,
} from "schemas/createFeatureRequestSchema";
import useForm from "hooks/useForm";
import { useCreateFeatureRequestMutation } from "features/featureRequestApiSlice";
import { UpdateIcon } from "@radix-ui/react-icons";

const CreateFeatureRequestForm = () => {
  const { toast } = useToast();

  const { form, handleChange, validate, errors } =
    useForm<CreateFeatureRequestSchema>(
      { title: "", description: "" },
      createFeatureRequestSchema
    );

  const [createFeatureRequest, { isSuccess, isLoading }] =
    useCreateFeatureRequestMutation();

  const handleCreateFeatureRequestClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await createFeatureRequest(form).unwrap();
        toast({
          title: "Feature Request created successfully",
          description:
            "Thank you for your feedback! We take your feedback seriously and will review it soon.",
        });
      } catch (err) {
        toast({
          title: "Failed to create Feature Request",
          description: "Please try again",
        });
      }
    }
  };

  return (
    <form>
      <div className="flex flex-col space-y-4">
        <Label htmlFor="title" text="Feature" />
        <Input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.errorMessages.title && (
          <span className="text-error text-sm">
            {errors.errorMessages.title}
          </span>
        )}
        <Label htmlFor="description" text="Description" />
        <Input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.errorMessages.description && (
          <span className="text-error text-sm">
            {errors.errorMessages.description}
          </span>
        )}
        <BaseButton
          onClick={handleCreateFeatureRequestClick}
          variant="accent"
          overrideStyles="my-2 px-3"
          content={
            isSuccess ? (
              "Success"
            ) : isLoading ? (
              <UpdateIcon className="animate-ease-in-out-rotation" />
            ) : (
              "Create Feature Request"
            )
          }
        />
      </div>
    </form>
  );
};

export default CreateFeatureRequestForm;
