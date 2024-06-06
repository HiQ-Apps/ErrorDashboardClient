import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "features/errorBoundarySlice";

const useClearErrorOnNavigate = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location, dispatch]);
};

export default useClearErrorOnNavigate;
