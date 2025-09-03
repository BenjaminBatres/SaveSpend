import NavBar from "./components/NavBar";
import LandingHeader from "./components/LandingHeader";
import Features from "./components/Features";
import Insights from "./components/Insights";
import AiFeature from "./components/AiFeature";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <NavBar />
      <LandingHeader />
      <Features />
      <Insights/>
      <AiFeature/>
      <Footer/>
    </>
  );
}
