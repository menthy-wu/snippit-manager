import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Verification from "./Verification";
import Error from "./Error";

const Login = () => {
  const [userCode, setUserCode] = useState<string>("");
  const { setTheme } = useTheme();
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "login") {
      setUserCode(data.body.user_code);
    }
    if (data.command === "set-theme") {
      setTheme(data.body === 2 ? "dark" : "light");
    }
    if (data.command === "error") {
      setUserCode("");
    }
  };
  useEffect(() => {
    window.addEventListener("message", (event) => {
      handleListener(event);
    });

    return () => {
      window.removeEventListener("message", (event) => {
        handleListener(event);
      });
    };
  }, []);

  return <div>{userCode ? <Verification code={userCode} /> : <Error />}</div>;
};

export default Login;
