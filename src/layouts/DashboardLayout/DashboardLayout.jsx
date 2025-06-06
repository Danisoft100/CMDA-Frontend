import { useEffect, useState } from "react";
import { classNames } from "~/utilities/classNames";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation";
import { useIsSmallScreen } from "~/hooks/useIsSmallScreen";
import BottomNav from "./BottomNav";
import { useGetNotificationStatsQuery } from "~/redux/api/notification/notificationApi";

const DashboardLayout = ({ withOutlet = true, children }) => {
  const isSmallScreen = useIsSmallScreen("750px");
  const [isSidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

  const toggleSidebar = () => {
    if (isSmallScreen) {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  useEffect(() => {
    if (!isSmallScreen) {
      setSidebarOpen(true); // Keep sidebar open on large screens
    } else {
      setSidebarOpen(false); // Default to closed on small screens
    }
  }, [isSmallScreen]);

  const { data: { unreadMessagesCount, unreadNotificationCount } = {} } = useGetNotificationStatsQuery(null, {
    pollingInterval: 900000,
  });

  return (
    <div className="bg-background">
      <Header unreadMessagesCount={unreadMessagesCount} unreadNotificationCount={unreadNotificationCount} />

      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          navLinks={NAV_LINKS}
          unreadMessagesCount={unreadMessagesCount}
        />
        <div
          className={classNames(
            isSidebarOpen && "md:ml-60",
            "flex-1 flex flex-col overflow-hidden transition-all duration-300"
          )}
        >
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-20 md:pb-6 mt-16">
            {withOutlet ? <Outlet /> : children}
          </main>
        </div>
      </div>

      <BottomNav navLinks={NAV_LINKS} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default DashboardLayout;
