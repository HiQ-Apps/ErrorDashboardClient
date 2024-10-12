import { useParams } from "react-router-dom";
import {
  useGetNamespaceMembersQuery,
  useRemoveUserFromNamespaceMutation,
} from "features/namespaceApiSlice";
import { LoadingCard, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";
import { SheetHeader, SheetContent, SheetTitle } from "components/ui/sheet";

const NamespaceMemberList = () => {
  const { id: namespaceId } = useParams();
  const { toast } = useToast();
  const {
    data: memberData,
    error,
    isLoading,
  } = useGetNamespaceMembersQuery(namespaceId as string, {
    skip: !namespaceId,
  });

  const [removeUser, { error: removeError }] =
    useRemoveUserFromNamespaceMutation();

  const handleRemoveUser = async (id: string) => {
    try {
      await removeUser({ userId: id, namespaceId: namespaceId }).unwrap();
    } catch (error) {
      toast({
        description: "Failed to remove user",
      });
    }
  };

  return (
    <SheetContent className="w-120">
      <SheetHeader>
        <SheetTitle>Member List</SheetTitle>
      </SheetHeader>
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
              <div className="text-xs">{member.role}</div>
              <BaseButton
                variant="destructive"
                size="sm"
                content="Remove"
                overrideStyles="px-2"
                onClick={() => handleRemoveUser(member.id)}
              />
            </div>
          ))}
        </div>
      )}
    </SheetContent>
  );
};

export default NamespaceMemberList;
