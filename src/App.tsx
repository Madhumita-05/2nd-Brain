import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthPage from "./pages/AuthPage";
import WorkspaceLayout from "./components/WorkspaceLayout";
import Upload from "./pages/workspace/Upload";
import Search from "./pages/workspace/Search";
import Speech from "./pages/workspace/Speech";
import Chatbot from "./pages/workspace/Chatbot";
import Summarizer from "./pages/workspace/Summarizer";
import QuizGenerator from "./pages/workspace/QuizGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/workspace" element={<WorkspaceLayout />}>
              <Route index element={<Navigate to="/workspace/upload" replace />} />
              <Route path="upload" element={<Upload />} />
              <Route path="search" element={<Search />} />
              <Route path="speech" element={<Speech />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="summarizer" element={<Summarizer />} />
              <Route path="quiz" element={<QuizGenerator />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
