import { ReactNode } from "react";

interface TitleSectionProps {
  titleText: string;
  buttonStyle?: ReactNode;
}

export default function TitleSection({ titleText, buttonStyle }: TitleSectionProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-xl-bold">{titleText}</p>
      {buttonStyle}
    </div>
  );
}
