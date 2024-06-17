interface TagProps {
  key: string;
  value: string;
}

const Tag = ({ key, value }: TagProps) => {
  return (
    <div className="text-slate-50 bg-slate-500 h-6 flex text-2xs px-6 border justify-center text-center align-center items-center rounded-full dark:text-slate-900 dark:bg-slate-300">
      {key}: {value}
    </div>
  );
};

export default Tag;
