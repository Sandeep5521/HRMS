import { useState,createContext } from "react";
import Auth from "./components/Auth";
import Notification from "./components/Notification";

const NotificationContext = createContext<(context: boolean) => void>(() => {});

function App() {
  const [Page, setPage] = useState("auth"); // State to manage the current page (login or register)
  const [show, setShow] = useState(false);
  const handlePageChange = (newPage: string) => {
    setPage(newPage);
  }
  
  const handleNotificationChange = (context:boolean) => {
    console.log('Notification context changed:', context);
    setShow(context);
  }

  const PageLoad = () => {
    if (Page === "auth") return <Auth/>; // Render Login component if Page state is "login"
    return <></> // Render ForgotPassword component if Page state is "forgotPassword"
  }

  return (
    <>
      <Notification
        show={show}
        message="Data saved successfully!"
        type="success"
        duration={4000}
        placement="top-center"
        onClose={() => setShow(false)}
      />
      <NotificationContext value={handleNotificationChange}>
        <PageLoad/>
      </NotificationContext>
    </>
  );
}

export default App;
export { NotificationContext };