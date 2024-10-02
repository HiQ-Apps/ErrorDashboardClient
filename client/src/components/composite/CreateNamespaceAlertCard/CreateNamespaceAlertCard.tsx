import CreateNamespaceAlertForm from "forms/CreateNamespaceAlertForm";
import { Card, CardContent, CardHeader } from "components/ui/card";

const CreateNamespaceAlertCard = () => {
  return (
    <Card>
      <CardHeader>Namespace Alerts</CardHeader>
      <CardContent>
        <CreateNamespaceAlertForm />
      </CardContent>
    </Card>
  );
};

export default CreateNamespaceAlertCard;
