import { useEffect, type FormEvent } from "react";
import useForm from "hooks/useForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UpdateIcon } from "@radix-ui/react-icons";

import {
  inviteUserNamespaceSchema,
  type InviteUserNamespaceSchema,
} from "schemas/inviteUserNamespaceSchema";
import { selectUser } from "features/authSlice";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "components/ui/select";
import { Input, Label, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";
import {
  useInviteUserToNamespaceMutation,
  useGetUserRoleQuery,
} from "features/namespaceApiSlice";
import { formatHeader } from "shared/utils/parseString";
import { RoleRules, checkPermission, type Role } from "shared/utils/role";

interface InviteUserNamespaceFormProps {}

const InviteUserNamespaceForm = () => {
  const user = useSelector(selectUser);
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

  if (!user) {
    throw new Error("User not found");
  }

  if (!id) {
    throw new Error("Namespace ID not found");
  }

  const [inviteUserToNamespace, { isSuccess, isLoading }] =
    useInviteUserToNamespaceMutation();

  const { data: userRole } = useGetUserRoleQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

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

  const handleSelectRole = (role: Role) => {
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
      <div className="space-y-1">
        <Label htmlFor="role" text="Role:" />
        <Select defaultValue="guest" onValueChange={handleSelectRole}>
          <SelectTrigger>{formatHeader(form.role)}</SelectTrigger>
          <SelectContent>
            {/* Check current user role to and it's weight and only show roles that have less weight */}
            {userRole &&
              checkPermission(userRole, "invite") &&
              Object.entries(RoleRules)
                .filter(
                  ([key, value]) => value.weight <= RoleRules[userRole].weight
                )
                .map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {formatHeader(key)}
                  </SelectItem>
                ))}
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
        overrideStyles="px-2"
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
