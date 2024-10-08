import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import style from "./NullLayout.module.scss";

interface NullLayoutProps {
  children: ReactNode;
}

const NullLayout: React.FC<NullLayoutProps> = ({ children }) => {
  // const isLoggedIn =
  //   localStorage.getItem("AccessToken") !== null &&
  //   localStorage.getItem("RefreshToken") !== null;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/") {
  //     const toastMessage = "Vui lòng đăng nhập để truy cập trang.";
  //     navigate("/login", { state: { toastMessage } });
  //   }
  // }, [isLoggedIn, navigate, location.pathname]);

  return (
    // wrapper
    <Flex className={style.Wrapper}>
      {/* container */}
      <Flex w="100%">
        <Flex className={style.Container} overflow="hidden">
          <Flex className={style.Children}>{children}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NullLayout;
