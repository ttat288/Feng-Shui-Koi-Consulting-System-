import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import style from "./DefaultLayout.module.scss";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  // const isLoggedIn =
  //   localStorage.getItem("AccessToken") !== null &&
  //   localStorage.getItem("RefreshToken") !== null;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     !isLoggedIn &&
  //     location.pathname !== "/login" &&
  //     location.pathname !== "/"
  //   ) {
  //     const toastMessage = "Vui lòng đăng nhập để truy cập trang.";
  //     navigate("/login", { state: { toastMessage } });
  //   }
  // }, [isLoggedIn, navigate, location.pathname]);

  return (
    // wrapper
    <Flex className={style.Wrapper}>
      {/* container */}
      <Flex w="100%">
        <Flex className={style.Container}>
          <Header />
          <Flex className={style.Container}>
            <Flex width="100%" justifyContent="center">
              <Flex minHeight="300px" width="100%" justifyContent="center">
                {children}
              </Flex>
            </Flex>
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
