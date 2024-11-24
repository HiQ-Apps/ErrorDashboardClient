import { useDispatch } from "react-redux";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { setGroupBy } from "features/aggregateTableSlice";

const ParameterSelector = () => {
  const dispatch = useDispatch();

  const handleSelect = (value: string) => {
    dispatch(setGroupBy(value));
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a grouping" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="message">Error Message</SelectItem>
          <SelectItem value="line">Line</SelectItem>
          <SelectItem value="tags">Tag</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ParameterSelector;
