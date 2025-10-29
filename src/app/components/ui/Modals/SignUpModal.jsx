import Image from "next/image";
import { motion } from "framer-motion";
import SignUpImage from "../../../assets/undraw_secure-login_m11a.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { auth } from "../../../firebase";
export default function SplitSignUp({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});

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
          const notify = () => toast.success("Logging you in!");
          notify();
          window.location.reload();
          localStorage.removeItem("budgetSetup");
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
            window.location.reload();
            localStorage.removeItem("budgetSetup");
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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-73">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl mx-auto shadow-2xl w-[90%] max-w-3xl flex flex-col-reverse sm:flex-row"
      >
        <div className="flex flex-col bg-[#00bf91]/10 justify-center items-center sm:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-[#2f4858]">
            Join Us Today!
          </h2>
          <p className="text-center mb-6 text-[#2f4858]">
            Create your free account and start tracking your finances smarter.
          </p>
          <Image
            src={SignUpImage}
            alt="Sign Up Illustration"
            className="w-64"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-8 md:px-8 w-full sm:w-1/2 relative">
          <h2 className="text-2xl font-semibold text-[#2f4858] mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-pink-500">{message}</div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded-md border border-gray-300 text-[#2f4858] ${
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
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={`w-full p-3 rounded-md border border-gray-300 text-[#2f4858] ${
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
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#00bf91] text-white rounded-[40px] hover:bg-[#00a47c] transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed relative"
            >
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="w-9 h-9 border-4 border-white border-dashed rounded-full animate-spin"></div>
                </div>
              ) : (
                <>{isLogin ? "Continue" : "Create account"}</>
              )}
            </button>
          </form>
          <button
            onClick={() => onClose(false)}
            className="mt-4 text-sm text-gray-500 hover:text-[#00bf91] cursor-pointer absolute top-1 right-5"
          >
            <IoMdClose className="text-gray-500 hover:text-gray-700 rounded-full text-2xl cursor-pointer" />
          </button>
          <div className="separator">
            <span className="pr-2 pl-[7px] text-sm">
              {isLogin ? "New to SaveSpend?" : "Already have an account?"}
            </span>
          </div>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer rounded-[40px] py-3 w-full bg-[#cafbe7] text-[#00bf91] font-semibold"
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
          <Toaster />
        </div>
      </motion.div>
    </div>
  );
}
