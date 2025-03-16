function handleError(err, req, res, next) {
  switch (err.name) {
    case "ValidationError":
      console.log("에러 처리가 잘 동작하네요");
      res.status(400).send({ message: "유효성 검증 실패하였습니다." });
      break;
    case "CastError":
      console.log("에러 처리가 잘 동작하네요");
      res.status(400).send({ message: "잘못된 데이터가 입력되었습니다." });
      break;
    case "ReferenceError":
      console.log("에러 처리가 잘 동작하네요");
      res.status(500).send({ message: "참조할 수 없습니다." });
      break;
    default:
      console.log("에러 처리가 잘 동작하네요");
      res.status(500).send({ message: "서버에서 오류가 발생했습니다." });
      break;
  }
}

export default handleError;
