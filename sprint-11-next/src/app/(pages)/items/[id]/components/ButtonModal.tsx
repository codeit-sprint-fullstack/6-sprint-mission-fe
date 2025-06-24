interface Props {
  onDeleteClick: () => void;
  onEditClick: () => void;
}

function ButtonModal({ onDeleteClick, onEditClick }: Props) {
  return (
    <div className="absolute z-50 flex flex-col border border-gray-200 rounded-[10px] w-[127px] bg-white shadow-md [&>button]:h-10">
      <button
        className="border-b border-gray-300"
        onClick={() => {
          onEditClick();
        }}
      >
        수정하기
      </button>
      <button
        onClick={() => {
          onDeleteClick();
        }}
      >
        삭제하기
      </button>
    </div>
  );
}

export default ButtonModal;
