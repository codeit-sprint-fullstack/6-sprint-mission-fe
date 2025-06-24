import Image from "next/image";
import xImageIcon from "@/assets/images/icons/ic_x.png";

interface TagCardProps {
  tagName: string;
  deleteTagFn?: () => void;
}

export default function TagCard({ tagName, deleteTagFn }: TagCardProps) {
  return (
    <span className="bg-gray-100 rounded-3xl flex justify-center items-center px-3 py-2 text-gray-800 gap-1 w-fit">
      <p>#{tagName}</p>
      {deleteTagFn && (
        <Image
          className="w-5 h-auto object-cover"
          src={xImageIcon}
          alt="deleteTagButton"
          onClick={() => deleteTagFn()}
        />
      )}
    </span>
  );
}
