'use client'
import NavBar from "./components/Home/NavBar";
import LandingHeader from "./components/Home/LandingHeader";
import Features from "./components/Home/Features";
import Insights from "./components/Home/Insights";
import AiFeature from "./components/Home/AiFeature";
import Footer from "./components/Home/Footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);
  return (
    <>
      <NavBar />
      <LandingHeader />
      <Features />
      <Insights />
      <AiFeature />
      <Footer />
    </>
  );
}
