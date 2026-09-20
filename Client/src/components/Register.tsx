import { useRef, useState } from "react";

type RegisterProps = {
  onBack?: () => void;
};

const Register = ({ onBack }: RegisterProps) => {
  const [User,setUser] = useState('');
  const [Email,setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [IsUserInvalid, setIsUserInvalid] = useState(false);
  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const SubmitbtnRef = useRef<HTMLButtonElement>(null);

  const handleUserExists = async (): Promise<boolean> => {
        // Handle user exists logic here
        console.log('Checking if user exists:', User);
        try {
            let response = await fetch(`https://localhost:7074/user?name=${User}`);
            const data = await response.json();
            if (data.value === true) {
                console.log('User exists:', data);
                alert('User exists!'); // Display success message
                setIsUserInvalid(true); // Reset user invalid state
                return false; // User exists
            }
            else {
                console.error('User does not exist:', data);
                setIsUserInvalid(false);
                return true; // User does not exist
            }
        }
        catch (error) {
            console.error('User exists check failed:', error);
            alert('Error occurred while checking user existence.'); // Display error message
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

        <form className="space-y-5" onSubmit={(e)=>{
          e.preventDefault();
        }}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              onChange={(e)=>{
                setUser(e.target.value);
              }}
              value={User}
              placeholder="Enter username"
              aria-invalid={IsUserInvalid}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800 aria-invalid:border-red-500 aria-invalid:text-red-600"
              onKeyDown={async (e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault(); // Prevent form submission on Enter key
                  const userExists = await handleUserExists();
                  if (userExists) {
                    console.log('User does not exist, moving to email field');
                    EmailRef.current?.focus();
                  }
                }}
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              ref={EmailRef}
              type="email"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              value={Email}
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault(); // Prevent form submission on Enter key
                  PasswordRef.current?.focus();
                }}
              }
            />
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
                else if(e.key === 'Tab'){
                  // Allow default tab behavior to move focus to the next element
                }}
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