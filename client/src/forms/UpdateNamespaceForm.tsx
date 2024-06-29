import {
  type FormEvent,
  type MouseEvent,
  useEffect,
  useState,
  MouseEventHandler,
} from "react";
import { useParams } from "react-router-dom";

import {
  UpdateIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";
import { Input, Label, BaseButton } from "components/base";
import useForm from "hooks/useForm";
import {
  type UpdateNamespaceSchema,
  updateNamespaceSchema,
} from "schemas/updateNamespaceSchema";
import {
  useGetNamespaceByIdQuery,
  useUpdateNamespaceByIdMutation,
} from "features/namespaceApiSlice";
import { generateUUID } from "shared/utils/generateUUID";
import { useToast } from "components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { formatHeader } from "shared/utils/parseString";

const UpdateNamespaceForm = () => {
  const { id } = useParams();
  const { toast } = useToast();

  if (!id) {
    throw new Error("Namespace ID is required for update form");
  }

  const [clientSecretVisible, setClientSecretVisible] = useState(false);
  const [clientIdVisible, setClientIdVisible] = useState(false);

  const { data, isError, refetch } = useGetNamespaceByIdQuery(id);

  useEffect(() => {
    if (isError) {
      throw new Error("Failed to fetch namespace data");
    }
  }, [isError]);

  const { form, handleChange, setForm, validate, errors } =
    useForm<UpdateNamespaceSchema>(
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

  const [updateNamespaceById] = useUpdateNamespaceByIdMutation();

  const toggleClientSecretVisibility: MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.preventDefault();
    setClientSecretVisible((prev) => !prev);
  };

  const toggleClientIdVisibility: MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.preventDefault();
    setClientIdVisible((prev) => !prev);
  };

  const copyToClipboard = (
    event: MouseEvent<HTMLDivElement, Event>,
    fieldName: keyof UpdateNamespaceSchema
  ) => {
    event.preventDefault();
    const fieldValue = form[fieldName] || "";
    navigator.clipboard
      .writeText(fieldValue as string)
      .then(() => {
        toast({
          title: `${formatHeader(fieldName)} copied to clipboard`,
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleGenerateUUID = (
    event: MouseEvent<HTMLDivElement, Event>,
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
      const value = fieldName === "active" ? !form[fieldName] : form[fieldName];
      if (validate()) {
        await updateNamespaceById({ id, [fieldName]: value }).unwrap();

        toast({
          title: `${formatHeader(fieldName)} updated successfully`,
        });
        refetch();
      } else {
        toast({
          title: `${formatHeader(fieldName)} failed to update`,
        });
      }
    } catch (err) {
      toast({
        title: `${formatHeader(fieldName)} failed to update`,
      });
    }
  };

  return (
    <form className="grid grid-cols-1 gap-6 place-items-center max-w-2xl mx-auto mt-8">
      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <Label htmlFor="client_id" text="Client ID:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            disabled
            type={clientIdVisible ? "text" : "password"}
            name="client_id"
            value={form.client_id || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.client_id && (
            <span className="text-error text-sm">
              {errors.errorMessages.client_id}
            </span>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={(e) => copyToClipboard(e, "client_id")}
              >
                <ClipboardCopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={toggleClientIdVisibility}
              >
                {clientIdVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle visibility</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={(e) => handleGenerateUUID(e, "client_id")}
              >
                <UpdateIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate new UUID</p>
            </TooltipContent>
          </Tooltip>
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
        <Label htmlFor="client_secret" text="Client Secret:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            disabled
            type={clientSecretVisible ? "text" : "password"}
            name="client_secret"
            value={form.client_secret || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.client_secret && (
            <span className="text-error text-sm">
              {errors.errorMessages.client_secret}
            </span>
          )}
          <Tooltip>
            <TooltipTrigger>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={(e) => copyToClipboard(e, "client_secret")}
              >
                <ClipboardCopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={toggleClientSecretVisibility}
              >
                {clientSecretVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle visibility</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={(e) => handleGenerateUUID(e, "client_secret")}
              >
                <UpdateIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate new UUID</p>
            </TooltipContent>
          </Tooltip>
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
        <Label htmlFor="service_name" text="Service Name:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            type="text"
            name="service_name"
            value={form.service_name || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.service_name && (
            <span className="text-error text-sm">
              {errors.errorMessages.service_name}
            </span>
          )}
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
        <Label htmlFor="environment_type" text="Environment Type:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            type="text"
            name="environment_type"
            value={form.environment_type || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.environment_type && (
            <span className="text-error text-sm">
              {errors.errorMessages.environment_type}
            </span>
          )}
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "environment_type")}
            override_styles="my-4"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <Label htmlFor="active" text="Deactivate/Reactivate:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <BaseButton
            size="sm"
            content={form.active ? "Deactivate" : "Activate"}
            variant={form.active ? "destructive" : "success"}
            onClick={(e) => handleSubmit(e, "active")}
            override_styles="my-4"
          />
        </div>
      </div>
    </form>
  );
};

export default UpdateNamespaceForm;
