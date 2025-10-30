import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SignUpImage from "../../../assets/undraw_secure-login_m11a.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { auth } from "../../../firebase";
export default function SignInModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      ).then(({ user }) => {
        setUser(user);
        const notify = () => toast.success("Logging you in!");
        notify();
        router.push("/dashboard");
      });
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Toaster />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md sm:-translate-y-20 relative"
      >
        <h2 className="text-2xl font-bold text-[#2f4858] mb-4">Sign In</h2>

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
            <p className=" text-sm text-pink-600">
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
            className="w-full h-12 py-3 bg-[#00bf91] text-white rounded-md hover:bg-[#00a47c] transition-all font-semibold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed relative"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="w-9 h-9 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <button
          onClick={() => onClose(false)}
          className="absolute top-1 right-5 mt-4 text-sm text-gray-500 hover:text-[#00bf91]"
        >
          <IoMdClose className="text-gray-500 hover:text-gray-700 rounded-full text-2xl cursor-pointer" />
        </button>
      </motion.div>
    </div>
  );
}
