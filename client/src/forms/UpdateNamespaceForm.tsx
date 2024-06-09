import { type FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "components/ui/input";
import useForm from "hooks/useForm";
import {
  type UpdateNamespaceSchema,
  updateNamespaceSchema,
} from "schemas/updateNamespaceSchema";
import {
  useGetNamespaceByIdQuery,
  useUpdateNamespaceByIdMutation,
} from "features/namespaceApiSlice";
import BaseButton from "components/base/Button/Button";
import { generateUUID } from "shared/utils/generateUUID";
import { ButtonClickEvent } from "shared/types/extra";

const UpdateNamespaceForm = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required for update form");
  }

  const [clientSecretVisible, setClientSecretVisible] = useState(false);
  const [clientIdVisible, setClientIdVisible] = useState(false);

  const { data, isError, refetch } = useGetNamespaceByIdQuery(id);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching namespace data");
    }
  }, [isError]);

  const { form, handleChange, setForm } = useForm<UpdateNamespaceSchema>(
    {
      active: null,
      client_id: null,
      client_secret: null,
      service_name: null,
      environment_type: null,
    },
    updateNamespaceSchema
  );

  useEffect(() => {
    if (data) {
      setForm({
        active: data.active,
        client_id: data.client_id,
        client_secret: data.client_secret,
        service_name: data.service_name,
        environment_type: data.environment_type,
      });
    }
  }, [data]);

  const [updateNamespaceById, { isLoading }] = useUpdateNamespaceByIdMutation();

  const toggleClientSecretVisibility = (event: ButtonClickEvent) => {
    event.preventDefault();
    setClientSecretVisible((prev) => !prev);
  };

  const toggleClientIdVisibility = (event: ButtonClickEvent) => {
    event.preventDefault();
    setClientIdVisible((prev) => !prev);
  };

  const handleGenerateUUID = (
    event: ButtonClickEvent,
    fieldName: keyof UpdateNamespaceSchema
  ) => {
    event.preventDefault();
    const newUUID = generateUUID();
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: newUUID,
    }));
  };

  const handleSubmit = async (
    event: FormEvent,
    fieldName: keyof UpdateNamespaceSchema
  ) => {
    event.preventDefault();
    try {
      await updateNamespaceById({ id, [fieldName]: form[fieldName] }).unwrap();
      refetch();
    } catch (err) {
      console.error(`Failed to update ${fieldName}:`, err);
    }
  };

  return (
    <form className="grid grid-cols-1 gap-6 place-items-center max-w-2xl mx-auto mt-8">
      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <label className="block text-xs font-medium col-span-1">
          Client ID
        </label>
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            disabled
            type={clientIdVisible ? "text" : "password"}
            name="client_id"
            value={form.client_id || ""}
            onChange={handleChange}
            className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          <BaseButton
            size="sm"
            content={clientIdVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
            variant="default"
            onClick={toggleClientIdVisibility}
            override_styles="my-4"
          />
          <BaseButton
            size="sm"
            content={<UpdateIcon />}
            variant="default"
            onClick={(e) => handleGenerateUUID(e, "client_id")}
            override_styles="my-4"
          />
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "client_id")}
            override_styles="my-4"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <label className="block text-xs font-medium col-span-1">
          Client Secret
        </label>
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            disabled
            type={clientSecretVisible ? "text" : "password"}
            name="client_secret"
            value={form.client_secret || ""}
            onChange={handleChange}
            className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          <BaseButton
            size="sm"
            content={clientSecretVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
            variant="default"
            onClick={toggleClientSecretVisibility}
            override_styles="my-4"
          />
          <BaseButton
            size="sm"
            content={<UpdateIcon />}
            variant="default"
            onClick={(e) => handleGenerateUUID(e, "client_secret")}
            override_styles="my-4"
          />
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "client_secret")}
            override_styles="my-4"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <label className="block text-xs font-medium col-span-1">
          Service Name
        </label>
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            type="text"
            name="service_name"
            value={form.service_name || ""}
            onChange={handleChange}
            className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "service_name")}
            override_styles="my-4"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <label className="block text-xs font-medium col-span-1">
          Environment Type
        </label>
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            type="text"
            name="environment_type"
            value={form.environment_type || ""}
            onChange={handleChange}
            className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "environment_type")}
            override_styles="my-4"
          />
        </div>
      </div>
    </form>
  );
};

export default UpdateNamespaceForm;
