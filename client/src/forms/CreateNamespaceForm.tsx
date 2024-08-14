import { type FormEvent, useEffect } from "react";
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";

import { UpdateIcon } from "@radix-ui/react-icons";
import { useCreateNamespaceMutation } from "features/namespaceApiSlice";
import {
  type CreateNamespaceSchema,
  createNamespaceSchema,
} from "schemas/createNamespaceSchema";
import useForm from "hooks/useForm";

interface CreateNamespaceFormProps {
  onClose: () => void;
}

const CreateNamespaceForm = ({ onClose }: CreateNamespaceFormProps) => {
  const { form, handleChange, validate, errors } =
    useForm<CreateNamespaceSchema>(
      { serviceName: "", environmentType: "" },
      createNamespaceSchema
    );

  const { toast } = useToast();

  const [createNamespace, { isSuccess, isError, isLoading }] =
    useCreateNamespaceMutation();

  const handleCreateNamespaceClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await createNamespace(form).unwrap();
      } catch (err) {
        console.error("Failed to create namespace:", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Namespace created successfully",
        description: `Namespace created successfully`,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to create namespace",
        description: "Please try again",
      });
    }
  }, [isError]);

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="environmentType" text="Environment Type" />
        <Input
          type="text"
          name="environmentType"
          value={form.environmentType}
          onChange={handleChange}
        />
        {errors.errorMessages.environmentType && (
          <span className="text-error text-sm">
            {errors.errorMessages.environmentType}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="serviceName" text="Service Name" />
        <Input
          type="text"
          name="serviceName"
          value={form.serviceName}
          onChange={handleChange}
        />
        {errors.errorMessages.serviceName && (
          <span className="text-error text-sm">
            {errors.errorMessages.serviceName}
          </span>
        )}
      </div>
      <BaseButton
        size="sm"
        onClick={handleCreateNamespaceClick}
        variant="accent"
        overrideStyles="px-3"
        content={
          isSuccess ? (
            "Success"
          ) : isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            "Create Namespace"
          )
        }
      />
    </form>
  );
};

export default CreateNamespaceForm;
