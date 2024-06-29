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
      { service_name: "", environment_type: "" },
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
        <Label htmlFor="environment_type" text="Environment Type" />
        <Input
          type="text"
          name="environment_type"
          value={form.environment_type}
          onChange={handleChange}
        />
        {errors.errorMessages.environment_type && (
          <span className="text-error text-sm">
            {errors.errorMessages.environment_type}
          </span>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="service_name" text="Service Name" />
        <Input
          type="text"
          name="service_name"
          value={form.service_name}
          onChange={handleChange}
        />
        {errors.errorMessages.service_name && (
          <span className="text-error text-sm">
            {errors.errorMessages.service_name}
          </span>
        )}
      </div>
      <BaseButton
        size="sm"
        onClick={handleCreateNamespaceClick}
        variant="accent"
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
