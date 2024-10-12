import useForm from "hooks/useForm";
import { useParams } from "react-router-dom";
import {
  inviteUserNamespaceSchema,
  type InviteUserNamespaceSchema,
} from "schemas/inviteUserNamespaceSchema";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "components/ui/select";
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";
import { useInviteUserToNamespaceMutation } from "features/namespaceApiSlice";
import { useEffect, type FormEvent } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";
import { formatHeader } from "shared/utils/parseString";

interface InviteUserNamespaceFormProps {}

const InviteUserNamespaceForm = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const { form, handleChange, setForm, validate, errors } =
    useForm<InviteUserNamespaceSchema>(
      {
        userId: "",
        namespaceId: id || "",
        role: "guest",
      },
      inviteUserNamespaceSchema
    );

  const [inviteUserToNamespace, { isSuccess, isLoading }] =
    useInviteUserToNamespaceMutation();

  const handleInviteUserClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await inviteUserToNamespace(form).unwrap();
      } catch (err) {
        console.error("Failed to invite user to namespace:", err);
      }
    }
  };

  const handleSelectRole = (role: string) => {
    setForm((prev) => ({
      ...prev,
      role: role,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User invited to namespace",
      });
    }
  }, [isSuccess]);

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="userId" text="ID of user to invite:" />
        <Input
          id="userId"
          type="text"
          value={form.userId}
          name="userId"
          onChange={handleChange}
        />
        {errors.errorMessages.userId && (
          <span className="text-error text-sm">
            {errors.errorMessages.userId}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="role" text="Role:" />
        <Select defaultValue="guest" onValueChange={handleSelectRole}>
          <SelectTrigger>{formatHeader(form.role)}</SelectTrigger>
          <SelectContent>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="contributor">Contributor</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
        {errors.errorMessages.role && (
          <span className="text-error text-sm">
            {errors.errorMessages.role}
          </span>
        )}
      </div>
      <BaseButton
        onClick={handleInviteUserClick}
        variant="accent"
        overrideStyles="px-3 w-full"
        content={
          isSuccess ? (
            "Success"
          ) : isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            "Invite User"
          )
        }
      />
    </form>
  );
};

export default InviteUserNamespaceForm;
