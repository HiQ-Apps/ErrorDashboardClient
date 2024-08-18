import {
  type FormEvent,
  type MouseEvent,
  type MouseEventHandler,
  useEffect,
  useState,
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
        clientId: null,
        clientSecret: null,
        serviceName: null,
        environmentType: null,
      },
      updateNamespaceSchema
    );

  useEffect(() => {
    if (data) {
      setForm({
        active: data.active,
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        serviceName: data.serviceName,
        environmentType: data.environmentType,
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
      let value;

      if (fieldName === "active") {
        value = !form[fieldName];
      } else if (fieldName === "clientSecret") {
        value = true;
      } else {
        value = form[fieldName];
      }

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
        <Label htmlFor="clientId" text="Client ID:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            disabled
            type={clientIdVisible ? "text" : "password"}
            name="clientId"
            value={form.clientId || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.clientId && (
            <span className="text-error text-sm">
              {errors.errorMessages.clientId}
            </span>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={(e) => copyToClipboard(e, "clientId")}
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
                onClick={(e) => handleGenerateUUID(e, "clientId")}
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
            onClick={(e) => handleSubmit(e, "clientId")}
            overrideStyles="my-4 px-3"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <Label htmlFor="clientSecret" text="Client Secret:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            disabled
            type={clientSecretVisible ? "text" : "password"}
            name="clientSecret"
            value={form.clientSecret || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.clientSecret && (
            <span className="text-error text-sm">
              {errors.errorMessages.clientSecret}
            </span>
          )}
          <Tooltip>
            <TooltipTrigger>
              <div
                className="flex items-center space-x-2 border rounded-md p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-slate-300 dark:bg-transparent"
                onClick={(e) => copyToClipboard(e, "clientSecret")}
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
          <BaseButton
            size="sm"
            content={<UpdateIcon />}
            variant="default"
            onClick={(e) => handleSubmit(e, "clientSecret")}
            overrideStyles="my-4 px-3"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <Label htmlFor="serviceName" text="Service Name:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            type="text"
            name="serviceName"
            value={form.serviceName || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.serviceName && (
            <span className="text-error text-sm">
              {errors.errorMessages.serviceName}
            </span>
          )}
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "serviceName")}
            overrideStyles="my-4 px-3"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 items-center align-center text-center">
        <Label htmlFor="environmentType" text="Environment Type:" />
        <div className="relative col-span-3 flex items-center space-x-2">
          <Input
            type="text"
            name="environmentType"
            value={form.environmentType || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.environmentType && (
            <span className="text-error text-sm">
              {errors.errorMessages.environmentType}
            </span>
          )}
          <BaseButton
            size="sm"
            content="Update"
            variant="default"
            onClick={(e) => handleSubmit(e, "environmentType")}
            overrideStyles="my-4 px-3"
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
            overrideStyles="my-4 px-3"
          />
        </div>
      </div>
    </form>
  );
};

export default UpdateNamespaceForm;
