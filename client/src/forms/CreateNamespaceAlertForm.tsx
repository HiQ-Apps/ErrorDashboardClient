import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type FormEvent, useEffect } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Checkbox } from "components/ui/checkbox";

import { Input, Label, BaseButton } from "components/base";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import { useToast } from "components/ui/use-toast";
import {
  createNamespaceAlertSchema,
  type CreateNamespaceAlertSchema,
} from "schemas/createNamespaceAlertSchema";
import useForm from "hooks/useForm";
import { useCreateNamespaceAlertMutation } from "features/namespaceAlertSlice";
import type { AlertMethod } from "types/NamespaceAlert";

type AlertChoices = "path" | "line" | "message" | "stackTrace";
type RateType = "count" | "rate";

const CreateNamespaceAlertForm = () => {
  const { namespaceId } = useParams<{ namespaceId: string }>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const selectorList = useState<string[]>([]);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [selectedAlertByChoice, setSelectedAlertByChoice] =
    useState<AlertChoices>("message");
  const [selectedAlertMethod, setSelectedAlertMethod] =
    useState<AlertMethod>("email");
  const [selectedRateType, setSelectedRateType] = useState<RateType>("count");

  if (!namespaceId) {
    throw new Error("Namespace id is required");
  }

  const { form, setForm, handleChange, validate, errors } =
    useForm<CreateNamespaceAlertSchema>(
      {
        namespaceId: namespaceId,
        alertMethod: selectedAlertMethod,
        path: undefined,
        line: undefined,
        message: undefined,
        stackTrace: undefined,
        countThreshold: undefined,
        timeWindow: undefined,
        unresolvedTimeThreshold: undefined,
        rateThreshold: undefined,
        rateTimeWindow: undefined,
      },
      createNamespaceAlertSchema
    );

  const [createNamespaceAlert, { isSuccess, isError, isLoading }] =
    useCreateNamespaceAlertMutation();

  const updateFormAlterChoiceFields = (value: string) => {
    const updatedAlertSearchForm = {
      path: selectedAlertByChoice == "path" ? value : undefined,
      line: selectedAlertByChoice == "line" ? Number(value) : undefined,
      message: selectedAlertByChoice == "message" ? value : undefined,
      stackTrace: selectedAlertByChoice == "stackTrace" ? value : undefined,
    };

    setForm({
      ...form,
      ...updatedAlertSearchForm,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        updateFormAlterChoiceFields(selectedAlertByChoice);
        await createNamespaceAlert(form).unwrap();
      } catch (err) {
        console.error("Failed to create namespace alert:", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Namespace alert created successfully",
        description: `Namespace alert created successfully`,
      });
    } else if (isError) {
      toast({
        title: "Failed to create namespace alert",
        description: "Please try again",
      });
    }
  }, [isSuccess, isError]);

  // we need an endpoint that returns unique results for each choice
  // find all unique error names
  // find all unique paths
  // find all unique lines
  // find all unique messages
  // find all unique stack traces (check if input is within stack trace in db)
  // return as array
  // for each choice, we need to query the endpoint and populate the select dropdown
  // add a custom option to allow user to input their own value

  // Interval form:
  // count threshold or rate threshhold
  // count threshhold should use time window and unresolved time threshold

  // final query should take in on of the alert choices (errorName, path, line, message, stackTrace)
  // and the interval form (count threshold or rate threshold)
  // and send the request

  return (
    <form>
      <div>
        <Label htmlFor="alertMethod" text="Alert method" />
        <Select
          value={selectedAlertMethod}
          onValueChange={(value: string) =>
            setSelectedAlertMethod(value as AlertMethod)
          }
        >
          <SelectTrigger>
            <SelectValue>{selectedAlertMethod}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          value={selectedAlertByChoice}
          onValueChange={(value: AlertChoices) => {
            setSelectedAlertByChoice(value);
          }}
        >
          <SelectTrigger>
            <SelectValue>{selectedAlertByChoice}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="path">Path</SelectItem>
            <SelectItem value="line">Line</SelectItem>
            <SelectItem value="message">Message</SelectItem>
            <SelectItem value="stackTrace">Stack trace</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedAlertByChoice == "path" ?? (
        <div>
          <Label htmlFor="path" text="Path" />
          <Input
            type="text"
            name="path"
            value={form.path || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.path && (
            <span className="text-error text-sm">
              {errors.errorMessages.path}
            </span>
          )}
        </div>
      )}
      {selectedAlertByChoice == "line" ?? (
        <div>
          <Label htmlFor="line" text="Line" />
          <Input
            type="number"
            name="line"
            value={form.line || Number()}
            onChange={handleChange}
          />
          {errors.errorMessages.line && (
            <span className="text-error text-sm">
              {errors.errorMessages.line}
            </span>
          )}
        </div>
      )}
      {selectedAlertByChoice == "message" ?? (
        <div>
          <Label htmlFor="message" text="Message" />
          <Input
            type="text"
            name="message"
            value={form.message || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.message && (
            <span className="text-error text-sm">
              {errors.errorMessages.message}
            </span>
          )}
        </div>
      )}
      {selectedAlertByChoice == "stackTrace" ?? (
        <div>
          <Label htmlFor="stackTrace" text="Stack trace" />
          <Input
            type="text"
            name="stackTrace"
            value={form.stackTrace || ""}
            onChange={handleChange}
          />
          {errors.errorMessages.stackTrace && (
            <span className="text-error text-sm">
              {errors.errorMessages.stackTrace}
            </span>
          )}
        </div>
      )}
      <div>
        <Label htmlFor="rateType" text="Select trigger rate:" />
        <Select
          value={selectedRateType}
          onValueChange={(value: RateType) => {
            setSelectedRateType(value);
          }}
        >
          <SelectTrigger>
            <SelectValue>{selectedRateType}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="count">Count</SelectItem>
            <SelectItem value="rate">Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedRateType == "count" ?? (
        <div>
          <div>
            <Label htmlFor="countThreshold" text="Count threshold" />
            <Input
              type="number"
              name="countThreshold"
              value={form.countThreshold || Number()}
              onChange={handleChange}
            />
            {errors.errorMessages.countThreshold && (
              <span className="text-error text-sm">
                {errors.errorMessages.countThreshold}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="timeWindow" text="Time window" />
            <Input
              type="number"
              name="timeWindow"
              value={form.timeWindow || Number()}
              onChange={handleChange}
            />
            {errors.errorMessages.timeWindow && (
              <span className="text-error text-sm">
                {errors.errorMessages.timeWindow}
              </span>
            )}
          </div>
        </div>
      )}
      <div>
        <Label
          htmlFor="unresolvedTimeThreshold"
          text="Unresolved time threshold"
        />
        <Input
          type="number"
          name="unresolvedTimeThreshold"
          value={form.unresolvedTimeThreshold || Number()}
          onChange={handleChange}
        />
        {errors.errorMessages.unresolvedTimeThreshold && (
          <span className="text-error text-sm">
            {errors.errorMessages.unresolvedTimeThreshold}
          </span>
        )}
      </div>
      {selectedRateType == "rate" ?? (
        <div>
          <div>
            <Label htmlFor="rateThreshold" text="Rate threshold" />
            <Input
              type="number"
              name="rateThreshold"
              value={form.rateThreshold || Number()}
              onChange={handleChange}
            />
            {errors.errorMessages.rateThreshold && (
              <span className="text-error text-sm">
                {errors.errorMessages.rateThreshold}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="rateTimeWindow" text="Rate time window" />
            <Input
              type="number"
              name="rateTimeWindow"
              value={form.rateTimeWindow || Number()}
              onChange={handleChange}
            />
            {errors.errorMessages.rateTimeWindow && (
              <span className="text-error text-sm">
                {errors.errorMessages.rateTimeWindow}
              </span>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateNamespaceAlertForm;
