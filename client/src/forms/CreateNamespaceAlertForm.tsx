import { type FormEvent, useEffect } from "react";
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";

import {
  createNamespaceAlertSchema,
  type CreateNamespaceAlertSchema,
} from "schemas/createNamespaceAlertSchema";
import { UpdateIcon } from "@radix-ui/react-icons";
import useForm from "hooks/useForm";

const CreateNamespaceAlertForm = () => {
  const { form, handleChange, validate, errors } =
    useForm<CreateNamespaceAlertSchema>(
      {
        namespaceId: "",
        alertMethod: "",
        errorName: "",
        path: "",
        line: Number(),
        message: "",
        stackTrace: "",
        countThreshold: Number(),
        timeWindow: Number(),
        unresolvedTimeThreshold: Number(),
        rateThreshold: Number(),
        rateTimeWindow: Number(),
      },
      createNamespaceAlertSchema
    );

  return <div></div>;
};

export default CreateNamespaceAlertForm;
