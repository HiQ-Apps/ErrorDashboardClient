import { useEffect, useState } from "react";
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";

import UpdateUserNamespaceRoleForm from "forms/UpdateUserNamespaceRoleForm";
import {
  useGetNamespaceMembersQuery,
  useRemoveUserFromNamespaceMutation,
  useGetUserRoleQuery,
} from "features/namespaceApiSlice";
import { LoadingCard, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";
import { SheetHeader, SheetContent, SheetTitle } from "components/ui/sheet";
import {
  checkAuthority,
  checkPermission,
  type NamespaceRole,
} from "shared/utils/role";

const NamespaceMemberList = () => {
  const { id: namespaceId } = useParams();
  const { toast } = useToast();
  const [viewUpdateForm, setViewUpdateForm] = useState(false);
  const {
    data: memberData,
    error,
    isLoading,
  } = useGetNamespaceMembersQuery(namespaceId as string, {
    skip: !namespaceId,
  });

  const [removeUser, { error: removeError }] =
    useRemoveUserFromNamespaceMutation();

  const { data: userRole } = useGetUserRoleQuery(namespaceId as string, {
    skip: !namespaceId,
    refetchOnMountOrArgChange: true,
  });

  const handleRemoveUser = async (id: string) => {
    try {
      await removeUser({ userId: id, namespaceId: namespaceId }).unwrap();
    } catch (error) {
      toast({
        description: "Failed to remove user",
      });
    }
  };

  useEffect(() => {
    if (removeError) {
      toast({
        description: "Failed to remove user",
      });
    }
  }, [removeError]);

  return (
    <SheetContent className="w-120">
      <SheetHeader>
        <SheetTitle>Member List</SheetTitle>
      </SheetHeader>
      <BaseButton
        variant="accent"
        size="sm"
        content={<Pencil1Icon />}
        onClick={() => setViewUpdateForm(!viewUpdateForm)}
        overrideStyles="px-2"
      />
      {isLoading && <LoadingCard />}
      {error && <div>Failed to load members</div>}
      {memberData && (
        <div className="flex flex-col space-y-2 my-4">
          {memberData.map((member) => (
            <div
              className="flex flex-row justify-between align-center items-center dark:text-slate-100"
              key={member.id}
            >
              <div className="text-sm">{member.email}</div>
              <div className="flex flex-row space-x-2 text-center items-center justify-center">
                {viewUpdateForm ? (
                  <UpdateUserNamespaceRoleForm
                    userId={member.id}
                    namespaceId={namespaceId as string}
                    role={member.role}
                    viewerRole={userRole as NamespaceRole}
                  />
                ) : (
                  <div className="text-xs flex flex-row text-center items-center justify-center">
                    <p>{member.role}</p>
                  </div>
                )}
                {userRole &&
                  checkPermission(userRole, "remove user") &&
                  checkAuthority(userRole, member.role) && (
                    <BaseButton
                      variant="destructive"
                      size="sm"
                      content={<Cross2Icon />}
                      overrideStyles="px-2"
                      onClick={() => handleRemoveUser(member.id)}
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SheetContent>
  );
};

export default NamespaceMemberList;
