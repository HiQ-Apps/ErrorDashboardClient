import { useParams } from "react-router-dom";
import { type FormEvent, useEffect } from "react";
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";

import { createTagSchema, type CreateTagSchema } from "schemas/createTagSchema";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useCreateTagMutation } from "features/tagApiSlice";
import useForm from "hooks/useForm";

interface CreateTagFormProps {
  onClose: () => void;
}

const CreateTagForm = ({ onClose }: CreateTagFormProps) => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Error ID is required for tag manager");
  }

  const { toast } = useToast();

  const { form, handleChange, validate, errors } = useForm<CreateTagSchema>(
    { tag_key: "", tag_value: "", error_id: id },
    createTagSchema
  );

  const [createTag, { isSuccess, isError, isLoading }] = useCreateTagMutation();

  const handleCreateTagClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await createTag(form).unwrap();
      } catch (err) {
        console.error("Failed to create tag:", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Tag created successfully",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to create tag",
        description: "Please try again",
      });
    }
  }, [isError]);

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="tag_key" text="Key" />
        <Input
          type="text"
          name="tag_key"
          value={form.tag_key}
          onChange={handleChange}
        />
        {errors.errorMessages.tag_key && (
          <span className="text-error text-sm">
            {errors.errorMessages.tag_key}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="tag_value" text="Value" />
        <Input
          type="text"
          name="tag_value"
          value={form.tag_value}
          onChange={handleChange}
        />
        {errors.errorMessages.tag_value && (
          <span className="text-error text-sm">
            {errors.errorMessages.tag_value}
          </span>
        )}
      </div>
      <BaseButton
        size="sm"
        onClick={handleCreateTagClick}
        variant="success"
        content={
          isSuccess ? (
            "Success"
          ) : isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            "Create Tag"
          )
        }
      />
    </form>
  );
};

export default CreateTagForm;
