import HomeSidebar from "components/composite/HomeSidebar/HomeSidebar";

const Home = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-4">
      <div className="col-span-1 p-4 bg-gray-200">
        <HomeSidebar />
      </div>
      <div className="col-span-3 p-4">
        <h1>Home</h1>
        <div className="some block grid"></div>
      </div>
    </div>
  );
};

export default Home;
