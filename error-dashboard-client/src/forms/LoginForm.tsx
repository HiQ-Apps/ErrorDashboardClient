import BaseButton from "components/base/Button/Button";

const LoginForm = () => {
  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <BaseButton
        content="Login"
        onClick={handleLoginClick}
        variant="success"
        override_styles="border border-transparent text-white justify-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      />
    </form>
  );
};

export default LoginForm;
