interface TagProps {
  tag_key: string;
  tag_value: string;
}

const Tag = ({ tag_key, tag_value }: TagProps) => {
  return (
    <div className="my-1 text-slate-900 bg-slate-100 flex text-2xs py-1 border border-slate-600 justify-center text-center text-nowrap align-center items-center rounded-full dark:text-slate-900 dark:bg-slate-300">
      {tag_key}: {tag_value}
    </div>
  );
};

export default Tag;
