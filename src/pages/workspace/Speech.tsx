import { useState } from "react";
import { Mic, Volume2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const LANGUAGES = [
  { code: "en-US", name: "English" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "hi-IN", name: "Hindi" },
  { code: "ja-JP", name: "Japanese" },
];

const Speech = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [transcribedText, setTranscribedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeechToText = () => {
    // TODO: Integrate Azure Speech-to-Text SDK
    setIsListening(!isListening);
    
    if (!isListening) {
      toast.info("Speech-to-text started (Azure SDK integration pending)");
      setTimeout(() => {
        setTranscribedText("This is a sample transcription. Azure Speech SDK will be integrated here.");
        setIsListening(false);
      }, 2000);
    } else {
      toast.info("Speech-to-text stopped");
    }
  };

  const handleTextToSpeech = () => {
    // TODO: Integrate Azure Text-to-Speech SDK
    if (!transcribedText.trim()) {
      toast.error("No text to read");
      return;
    }

    setIsSpeaking(true);
    toast.info("Text-to-speech started (Azure SDK integration pending)");
    
    setTimeout(() => {
      setIsSpeaking(false);
      toast.success("Text-to-speech completed");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Voice <span className="text-accent">Interaction</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Speak your queries or listen to results in multiple languages
        </p>
      </div>

      <Card className="bg-gradient-card border-accent/20 hover:shadow-accent transition-smooth animate-slide-up">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle>Azure Speech Services</CardTitle>
                <CardDescription>Multi-language speech-to-text and text-to-speech</CardDescription>
              </div>
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px] border-accent/20">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Transcribed / Input Text</label>
            <Textarea
              placeholder="Transcribed text will appear here, or type your text manually..."
              value={transcribedText}
              onChange={(e) => setTranscribedText(e.target.value)}
              rows={6}
              className="border-accent/20 focus:border-accent resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button
              onClick={handleSpeechToText}
              variant="speech"
              className="w-full"
              disabled={isSpeaking}
            >
              <Mic className={`w-5 h-5 ${isListening ? "animate-pulse-glow" : ""}`} />
              {isListening ? "Stop Listening" : "Start Speech-to-Text"}
            </Button>

            <Button
              onClick={handleTextToSpeech}
              variant="accent"
              className="w-full"
              disabled={isListening || !transcribedText.trim()}
            >
              <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-pulse-glow" : ""}`} />
              {isSpeaking ? "Speaking..." : "Read Text Aloud"}
            </Button>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Azure Speech SDK integration requires subscription key and region. 
              Add your credentials to enable full functionality.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Speech;
