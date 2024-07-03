import { useEffect, useState } from "react";

const Login = () => {
  const [userCode, setUserCode] = useState<string>("");
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "login") {
      setUserCode(data.body.user_code);
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
