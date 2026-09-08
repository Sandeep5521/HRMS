import { useState } from "react";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgetPassword";
import Register from "./components/Register";

function App() {
  const [Page, setPage] = useState("login"); // State to manage the current page (login or register)
  
  const PageLoad = () => {
    if (Page === "login") return <Login onForgetPassword={() => {
      setPage('forgotPassword');
    }} onRegister={() => {
      setPage('register');
    }} />; // Render Login component if Page state is "login"
    else if (Page === "register") return <Register onBack={() => {
      setPage('login');
    }} />;
    else if (Page === "forgotPassword") return <ForgotPassword onBack={()=>{
      setPage('login');
    }} />; // Render ForgotPassword component if Page state is "forgotPassword"
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-white flex flex-col md:flex-row">

      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-blue-600 px-8 py-12 md:px-12 flex flex-col justify-center text-white">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold">H</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to HRMS
            </h1>

            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Manage your employees, attendance, payroll, leave, and
              everything related to human resources from one place.
            </p>
          </div>

          <div className="hidden md:block space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Employee Management</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Attendance & Leave Management</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Payroll Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login */}
      <div className="w-full md:w-1/2 px-6 py-10 sm:px-10 md:px-12 flex items-center">
        <PageLoad/>
      </div>
    </div>
  );
}

export default App;