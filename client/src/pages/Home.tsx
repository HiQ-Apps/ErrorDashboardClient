import HomeSidebar from "components/composite/HomeSidebar/HomeSidebar";

const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <HomeSidebar />
      </div>
      <div className="absolute right-0 col-span-3 p-4">
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
