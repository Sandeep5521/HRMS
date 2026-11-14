import { useRef, useState,useContext } from "react";
import { NotificationContext } from "../App";

type RegisterProps = {
  onBack?: () => void;
};

const Register = ({ onBack }: RegisterProps) => {
  const [User, setUser] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [IsUserInvalid, setIsUserInvalid] = useState(false);
  const [IsUserInvalidMessage, setIsUserInvalidMessage] = useState('');
  const [IsEmailInvalid, setIsEmailInvalid] = useState(false);
  const [IsEmailInvalidMessage, setIsEmailInvalidMessage] = useState('');
  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const SubmitbtnRef = useRef<HTMLButtonElement>(null);
  const ShowNotification = useContext(NotificationContext);

  const handleUserExists = async (): Promise<boolean> => {
    // Handle user exists logic here
    console.log('Checking if user exists:', User);
    try {
      let response = await fetch(`https://localhost:7074/user?name=${User}`);
      const data = await response.json();
      if (data.value === true) {
        console.log('User exists:', data);
        //alert('User exists!'); // Display success message
        //ShowNotification({ show: true, message: "User exists!", type: "error" }); // Show notification for user existing
        setIsUserInvalid(true); // Reset user invalid state
        setIsUserInvalidMessage('🛑 Username is already taken.');
        return false; // User exists
      }
      else {
        console.error('User does not exist:', data);
        //ShowNotification({ show: true, message: "User does not exist!", type: "error" }); // Show notification for user not existing
        setIsUserInvalid(false);
        return true; // User does not exist
      }
    }
    catch (error) {
      console.error('User exists check failed:', error);
      //ShowNotification({ show: true, message: "Error occurred while checking user existence.", type: "error" }); // Show notification for error
      setIsUserInvalid(true);
      setIsUserInvalidMessage('🛑 Error occurred while checking user existence.');
      return false;
    }
  };

  const handleEmailExists = async (): Promise<boolean> => {
    // Handle user exists logic here
    console.log('Checking if email exists:', Email);
    try {
      let response = await fetch(`https://localhost:7074/user?email=${Email}`);
      const data = await response.json();
      if (data.value != '') {
        console.log('Email exists:', data);
        //alert('Email exists!'); // Display success message
        //ShowNotification({ show: true, message: "Email exists!", type: "error" }); // Show notification for email existing
        setIsEmailInvalid(true); // Reset email invalid state
        setIsEmailInvalidMessage('🛑 This Email is already registered.');
        return true; // Email exists
      }
      else {
        console.error('Email does not exist:', data);
        //ShowNotification({ show: true, message: "Email does not exist!", type: "error" }); // Show notification for email not existing
        setIsEmailInvalid(false);
        return false; // Email does not exist
      }
    }
    catch (error) {
      console.error('Email exists check failed:', error);
      //ShowNotification({ show: true, message: "Error occurred while checking email existence.", type: "error" }); // Show notification for error
      setIsEmailInvalid(true);
      setIsEmailInvalidMessage('🛑 Error occurred while checking email existence.');
      return true;
    }
  };

  const handleRegister = async (): Promise<boolean> => {
    // Handle user exists logic here
    console.log('Data before registration:', User, Email, Password);
    try {
      let response = await fetch(`https://localhost:7074/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: User, email: Email, password: Password })
      });
      const data = await response.json();
      if (data.value === true) {
        console.log('Registration successful:', data);
        //alert('Registration successful!'); // Display success message
        ShowNotification({ show: true, message: "Registration successful!", type: "success" }); // Show notification for successful registration
        return true; // Registration successful
      }
      else {
        console.error('Registration failed:', data);
        //ShowNotification({ show: true, message: "Registration failed!", type: "error" }); // Show notification for registration failure
        return false; // Registration failed
      }
    }
    catch (error) {
      console.error('Registration failed:', error);
      //ShowNotification({ show: true, message: "Error occurred while registering.", type: "error" }); // Show notification for error
      return false;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">
            Register to access the HRMS portal
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={User}
              pattern={"[^@]+"}
              placeholder="Enter username"
              aria-invalid={IsUserInvalid}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800 aria-invalid:border-red-500 aria-invalid:text-red-600"
              onKeyDown={async (e) => {
                if (e.key === '@' || e.key === ' ' || e.key === '.') {
                  e.preventDefault(); // Prevent '@' and space characters
                }
                if (e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault(); // Prevent form submission on Enter key
                  const userExists = await handleUserExists();
                  if (userExists) {
                    console.log('User does not exist, moving to email field');
                    EmailRef.current?.focus();
                  }
                }
              }
              }
            />
            <p className={`mt-1 h-2 text-sm ${IsUserInvalid ? 'text-red-600' : 'text-gray-500 hidden'}`}>
              {IsUserInvalid ? IsUserInvalidMessage : ''}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              ref={EmailRef}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={Email}
              placeholder="Enter email"
              aria-invalid={IsEmailInvalid}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800 aria-invalid:border-red-500 aria-invalid:text-red-600"
              onKeyDown={async (e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault(); // Prevent form submission on Enter key
                  const emailExists = await handleEmailExists();
                  if (emailExists) {
                    console.log('Email does not exist, moving to email field');
                    EmailRef.current?.focus();
                  }
                  else PasswordRef.current?.focus();
                }
              }
              }
            />
            <p className={`mt-1 h-2 text-sm ${IsEmailInvalid ? 'text-red-600' : 'text-gray-500 hidden'}`}>
              {IsEmailInvalid ? IsEmailInvalidMessage : ''}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              ref={PasswordRef}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={Password}
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission on Enter key
                  SubmitbtnRef.current?.click(); // Submit the form when Enter is pressed on the password field
                }
                else if (e.key === 'Tab') {
                  // Allow default tab behavior to move focus to the next element
                }
              }
              }
            />
          </div>

          {/* Register Button */}
          <button
            ref={SubmitbtnRef}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3 rounded-xl
                       transition duration-300 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;