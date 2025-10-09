import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import SpeechSection from "@/components/SpeechSection";
import SearchSection from "@/components/SearchSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <UploadSection />
      <SearchSection />
      <SpeechSection />
    </div>
  );
};

export default Index;
