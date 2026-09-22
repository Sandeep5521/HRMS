import { useState,createContext } from "react";
import Auth from "./components/Auth";
import Notification from "./components/Notification";

const NotificationContext = createContext<(context: { show: boolean; message: string; type: NotificationType }) => void>(() => {});
type NotificationType = "success" | "error" | "info" | "warning";

function App() {
  const [Page, setPage] = useState("auth"); // State to manage the current page (login or register)
  const [NotifyPopup, setNotifyPopup] = useState<{
    show: boolean;
    message: string;
    type: NotificationType;
  }>({ show: false, message: "", type: "success" }); // State to manage notification visibility and content
  
  const handlePageChange = (newPage: string) => {
    setPage(newPage);
  }
  
  const handleNotificationChange = (context: { show: boolean; message: string; type: NotificationType }) => {
    console.log('Notification context changed:', context);
    setNotifyPopup(context);
  }

  const PageLoad = () => {
    if (Page === "auth") return <Auth/>; // Render Login component if Page state is "login"
    return <></> // Render ForgotPassword component if Page state is "forgotPassword"
  }

  return (
    <>
      <Notification
        show={NotifyPopup.show}
        message={NotifyPopup.message}
        type={NotifyPopup.type}
        duration={4000}
        placement="top-center"
        onClose={() => setNotifyPopup({ ...NotifyPopup, show: false })}
      />
      <NotificationContext value={handleNotificationChange}>
        <PageLoad/>
      </NotificationContext>
    </>
  );
}

export default App;
export { NotificationContext };