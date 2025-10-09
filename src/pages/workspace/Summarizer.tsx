import { useState } from "react";
import { FileText, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Summarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [summaryType, setSummaryType] = useState("brief");

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to summarize");
      return;
    }

    setLoading(true);

    // TODO: Integrate with backend AI summarization (BART/T5)
    setTimeout(() => {
      setSummary(
        `This is a ${summaryType} AI-generated summary of your text. The actual summarization will use BART or T5 models to provide concise and accurate summaries of your materials.`
      );
      setLoading(false);
      toast.success("Summary generated!");
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Text <span className="text-accent">Summarizer</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate AI-powered summaries of your materials
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-accent/20 animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Input Text</CardTitle>
                  <CardDescription>Paste or type your content</CardDescription>
                </div>
              </div>
              <Select value={summaryType} onValueChange={setSummaryType}>
                <SelectTrigger className="w-[140px] border-accent/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Brief</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="bullet">Bullet Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter the text you want to summarize..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={12}
              className="border-accent/20 focus:border-accent resize-none"
            />
            <Button
              onClick={handleSummarize}
              disabled={loading}
              variant="accent"
              className="w-full"
            >
              <Sparkles className="w-4 h-4" />
              {loading ? "Generating..." : "Generate Summary"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20 animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <CardTitle>AI Summary</CardTitle>
                  <CardDescription>Generated summary output</CardDescription>
                </div>
              </div>
              {summary && (
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {summary ? (
              <div className="p-4 bg-muted/50 rounded-lg min-h-[300px] border border-accent/10">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-lg min-h-[300px] border border-accent/10 flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Your AI-generated summary will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-accent/20 mt-6 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">AI-Powered Summarization</h3>
              <p className="text-sm text-muted-foreground">
                Our summarizer uses advanced neural network models (BART/T5) to generate accurate
                and concise summaries. Choose between brief overviews, detailed summaries, or
                bullet-point formats to suit your needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summarizer;
