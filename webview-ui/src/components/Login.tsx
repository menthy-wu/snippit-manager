import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Login = () => {
  const [userCode, setUserCode] = useState<string>("");
  const { setTheme } = useTheme();
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "login") {
      setUserCode(data.body.user_code);
    }
    if (data.command === "set-theme") {
      console.log("set-theme");
      setTheme(data.body === 2 ? "dark" : "light");
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

  return (
    <div>
      {userCode
        ? `Login github use this code ${userCode}`
        : "something went wrong, please reload window"}
    </div>
  );
};

export default Login;
