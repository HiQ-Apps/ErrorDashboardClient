import { type FormEvent, useEffect } from "react";
import { Input } from "components/ui/input";

import { useCreateNamespaceMutation } from "features/namespaceApiSlice";
import {
  CreateNamespaceSchema,
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

  const [createNamespace, { isSuccess, isLoading }] =
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
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleCreateNamespaceClick}>
      <div className="mb-4">
        <label className="block text-sm font-medium">Environment Type</label>
        <Input
          type="text"
          name="environment_type"
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.environment_type && (
          <span className="text-error text-sm">
            {errors.errorMessages.environment_type}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Service Name</label>
        <Input
          type="text"
          name="service_name"
          onChange={handleChange}
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.errorMessages.service_name && (
          <span className="text-error text-sm">
            {errors.errorMessages.service_name}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="border border-transparent bg-success text-white justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2"
      >
        {isLoading ? "Creating Namespace..." : "Create Namespace"}
      </button>
      {isSuccess && (
        <p className="text-success py-2 text-sm">
          Namespace Creation Successful!
        </p>
      )}
    </form>
  );
};

export default CreateNamespaceForm;
