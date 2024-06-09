import { useDispatch } from "react-redux";
import { useRefreshAccessTokenQuery } from "features/userApiSlice";
import {
  setUser,
  setToken,
  setIsAuthenticated,
  clearAuth,
} from "features/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersistAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess, isError } = useRefreshAccessTokenQuery(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.access_token));
      dispatch(setIsAuthenticated(true));
    } else if (isError) {
      dispatch(clearAuth());
    }
    navigate("/");
  }, [isSuccess, isError]);

  return null;
};

export default PersistAuth;
