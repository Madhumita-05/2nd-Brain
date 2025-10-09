import { useState } from "react";
import { Search as SearchIcon, Sparkles, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [insights, setInsights] = useState<NNInsights | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setLoading(true);

    // TODO: Integrate with FastAPI backend /search
    setTimeout(() => {
      setResults([
        {
          title: "Sample Note 1",
          content: "This is sample content matching your query...",
          similarity: 0.92,
          type: "note",
        },
        {
          title: "Sample PDF Document",
          content: "Extracted content from PDF related to your search...",
          similarity: 0.85,
          type: "pdf",
        },
      ]);

      setInsights({
        summary: "Your query relates to knowledge management and AI-powered search systems.",
        sentiment: "Neutral",
        topics: ["AI", "Search", "Knowledge Base"],
        answer: "Based on the materials, the answer to your query is...",
      });

      setLoading(false);
      toast.success("Search completed!");
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          AI-Powered <span className="text-accent">Search</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Semantic search across your knowledge base
        </p>
      </div>

      <Card className="bg-gradient-card border-accent/20 mb-6 animate-slide-up">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              placeholder="Ask a question or search your materials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border-accent/20 focus:border-accent"
            />
            <Button onClick={handleSearch} disabled={loading} variant="accent">
              <SearchIcon className="w-5 h-5" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {insights && (
        <Card className="bg-gradient-card border-accent/20 mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.summary && (
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-muted-foreground">{insights.summary}</p>
              </div>
            )}
            {insights.sentiment && (
              <div>
                <h3 className="font-semibold mb-2">Sentiment</h3>
                <Badge variant="secondary">{insights.sentiment}</Badge>
              </div>
            )}
            {insights.topics && insights.topics.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {insights.topics.map((topic, idx) => (
                    <Badge key={idx} variant="outline" className="border-accent/30">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {insights.answer && (
              <div>
                <h3 className="font-semibold mb-2">Answer</h3>
                <p className="text-muted-foreground">{insights.answer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            Search Results
          </h2>
          {results.map((result, idx) => (
            <Card
              key={idx}
              className="bg-gradient-card border-accent/20 hover:shadow-accent transition-smooth animate-fade-in"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-accent" />
                    <CardTitle className="text-lg">{result.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {(result.similarity * 100).toFixed(0)}% match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{result.content}</p>
                <Badge variant="outline" className="mt-3 border-accent/30">
                  {result.type}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && !insights && (
        <Card className="bg-gradient-card border-accent/20 animate-fade-in">
          <CardContent className="py-12 text-center">
            <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Start searching to find relevant materials
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;
