import CreateNamespaceAlertForm from "forms/CreateNamespaceAlertForm";
import { Card, CardContent, CardHeader } from "components/ui/card";

const CreateNamespaceAlertCard = () => {
  return (
    <Card className="mb-10 mr-4">
      <CardHeader>Add an alert</CardHeader>
      <CardContent>
        <CreateNamespaceAlertForm />
      </CardContent>
    </Card>
  );
};

export default CreateNamespaceAlertCard;
