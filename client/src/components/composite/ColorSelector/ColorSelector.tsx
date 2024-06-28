interface ColorSelectorProps {
  selectedColor: string;
  setColor: (color: string) => void;
}

export const colorList = [
  { background: "#098585", text: "white" },
  { background: "#000000", text: "white" },
  { background: "#808080", text: "white" },
  { background: "#A9A9A9", text: "white" },
  { background: "#D3D3D3", text: "black" },
  { background: "#DCDCDC", text: "black" },
  { background: "#F5F5F5", text: "black" },
  { background: "#FFFFFF", text: "black" },
  { background: "#2F4F4F", text: "white" },
  { background: "#778899", text: "white" },
];

const ColorSelector = ({ selectedColor, setColor }: ColorSelectorProps) => {
  return (
    <div className="flex flex-row space-x-2">
      {colorList.map((color, index) => (
        <div
          key={index}
          className={`border border-2 rounded-full h-5 w-5 cursor-pointer ${
            selectedColor === color.background
              ? "border-green-500"
              : "border-slate-900"
          }`}
          style={{
            backgroundColor: color.background,
            color: color.text,
          }}
          onClick={() => setColor(color.background)}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
