import { useParamsStore } from "@/hooks/store/useParamsStore";
import { ToggleGroup } from "../";

const toggleOptions = [
  {
    value: "4",
    label: "4",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white",
  },
  {
    value: "8",
    label: "8",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white",
  },
  {
    value: "12",
    label: "12",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white",
  },
];

const orderOptions = [
  {
    label: "Alphabetical",
    value: "make",
    icon: "ArrowDownAZ",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white text-xs font-bold",
  },
  {
    label: "End date",
    value: "endingSoon",
    icon: "Clock",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white text-xs font-bold",
  },
  {
    label: "Recently Added",
    value: "new",
    icon: "CircleStop",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white text-xs font-bold",
  },
];
const filterOptions = [
  {
    label: "Live auctions",
    value: "live",
    icon: "Flame",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white text-xs font-bold",
  },
  {
    label: "End < 6 hrs",
    value: "endingSoon",
    icon: "Hourglass",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white text-xs font-bold",
  },
  {
    label: "Completed",
    value: "finished",
    icon: "Clock9",
    className:
      "px-4 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white text-xs font-bold",
  },
];

const Filters = () => {
  const { pageSize, orderBy, filterBy, setParams } = useParamsStore();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
        <span className="uppercase text-sm mr-2 font-semibold text-gray-400">
          filter by
        </span>
        <ToggleGroup
          className="border border-gray-300 rounded-md"
          options={filterOptions}
          value={filterBy}
          onChange={(opt) => setParams({ filterBy: opt })}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
        <span className="uppercase text-sm mr-2 font-semibold text-gray-400">
          order by
        </span>
        <ToggleGroup
          className="border border-gray-300 rounded-md"
          options={orderOptions}
          value={orderBy}
          onChange={(opt) => setParams({ orderBy: opt })}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
        <span className="uppercase text-sm mr-2 font-semibold text-gray-400">
          page size
        </span>
        <ToggleGroup
          className="border border-gray-300 rounded-md"
          options={toggleOptions}
          value={String(pageSize)}
          onChange={(opt) => setParams({ pageSize: Number(opt) })}
          type="single"
        />
      </div>
    </div>
  );
};

export default Filters;
