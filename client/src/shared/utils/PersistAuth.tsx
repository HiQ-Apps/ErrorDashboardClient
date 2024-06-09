import { useDispatch, useSelector } from "react-redux";
import { useRefreshAccessTokenQuery } from "features/userApiSlice";
import {
  setUser,
  setToken,
  setIsAuthenticated,
  setRedirectTo,
  selectRedirectTo,
  clearAuth,
} from "features/authSlice";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PersistAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isSuccess, isError } = useRefreshAccessTokenQuery(null);
  const redirectTo = useSelector(selectRedirectTo);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.access_token));
      dispatch(setIsAuthenticated(true));
      if (redirectTo) {
        navigate(redirectTo);
        dispatch(setRedirectTo(null));
      }
    } else if (isError) {
      dispatch(clearAuth());
      if (location.pathname !== "/") {
        dispatch(setRedirectTo(location.pathname));
      }
      navigate("/");
    }
  }, [isSuccess, isError]);

  return null;
};

export default PersistAuth;
