import { useState } from "react";

function App() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [User, setUser] = useState('');
  const [IsEmailInvalid, setIsEmailInvalid] = useState(false);

  const handleLoginSubmit = async () => {
    // Handle login logic here
    console.log('Login button clicked');
    console.log('Email:', Email, 'Password:', Password, 'User:', User);

    try {
      let response = await fetch("https://localhost:7074/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: User,
          password: Password
        })
      });
      response = await response.json();
      console.log('Login response:', response);
      alert('Login successful!'); // Display success message
    }
    catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your credentials.'); // Display error message
    }
  }

  const handleEmailExists = async (): Promise<boolean> => {
    // Handle email exists logic here
    console.log('Checking if email exists:', Email);
    try {
      let response = await fetch(`https://localhost:7074/user?email=${Email}`);
      const data = await response.json();
      if (data.result === "Success") {
        setUser(data.value); // Set the user value from the response
        console.log('Email exists:', data);
        alert('Email exists!'); // Display success message
        setIsEmailInvalid(false); // Reset email invalid state
        return true; // Email exists
      }
      else{
        console.error('Email does not exist:', data);
        alert('Email does not exist!'); // Display error message
        setIsEmailInvalid(true);
        return false; // Email does not exist
      }
    }
    catch (error) {
      console.error('Email exists check failed:', error);
      alert('Error occurred while checking email existence.'); // Display error message
      return false;
    }
  };

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
        <div className="w-full max-w-md mx-auto">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Sign in
            </h2>
            <p className="mt-2 text-gray-500">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault();
            handleLoginSubmit();
          }}>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                aria-invalid={IsEmailInvalid}
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                    text-gray-800 outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500 aria-invalid:text-red-600 autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800"
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission on Enter key
                    const emailExists = await handleEmailExists();
                    if (emailExists) {
                      document.getElementById('password')?.focus();
                    }
                    console.log('Email:', Email, 'Password:', Password, 'User:', User);
                  }
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                    text-gray-800 outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500 aria-invalid:text-red-600 autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800 "
              />
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600
                      focus:ring-blue-500"
                />
                Remember me
              </label>

              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3
                  font-semibold text-white shadow-md transition
                  hover:bg-blue-700 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>

          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} HRMS. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  );
}

export default App;