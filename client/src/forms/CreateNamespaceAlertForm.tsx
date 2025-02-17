import { useState } from "react";
import { useParams } from "react-router-dom";
import { type FormEvent, useEffect } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";

import { Input, Label, BaseButton } from "components/base";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "components/ui/tabs";
import { useToast } from "components/ui/use-toast";
import {
  createNamespaceAlertSchema,
  type CreateNamespaceAlertSchema,
} from "schemas/createNamespaceAlertSchema";
import useForm from "hooks/useForm";
import { useCreateNamespaceAlertMutation } from "features/namespaceAlertApiSlice";
import { useGetUniqueMetaByNamespaceIdQuery } from "features/errorApiSlice";
import { camelToTitleCase } from "shared/utils/parseString";
import type { AlertMethod } from "types/NamespaceAlert";
import type { TimeUnits } from "shared/types/extra";
import { exchangeTimeFormatToMilliseconds } from "shared/utils/Date";
import { Textarea } from "components/ui/textarea";

type AlertChoices = "path" | "line" | "message" | "stackTrace";
type RateType = "Count" | "Rate";

const CreateNamespaceAlertForm = () => {
  const { id: namespaceId } = useParams();
  const { toast } = useToast();

  const [selectedUnresolvedTimeUnit, setSelectedUnresolvedTimeUnit] =
    useState<TimeUnits>("Milliseconds");

  const [selectedCountTimeWindowUnit, setSelectedCountTimeWindowUnit] =
    useState<TimeUnits>("Milliseconds");

  const [selectedRateTimeWindowUnit, setSelectedRateTimeWindowUnit] =
    useState<TimeUnits>("Milliseconds");

  const [selectedAlertByChoice, setSelectedAlertByChoice] =
    useState<AlertChoices>("message");
  const [selectedAlertMethod, setSelectedAlertMethod] =
    useState<AlertMethod>("email");

  const [selectedRateType, setSelectedRateType] = useState<RateType>("Count");
  const [customTrigger, setCustomTrigger] = useState(true);

  if (!namespaceId) {
    throw new Error("Namespace id is required");
  }

  const { form, setForm, handleChange, validate, errors, resetForm } =
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

  const [
    createNamespaceAlert,
    {
      isSuccess: createNamespaceAlertIsSuccess,
      isError: createNamespaceAlertIsError,
      isLoading: createNamespaceAlertLoading,
    },
  ] = useCreateNamespaceAlertMutation();

  const { data: uniqueErrorMetaList, refetch } =
    useGetUniqueMetaByNamespaceIdQuery({
      namespaceId,
      filterRequest: selectedAlertByChoice,
    });

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
        let updated_form = { ...form };
        if (form.unresolvedTimeThreshold) {
          updated_form.unresolvedTimeThreshold =
            exchangeTimeFormatToMilliseconds({
              time: form.unresolvedTimeThreshold as number,
              unit: selectedUnresolvedTimeUnit,
            });
        }

        if (form.rateTimeWindow) {
          updated_form.rateTimeWindow = exchangeTimeFormatToMilliseconds({
            time: form.rateTimeWindow as number,
            unit: selectedRateTimeWindowUnit,
          });
        }

        if (form.timeWindow) {
          updated_form.timeWindow = exchangeTimeFormatToMilliseconds({
            time: form.timeWindow as number,
            unit: selectedCountTimeWindowUnit,
          });
        }

        updateFormAlterChoiceFields(selectedAlertByChoice);
        await createNamespaceAlert(updated_form).unwrap();
        resetForm();
      } catch (err) {
        console.error("Failed to create namespace alert:", err);
      }
    }
  };

  const handleSelectChange = (value: string) => {
    if (value === "custom") {
      setCustomTrigger(false);
    } else {
      setCustomTrigger(true);
    }
  };

  useEffect(() => {
    if (createNamespaceAlertIsSuccess) {
      toast({
        title: "Namespace alert created successfully",
        description: `Namespace alert created successfully`,
      });
    }
  }, [createNamespaceAlertIsSuccess]);

  return (
    <form className="space-y-2">
      <BaseButton
        content="Reset Form"
        variant="accent"
        size="sm"
        onClick={resetForm}
        overrideStyles="px-3"
      />
      <div>
        <Label htmlFor="alertMethod" text="Select an alert method:" />
        <Select
          value={selectedAlertMethod}
          onValueChange={(value: string) =>
            setSelectedAlertMethod(value as AlertMethod)
          }
        >
          <SelectTrigger>
            <SelectValue>{camelToTitleCase(selectedAlertMethod)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="discord">Discord</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor="discordChannelId" text="Discord channel id:" />
        <Input
          type="number"
          name="discordChannelId"
          value={form.discordChannelId || Number()}
          onChange={handleChange}
          disabled={selectedAlertMethod !== "discord"}
          overrideStyles="
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [-moz-appearance:textfield]
          "
        />
        {errors.errorMessages.discordChannelId && (
          <span className="text-error text-sm">
            {errors.errorMessages.discordChannelId}
          </span>
        )}
      </div>

      <Label htmlFor="alert-strategy" text="Alert Strategy" />
      <div className="text-xs">
        Choose your alert strategy by selecting a tab.
      </div>
      <Tabs>
        <TabsList>
          <TabsTrigger value="error-count-rate">
            Count/Rate Threshold Time Window
          </TabsTrigger>
          <TabsTrigger value="unresolved">
            Unresolved Error Time Window
          </TabsTrigger>
        </TabsList>
        <TabsContent value="error-count-rate">
          <div className="flex flex-col w-full h-full space-y-2">
            <div>
              <Label htmlFor="alertBy" text="Search by specific column:" />
              <div className="text-xs">
                Choose a specific column to search for errors in the namespace.
              </div>
              <Select
                value={selectedAlertByChoice}
                onValueChange={(value: AlertChoices) => {
                  refetch();
                  setCustomTrigger(true);
                  setSelectedAlertByChoice(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue>
                    {camelToTitleCase(selectedAlertByChoice)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="path">Path</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                  <SelectItem value="stackTrace">Stack Trace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedAlertByChoice == "path" && (
              <div>
                <Label htmlFor="path" text="Filter by path:" />
                <Select
                  onValueChange={(value: string) => {
                    handleSelectChange(value);
                    updateFormAlterChoiceFields(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select filter parameter:" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueErrorMetaList?.map((errorMeta, index) => (
                      <SelectItem key={index} value={errorMeta || "NA"}>
                        {errorMeta === "" ? "No Value" : errorMeta}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom" />
                  </SelectContent>
                </Select>
                <Textarea
                  disabled={customTrigger}
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
            {selectedAlertByChoice == "line" && (
              <div>
                <Label htmlFor="line" text="Filter by line:" />
                <Select
                  onValueChange={(value: string) => {
                    handleSelectChange(value);
                    updateFormAlterChoiceFields(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selected filter parameter:" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueErrorMetaList?.map((errorMeta, index) => (
                      <SelectItem key={index} value={errorMeta || "NA"}>
                        {errorMeta === "" ? "No Value" : errorMeta}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  disabled={customTrigger}
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
            {selectedAlertByChoice == "message" && (
              <div>
                <Label htmlFor="message" text="Filter by message:" />
                <Select
                  onValueChange={(value: string) => {
                    handleSelectChange(value);
                    updateFormAlterChoiceFields(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selected filter parameter:" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueErrorMetaList?.map((errorMeta, index) => (
                      <SelectItem key={index} value={errorMeta || "NA"}>
                        {errorMeta === "" ? "No Value" : errorMeta}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  disabled={customTrigger}
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
            {selectedAlertByChoice == "stackTrace" && (
              <div>
                <Label htmlFor="stackTrace" text="Filter by stack trace:" />
                <Select
                  onValueChange={(value: string) => {
                    handleSelectChange(value);
                    updateFormAlterChoiceFields(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select filter parameter:" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueErrorMetaList?.map((errorMeta, index) => (
                      <SelectItem key={index} value={errorMeta || "NA"}>
                        {errorMeta === "" ? "No Value" : errorMeta}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  disabled={customTrigger}
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
              <div className="text-xs">
                Choose a threshold-based limit at which the alert should be
                triggered.
              </div>
              <Select
                value={camelToTitleCase(selectedRateType)}
                onValueChange={(value: RateType) => {
                  setSelectedRateType(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue>{selectedRateType}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Count">Count</SelectItem>
                  <SelectItem value="Rate">Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRateType == "Count" && (
              <div className="flex flex-col space-y-2">
                <div>
                  <Label htmlFor="countThreshold" text="Count threshold:" />
                  <div className="text-xs">
                    The count threshold should be the number of errors that
                    occur in the time window you set before the alert triggers.
                  </div>
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
                <div className="flex flex-col">
                  <Label htmlFor="timeWindow" text="Time window:" />
                  <div className="text-xs">
                    The time window in which the count of error occurance is
                    calculated.
                  </div>
                  <div className="flex flex-row justify-center items-center space-x-8">
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
                    <div className="mt-1">
                      <Select
                        onValueChange={(value: TimeUnits) =>
                          setSelectedCountTimeWindowUnit(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time unit">
                            {selectedCountTimeWindowUnit}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Milliseconds">
                            Millisecond
                          </SelectItem>
                          <SelectItem value="Seconds">Second</SelectItem>
                          <SelectItem value="Minutes">Minute</SelectItem>
                          <SelectItem value="Hours">Hour</SelectItem>
                          <SelectItem value="Days">Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedRateType == "Rate" && (
              <div className="flex flex-col space-y-2">
                <div>
                  <Label
                    htmlFor="rateThreshold"
                    text={`Rate threshold: ${form.rateThreshold || 0}%`}
                  />
                  <div className="text-xs">
                    The rate threshold should be calculated based off the rate
                    of error occurance in the time window you set before the
                    alert triggers.
                  </div>
                  <Input
                    type="range"
                    name="rateThreshold"
                    value={form.rateThreshold || Number()}
                    onChange={handleChange}
                    max={100}
                  />
                  {errors.errorMessages.rateThreshold && (
                    <span className="text-error text-sm">
                      {errors.errorMessages.rateThreshold}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="rateTimeWindow" text="Rate time window:" />
                  <div className="text-xs">
                    The time window in which the rate of error occurance is
                    calculated.
                  </div>
                  <div className="flex flex-row justify-center items-center space-x-8">
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
                    <div className="mt-1">
                      <Select
                        onValueChange={(value: TimeUnits) =>
                          setSelectedRateTimeWindowUnit(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time unit">
                            {selectedRateTimeWindowUnit}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Milliseconds">
                            Millisecond
                          </SelectItem>
                          <SelectItem value="Seconds">Second</SelectItem>
                          <SelectItem value="Minutes">Minute</SelectItem>
                          <SelectItem value="Hours">Hour</SelectItem>
                          <SelectItem value="Days">Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="unresolved">
          <div className="flex flex-col">
            <Label
              htmlFor="unresolvedTimeThreshold"
              text="Unresolved time threshold:"
            />
            <div className="flex flex-row justify-center items-center space-x-8">
              <Input
                type="number"
                name="unresolvedTimeThreshold"
                value={form.unresolvedTimeThreshold || 0}
                onChange={handleChange}
              />
              {errors.errorMessages.unresolvedTimeThreshold && (
                <span className="text-error text-sm">
                  {errors.errorMessages.unresolvedTimeThreshold}
                </span>
              )}
              <div className="mt-1">
                <Select
                  onValueChange={(value: TimeUnits) =>
                    setSelectedUnresolvedTimeUnit(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time unit">
                      {selectedUnresolvedTimeUnit}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Milliseconds">Millisecond</SelectItem>
                    <SelectItem value="Seconds">Second</SelectItem>
                    <SelectItem value="Minutes">Minute</SelectItem>
                    <SelectItem value="Hours">Hour</SelectItem>
                    <SelectItem value="Days">Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <BaseButton
        size="sm"
        content={
          createNamespaceAlertLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            "Create Alert"
          )
        }
        variant="accent"
        onClick={handleSubmit}
        overrideStyles="px-3"
      />
    </form>
  );
};

export default CreateNamespaceAlertForm;
