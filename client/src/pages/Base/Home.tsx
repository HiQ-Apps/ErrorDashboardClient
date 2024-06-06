import { useDispatch } from "react-redux";
import HomeSidebar from "components/composite/HomeSidebar/HomeSidebar";
import { useRefreshAccessTokenQuery } from "features/userApiSlice";
import { setUser, setToken, setIsAuthenticated } from "features/authSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useRefreshAccessTokenQuery(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.access_token));
      dispatch(setIsAuthenticated(true));
    }
  }, [isSuccess]);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <HomeSidebar />
      </div>
      <div className="flex-1 p-4">
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
