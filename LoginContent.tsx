import { useContext } from "react/cjs/react.production";
import AuthContext from "./authContext";

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLoginSuccess = (data: LoginResponses) => {
    login({
      token: data.token,
      user: {
        userId: String(data.userId),
        email: data.email,
        nickname: data.nickname,
      },
    });
  };
  const { mutate } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data: LoginResponses) => {
      handleLoginSuccess(data);
      showToast({
        type: "success",
        message: "로그인 성공",
      });
      navigate("/");
    },
    onError:{
        (error:any)=>{
            const response=error.response as AxiosResponse;
            const code = response.data.code;
            const ErrorMessage = getErrorMessage(code);
            showToast({ type: "error", message: ErrorMessage });
            console.error("Login Error:", error);
          },
        });
        return { mutate };
      };