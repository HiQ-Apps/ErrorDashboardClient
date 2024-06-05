const TrashCan = () => {
  return (
    <div className="group trash-can flex flex-col justify-center items-center">
      <div className="lid w-1 h-1 bg-black transition-all duration-300 ease-out group-hover:bg-red-500" />
      <div className="lid w-6 h-1 bg-black transition-all duration-300 ease-out group-hover:bg-red-500 transform group-hover:translate-y-[-5px]" />
      <div className="can w-5 h-5 bg-black transition-all duration-300 ease-out group-hover:bg-red-500" />
    </div>
  );
};

export default TrashCan;
