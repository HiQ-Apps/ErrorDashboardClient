import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useVerifyUserMutation } from "features/userApiSlice";
import { useToast } from "components/ui/use-toast";
import { LoadingCard } from "components/base";

const VerifyUser = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!id) {
    throw new Error("Invalid User");
  }

  const [verifyUser, { isLoading }] = useVerifyUserMutation();

  useEffect(() => {
    try {
      verifyUser(id).unwrap();
      toast({
        title: "User verified successfully",
      });
    } catch {
      toast({
        title: "Failed to verify user",
      });
    }
    navigate("/");
  }, []);

  return (
    <div>
      <h1>Verifying User...</h1>
      {isLoading && <LoadingCard />}
    </div>
  );
};

export default VerifyUser;
