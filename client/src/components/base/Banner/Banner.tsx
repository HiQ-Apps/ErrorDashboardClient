interface BannerProps {
  text: string;
}

const Banner = ({ text }: BannerProps) => {
  return (
    <div className="text-xs w-full bg-orange-100 text-center flex justify-center items-center break-words py-6 px-12 z-51">
      {text}
    </div>
  );
};

export default Banner;
