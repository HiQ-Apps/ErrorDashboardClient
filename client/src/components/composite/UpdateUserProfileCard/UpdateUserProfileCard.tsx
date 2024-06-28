import { Card, CardHeader, CardContent } from "components/ui/card";
import { UpdateUserProfileForm } from "forms/UpdateUserProfileForm";

const UpdateUserProfileCard = () => {
  return (
    <Card className="mr-4">
      <CardHeader>Update User Profile</CardHeader>
      <CardContent>
        <UpdateUserProfileForm />
      </CardContent>
    </Card>
  );
};

export default UpdateUserProfileCard;
