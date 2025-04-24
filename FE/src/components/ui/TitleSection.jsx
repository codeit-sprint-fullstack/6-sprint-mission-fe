export default function TitleSection({ titleText, buttonStyle }) {
  return (
    <div className="flex items-center justify-between p-4">
      <p className="text-xl-bold">{titleText}</p>
      {buttonStyle}
    </div>
  );
}
