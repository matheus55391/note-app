import React from "react";

export interface NoteCardProps {
  id: string;
  title: string;
  time: string;
  additionalText?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  time = "00:00",
  additionalText,
  isSelected = false,
  onSelect,
}) => (
  <div
    className={`p-4 rounded-lg ${isSelected ? "bg-yellow-300" : "bg-gray-900"} max-w-sm cursor-pointer `}
    onClick={() => onSelect(id)}
  >
    <h3 className="font-semibold text-lg dark:text-red-600 light:text-blue-500">
      {title}
    </h3>
    <div className="space-x-2">
      <span className="text-sm font-semibold">{time}</span>
      <span className="text-sm">{additionalText || "No additional text"}</span>
    </div>
  </div>
);

export default NoteCard;
