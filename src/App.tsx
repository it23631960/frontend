import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { SalonSection } from "./components/SalonSection";
import { Footer } from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

export function App() {
  const navigate = useNavigate();

  const handleHairSalonClick = () => {
    navigate("/hair-salons");
  };

  return (
    <ErrorBoundary>
      <div className="relative bg-gradient-to-b from-purple-900 to-pink-900 text-white font-[Inter] overflow-x-hidden">
        <Header />
        <main>
          <HeroSection />
          <SalonSection
            id="hair"
            title="Hair Salons"
            description="Professional hair care and styling"
            buttonText="Find Hair Salons"
            videoSrc="/videos/hair-salon-services.mp4"
            align="left"
            services={["Haircuts", "Coloring", "Styling", "Treatments"]}
            onButtonClick={handleHairSalonClick}
          />
          <SalonSection
            id="barber"
            title="Barber Shops"
            description="Traditional and modern men's grooming"
            buttonText="Find Barber Shops"
            videoSrc="/videos/barber-shop-grooming.mp4"
            align="right"
            services={["Haircuts", "Beard Care", "Hot Towel Shaves", "Styling"]}
          />
          <SalonSection
            id="nail"
            title="Nail Salons"
            description="Complete nail care and artistry"
            buttonText="Find Nail Salons"
            videoSrc="/videos/nail-salon-artistry.mp4"
            align="center"
            services={["Manicures", "Pedicures", "Nail Art", "Gel Extensions"]}
          />
          <SalonSection
            id="bridal"
            title="Bridal Salons"
            description="Make your special day perfect"
            buttonText="Find Bridal Services"
            videoSrc="/videos/bridal-salon-makeup.mp4"
            align="left"
            services={[
              "Bridal Makeup",
              "Hair Styling",
              "Wedding Packages",
              "Trials",
            ]}
          />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
