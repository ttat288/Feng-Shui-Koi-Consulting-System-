import { Box, Portal, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { SidebarContext } from "../../components/Admin/contexts/SidebarContext";
import Footer from "../../components/Admin/footer/FooterAdmin";
import AdminNavbar from "../../components/Admin/navbar/NavbarAdmin";
import Sidebar from "../../components/Admin/sidebar/Sidebar";
// import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = ({ children }) => {
  const { ...rest } = children;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // const getActiveRoute = (routes) => {
  //   let activeRoute = "Default Brand Text";
  //   for (let i = 0; i < routes.length; i++) {
  //     if (routes[i].collapse) {
  //       let collapseActiveRoute = getActiveRoute(routes[i].items);
  //       if (collapseActiveRoute !== activeRoute) {
  //         return collapseActiveRoute;
  //       }
  //     } else if (routes[i].category) {
  //       let categoryActiveRoute = getActiveRoute(routes[i].items);
  //       if (categoryActiveRoute !== activeRoute) {
  //         return categoryActiveRoute;
  //       }
  //     } else {
  //       if (
  //         window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
  //       ) {
  //         return routes[i].name;
  //       }
  //     }
  //   }
  //   return activeRoute;
  // };

  // const getActiveNavbar = (routes) => {
  //   let activeNavbar = false;
  //   for (let i = 0; i < routes.length; i++) {
  //     if (routes[i].collapse) {
  //       let collapseActiveNavbar = getActiveNavbar(routes[i].items);
  //       if (collapseActiveNavbar !== activeNavbar) {
  //         return collapseActiveNavbar;
  //       }
  //     } else if (routes[i].category) {
  //       let categoryActiveNavbar = getActiveNavbar(routes[i].items);
  //       if (categoryActiveNavbar !== activeNavbar) {
  //         return categoryActiveNavbar;
  //       }
  //     } else {
  //       if (
  //         window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
  //       ) {
  //         return routes[i].secondary;
  //       }
  //     }
  //   }
  //   return activeNavbar;
  // };

  // const getActiveNavbarText = (routes) => {
  //   let activeNavbar = false;
  //   for (let i = 0; i < routes.length; i++) {
  //     if (routes[i].collapse) {
  //       let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
  //       if (collapseActiveNavbar !== activeNavbar) {
  //         return collapseActiveNavbar;
  //       }
  //     } else if (routes[i].category) {
  //       let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
  //       if (categoryActiveNavbar !== activeNavbar) {
  //         return categoryActiveNavbar;
  //       }
  //     } else {
  //       if (
  //         window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
  //       ) {
  //         return routes[i].messageNavbar;
  //       }
  //     }
  //   }
  //   return activeNavbar;
  // };

  // We assume that the children are passed in this layout
  const { onOpen } = useDisclosure();

  // Rendered content will be passed as children into the layout
  // const renderContent = () => {
  //   // Based on your route structure, you can use a condition to select which component to render
  //   const currentPath = window.location.pathname;
  //   // Example of dynamic content
  //   if (currentPath.startsWith("/admin")) {
  //     // Assuming you have components in the `/admin` path
  //     return (
  //       <Box>
  //         {/* Put the dynamic page content here */}
  //         <div>Admin Page Content</div>
  //       </Box>
  //     );
  //   }

  //   // Default content if no specific match is found
  //   return <div>Default Content</div>;
  // };

  return (
    <Box>
      <Box>
        <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
          <Sidebar display="none" />

          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: "100%", xl: "calc( 100% - 290px )" }}
            maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <AdminNavbar onOpen={onOpen} fixed={fixed} {...rest} />
              </Box>
            </Portal>

            {/* <AdminLayout> */}
            {/* {renderContent()} */}
            {children}
            {/* </AdminLayout> */}

            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
};

export default Dashboard;
