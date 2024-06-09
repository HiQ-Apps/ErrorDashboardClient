import UpdateNamespaceForm from "forms/UpdateNamespaceForm";
import { Card, CardHeader } from "components/ui/card";

const UpdateNamespaceCard = () => {
  return (
    <Card className="pb-16 mr-4 dark:text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <CardHeader>Update Namespace</CardHeader>
      <UpdateNamespaceForm />
    </Card>
  );
};

export default UpdateNamespaceCard;
