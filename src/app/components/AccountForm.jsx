import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
export default function AccountForm({ setStep, setIsLogin, isLogin }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});

  // Validation helpers
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPassword = (value) => value.length >= 6;

  const showError = (field) => {
    if (!touched[field]) return false;
    if (field === "email")
      return !isValidEmail(formData.email) && formData.email.length > 0;
    if (field === "password")
      return (
        !isValidPassword(formData.password) && formData.password.length > 0
      );
    return false;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    setMessage("");
    setLoading(true);
    e.preventDefault();
    try {
      if (isLogin) {
        setLoading(true);
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        ).then(({ user }) => {
          setUser(user);
          router.push("/dashboard");
        });
      } else {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        setLoading(true);
        const notify = () => toast.success("Your account was created!");
        notify();
        let num = 0;
        function timer2() {
          num++;
          if (num >= 2) {
            clearInterval(stopTimer2);
            setStep(2);
          }
        }
        timer2();
        const stopTimer2 = setInterval(timer2, 1500);
      }
    } catch (err) {
      setLoading(false);
      setMessage("No user found. Please try again");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <div className="flex flex-col-reverse md:flex-row border-b-2 border-[#F0F5FA] mb-7">
      <div className="md:w-[35%] p-5 bg-[#cafbe7] flex flex-col justify-center">
        <div className="bg-white py-[50px] px-[30px] rounded-[10px] min-h-[300px]">
          <div className="italic">
            "Whether it’s spotting a rise in food spending, comparing your
            monthly savings, or suggesting budget adjustments, this card turns
            raw data into actionable advice."
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center flex-2">
        <div className="pt-20 pb-10 sm:w-[500px] text-center">
          {isLogin ? (
            <div className="text-[32px] lg:text-5xl mb-4 lg:mb-5">
              Sign in to your <span className="text-[#00bf91]">account</span>
            </div>
          ) : (
            <>
              <div className="text-[32px] lg:text-5xl mb-4 lg:mb-5">
                Create an <span className="text-[#00bf91]">account</span>
              </div>
              <div className="px-10">
                Create an account in order to gain access to all SaveSpend
                applications
              </div>
            </>
          )}
        </div>
        <div className="sm:w-[450px] h-[550px] px-8">
          <div className="flex flex-col items-center sm:items-end relative">
            <form
              className="flex flex-col gap-4 sm:w-[90%] px-1"
              onSubmit={handleSubmit}
            >
              <div className="text-pink-500">{message}</div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border border-gray-300 h-12 pl-2 sm:text-sm focus:outline 
            ${
              showError("email")
                ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:outline-pink-500"
                : "border-gray-300 focus:border-[#00bf91] focus:outline-[#00bf91]"
            }`}
                />
                {showError("email") && (
                  <p className="mt-1 text-sm text-pink-600">
                    Please enter a valid email.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="passsword"
                  className="text-sm mb-1 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl h-12 border pl-2 focus:outline
            ${
              showError("password")
                ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:outline-pink-500"
                : "border-gray-300 focus:border-[#00bf91] focus:outline-[#00bf91]"
            }`}
                />
                {showError("password") && (
                  <p className="mt-1 text-sm text-pink-600">
                    Password must be at least 6 characters.
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative cursor-pointer rounded-[40px] h-10 w-full bg-[#00bf91] hover:bg-[#019c78] text-white text-sm font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center z-50">
                    <div className="w-9 h-9 border-4 border-white border-dashed rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div>{isLogin ? "Continue" : "Create account"}</div>
                )}
              </button>

              <div className="separator">
                <span className="pr-2 pl-[7px] text-sm">
                  {isLogin ? "New to SaveSpend?" : "Already have an account?"}
                </span>
              </div>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer rounded-[40px] h-10 w-full sm:w-[90%] bg-[#cafbe7] text-[#00bf91]  text-sm font-semibold mt-3"
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
