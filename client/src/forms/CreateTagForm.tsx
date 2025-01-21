import { useParams } from "react-router-dom";
import { type FormEvent, useEffect, useState } from "react";
import { useToast } from "components/ui/use-toast";

import { Input, Label, BaseButton } from "components/base";
import { createTagSchema, type CreateTagSchema } from "schemas/createTagSchema";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useCreateTagMutation } from "features/tagApiSlice";
import { ColorSelector } from "components/composite";
import useForm from "hooks/useForm";

interface CreateTagFormProps {
  onClose: () => void;
}

const CreateTagForm = ({ onClose }: CreateTagFormProps) => {
  const [tagColor, setTagColor] = useState("");
  const { id } = useParams();

  if (!id) {
    throw new Error("Error ID is required for tag manager");
  }

  const { toast } = useToast();

  const { form, setForm, handleChange, validate, errors } =
    useForm<CreateTagSchema>(
      { tagKey: "", tagValue: "", errorId: id, tagColor: tagColor },
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
    setForm((prevForm) => ({ ...prevForm, tagColor: tagColor }));
  }, [tagColor]);

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
        <Label htmlFor="tagKey" text="Key" />
        <Input
          type="text"
          name="tagKey"
          value={form.tagKey}
          onChange={handleChange}
        />
        {errors.errorMessages.tagKey && (
          <span className="text-error text-sm">
            {errors.errorMessages.tagKey}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="tagValue" text="Value" />
        <Input
          type="text"
          name="tagValue"
          value={form.tagValue}
          onChange={handleChange}
        />
        {errors.errorMessages.tagValue && (
          <span className="text-error text-sm">
            {errors.errorMessages.tagValue}
          </span>
        )}
      </div>
      <ColorSelector selectedColor={tagColor} setColor={setTagColor} />
      <BaseButton
        size="sm"
        onClick={handleCreateTagClick}
        variant="accent"
        overrideStyles="my-2 px-3"
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
