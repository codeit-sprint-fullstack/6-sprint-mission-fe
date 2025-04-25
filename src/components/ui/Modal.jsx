function Modal({ message, setIsModalOpen }) {
  return (
    <div className="flex justify-center items-center w-full h-full fixed top-0 left-0 z-100 bg-black/70">
      <div className="flex flex-col justify-center items-center w-[327px] h-[220px] rounded-lg bg-white gap-[42px]">
        <p className="font-medium">{message}</p>
        <button
          type="button"
          className="btn-base w-30 h-12"
          onClick={(prev) => setIsModalOpen(!prev)}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default Modal;
