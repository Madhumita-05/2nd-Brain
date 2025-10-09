import { useState } from "react";
import { Upload, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const UploadSection = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleNoteUpload = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    // TODO: Connect to FastAPI backend /upload/notes-multi
    toast.success("Note uploaded successfully! (Backend integration pending)");
    setNoteTitle("");
    setNoteContent("");
  };

  const handlePDFUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select at least one PDF file");
      return;
    }

    // TODO: Connect to FastAPI backend /upload/pdfs-multi
    toast.success(`${selectedFiles.length} PDF(s) uploaded! (Backend integration pending)`);
    setSelectedFiles(null);
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">
            Upload Your <span className="text-primary">Knowledge</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Add notes and PDFs to build your personal knowledge base
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Notes Upload */}
          <Card className="bg-gradient-card border-primary/20 hover:shadow-primary transition-smooth animate-slide-up">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Upload Notes</CardTitle>
                  <CardDescription>Add text notes with titles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Note Title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Note Content"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={6}
                  className="border-primary/20 focus:border-primary resize-none"
                />
              </div>
              <Button
                onClick={handleNoteUpload}
                variant="hero"
                className="w-full"
              >
                <Upload className="w-4 h-4" />
                Upload Note
              </Button>
            </CardContent>
          </Card>

          {/* PDF Upload */}
          <Card className="bg-gradient-card border-secondary/20 hover:shadow-secondary transition-smooth animate-slide-up">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <File className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle>Upload PDFs</CardTitle>
                  <CardDescription>Upload multiple PDF documents</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-secondary/30 rounded-lg p-8 text-center hover:border-secondary transition-smooth cursor-pointer">
                <Input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    {selectedFiles && selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : "Click to select PDFs"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or drag and drop files here
                  </p>
                </label>
              </div>
              <Button
                onClick={handlePDFUpload}
                variant="secondary"
                className="w-full"
              >
                <Upload className="w-4 h-4" />
                Upload PDFs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
