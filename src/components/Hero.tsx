import { Brain, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="flex items-center gap-3 animate-float">
            <Brain className="w-16 h-16 text-primary-foreground" />
            <Sparkles className="w-8 h-8 text-accent-glow" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Your AI-Powered
            <br />
            <span className="text-secondary-glow">Knowledge Base</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl">
            Upload notes, PDFs, and documents. Ask questions. Get instant AI-powered answers with semantic search.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="px-6 py-3 bg-primary-foreground/20 backdrop-blur-sm rounded-lg border border-primary-foreground/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-glow rounded-full animate-pulse-glow" />
                <span className="text-primary-foreground font-medium">Neural Network Search</span>
              </div>
            </div>
            <div className="px-6 py-3 bg-primary-foreground/20 backdrop-blur-sm rounded-lg border border-primary-foreground/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-glow rounded-full animate-pulse-glow" />
                <span className="text-primary-foreground font-medium">Multi-Language Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
