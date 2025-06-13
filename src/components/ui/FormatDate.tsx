import dayjs from "dayjs";

function FormatDate({ createdAt }: { createdAt: Date }) {
  const formattedDate = dayjs(createdAt).format("YYYY. MM. DD");

  return <div className="text-gray-400">{formattedDate}</div>;
}

export default FormatDate;
