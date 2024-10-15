import { type FormEvent } from "react";
import { Label, BaseButton } from "components/base";

import { UpdateIcon, CheckIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "components/ui/select";
import useForm from "hooks/useForm";
import {
  updateUserNamespaceRoleSchema,
  type UpdateUserNamespaceRoleSchema,
} from "schemas/updateUserNamespaceRoleSchema";
import { useUpdateUserNamespaceRoleMutation } from "features/namespaceApiSlice";
import { checkPermission, RoleRules, type Role } from "shared/utils/role";

interface UpdateUserNamespaceRoleFormProps {
  userId: string;
  namespaceId: string;
  role: Role;
  viewerRole: Role;
}

const UpdateUserNamespaceRoleForm = ({
  userId,
  namespaceId,
  role,
  viewerRole,
}: UpdateUserNamespaceRoleFormProps) => {
  const { form, setForm, validate, errors } =
    useForm<UpdateUserNamespaceRoleSchema>(
      {
        userId: userId,
        namespaceId: namespaceId,
        role: role,
      },
      updateUserNamespaceRoleSchema
    );

  const [updateUserNamespaceRole, { isSuccess, isLoading }] =
    useUpdateUserNamespaceRoleMutation();

  const handleUpdateRoleClick = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        await updateUserNamespaceRole(form).unwrap();
      } catch (err) {
        console.error("Failed to update user role:", err);
      }
    }
  };

  const handleSelectRole = (role: Role) => {
    setForm((prev) => ({
      ...prev,
      role: role,
    }));
  };

  return (
    <form className="flex flex-row items-center text-center justify-center space-x-2">
      <div className="flex flex-row items-center text-center justify-center space-x-2">
        <Select defaultValue={form.role} onValueChange={handleSelectRole}>
          {viewerRole && checkPermission(viewerRole, "update") && (
            <SelectTrigger>{form.role}</SelectTrigger>
          )}
          <SelectContent>
            {Object.entries(RoleRules).map(([key, value]) => {
              if (value.weight <= RoleRules[viewerRole].weight) {
                return (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                );
              }
            })}
          </SelectContent>
        </Select>
        {errors.errorMessages.role && (
          <span className="text-error text-sm">
            {errors.errorMessages.role}
          </span>
        )}
      </div>
      <BaseButton
        content={
          isSuccess ? (
            <CheckIcon />
          ) : isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            <CheckCircledIcon />
          )
        }
        onClick={handleUpdateRoleClick}
        variant="accent"
      />
    </form>
  );
};

export default UpdateUserNamespaceRoleForm;
