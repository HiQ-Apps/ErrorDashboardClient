import { type FormEvent, useEffect, useState } from "react";
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
import { ButtonClickEvent } from "shared/types/extra";
import { useToast } from "components/ui/use-toast";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "components/ui/tooltip";

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

  const [updateNamespaceById] = useUpdateNamespaceByIdMutation();

  const toggleClientSecretVisibility = (event: ButtonClickEvent) => {
    event.preventDefault();
    setClientSecretVisible((prev) => !prev);
  };

  const toggleClientIdVisibility = (event: ButtonClickEvent) => {
    event.preventDefault();
    setClientIdVisible((prev) => !prev);
  };

  const copyToClipboard = (
    event: ButtonClickEvent,
    fieldName: keyof UpdateNamespaceSchema
  ) => {
    event.preventDefault();
    const fieldValue = form[fieldName] || "";
    navigator.clipboard
      .writeText(fieldValue as string)
      .then(() => {
        toast({
          title: `${fieldName} copied to clipboard`,
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
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
      toast({
        title: `${fieldName} updated successfully`,
      });
      refetch();
    } catch (err) {
      toast({
        title: `${fieldName} failed to update`,
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
          <Tooltip>
            <TooltipTrigger>
              <BaseButton
                size="sm"
                content={<ClipboardCopyIcon />}
                variant="default"
                onClick={(e) => copyToClipboard(e, "client_id")}
                override_styles="my-4"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <BaseButton
                size="sm"
                content={clientIdVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                variant="default"
                onClick={toggleClientIdVisibility}
                override_styles="my-4"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle visibility</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <BaseButton
                size="sm"
                content={<UpdateIcon />}
                variant="default"
                onClick={(e) => handleGenerateUUID(e, "client_id")}
                override_styles="my-4"
              />
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
          <Tooltip>
            <TooltipTrigger>
              <BaseButton
                size="sm"
                content={<ClipboardCopyIcon />}
                variant="default"
                onClick={(e) => copyToClipboard(e, "client_secret")}
                override_styles="my-4"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <BaseButton
                size="sm"
                content={
                  clientSecretVisible ? <EyeClosedIcon /> : <EyeOpenIcon />
                }
                variant="default"
                onClick={toggleClientSecretVisibility}
                override_styles="my-4"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle visibility</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <BaseButton
                size="sm"
                content={<UpdateIcon />}
                variant="default"
                onClick={(e) => handleGenerateUUID(e, "client_secret")}
                override_styles="my-4"
              />
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
