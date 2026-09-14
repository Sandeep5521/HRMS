import { useRef } from "react";

type RegisterProps = {
  onBack?: () => void;
};

const Register = ({ onBack }: RegisterProps) => {
  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const SubmitbtnRef = useRef<HTMLButtonElement>(null);

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
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition autofill:shadow-[inset_0_0_0_1000px_#fff] autofill:text-gray-800"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault(); // Prevent form submission on Enter key
                  EmailRef.current?.focus();
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
                       transition duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;