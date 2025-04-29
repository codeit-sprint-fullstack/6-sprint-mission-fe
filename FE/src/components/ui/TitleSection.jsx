export default function TitleSection({ titleText, buttonStyle }) {
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-xl-bold">{titleText}</p>
      {buttonStyle}
    </div>
  );
}
