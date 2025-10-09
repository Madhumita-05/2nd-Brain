import { useState } from "react";
import { Search, Sparkles, TrendingUp, Tag, MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface SearchResult {
  title: string;
  content: string;
  similarity: number;
  type: "note" | "pdf";
}

interface NNInsights {
  summary?: string;
  sentiment?: string;
  topics?: string[];
  answer?: string;
}

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [insights, setInsights] = useState<NNInsights>({});
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsSearching(true);
    
    // TODO: Connect to FastAPI backend /search
    // Simulate search results
    setTimeout(() => {
      setResults([
        {
          title: "Machine Learning Basics",
          content: "Introduction to neural networks and deep learning concepts...",
          similarity: 0.89,
          type: "note",
        },
        {
          title: "AI Research Paper.pdf",
          content: "Recent advances in transformer architectures and attention mechanisms...",
          similarity: 0.76,
          type: "pdf",
        },
      ]);

      setInsights({
        summary: "Your search relates to AI and machine learning fundamentals, particularly neural networks.",
        sentiment: "Positive",
        topics: ["Machine Learning", "Neural Networks", "Deep Learning", "AI"],
        answer: "Based on your knowledge base, machine learning involves training neural networks to recognize patterns in data.",
      });

      setIsSearching(false);
      toast.success("Search completed!");
    }, 1500);
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">
            AI-Powered <span className="text-secondary">Search</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ask questions and get intelligent answers from your knowledge base
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 animate-slide-up">
          <Card className="bg-gradient-card border-secondary/20 shadow-secondary">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Ask anything... e.g., 'What are neural networks?'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="border-secondary/20 focus:border-secondary text-lg"
                />
                <Button
                  onClick={handleSearch}
                  variant="secondary"
                  size="lg"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <Sparkles className="w-5 h-5 animate-pulse-glow" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-8">
            {/* NN Insights */}
            <Card className="bg-gradient-accent border-accent/30 shadow-accent animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.answer && (
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <p className="font-medium mb-1">Answer</p>
                        <p className="text-muted-foreground">{insights.answer}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  {insights.summary && (
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <p className="font-medium text-sm">Summary</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{insights.summary}</p>
                    </div>
                  )}

                  {insights.sentiment && (
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <p className="font-medium text-sm">Sentiment</p>
                      </div>
                      <Badge variant="secondary">{insights.sentiment}</Badge>
                    </div>
                  )}

                  {insights.topics && insights.topics.length > 0 && (
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-accent" />
                        <p className="font-medium text-sm">Topics</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {insights.topics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Search Results ({results.length})
              </h3>
              <div className="space-y-4">
                {results.map((result, idx) => (
                  <Card
                    key={idx}
                    className="bg-gradient-card hover:shadow-primary transition-smooth animate-slide-up"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{result.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {result.content}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={result.type === "note" ? "default" : "secondary"}
                          className="ml-4"
                        >
                          {result.type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Similarity:</span>
                        <div className="flex-1 max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-accent"
                            style={{ width: `${result.similarity * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {(result.similarity * 100).toFixed(0)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {results.length === 0 && !isSearching && (
          <div className="text-center py-12 animate-fade-in">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              Enter a query to search your knowledge base
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
