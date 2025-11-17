import { BBSCard } from "./BBSCard";
import { BBSData } from "../types/types";

interface BBSDataListProps {
  bbsAllData: BBSData[];
}

export const BBSCardList = ({ bbsAllData }: BBSDataListProps) => {
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {bbsAllData.map((bbsData: BBSData) => (
        <BBSCard key={bbsData.id} bbsData={bbsData} />
      ))}
    </div>
  );
};