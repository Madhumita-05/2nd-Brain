import { useState, useRef } from "react";
import { Upload as UploadIcon, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Upload = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNoteUpload = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    // TODO: Integrate with FastAPI backend /upload/notes-multi
    toast.success("Note uploaded successfully!");
    setNoteTitle("");
    setNoteContent("");
  };

  const handlePDFUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one PDF file");
      return;
    }

    // TODO: Integrate with FastAPI backend /upload/pdfs-multi
    toast.success(`${selectedFiles.length} PDF(s) uploaded successfully!`);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Upload <span className="text-accent">Materials</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Add notes and PDF documents to your knowledge base
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-accent/20 hover:shadow-accent transition-smooth animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle>Upload Text Note</CardTitle>
                <CardDescription>Create a new text-based note</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                placeholder="Note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="border-accent/20 focus:border-accent"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                placeholder="Write your note content here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={6}
                className="border-accent/20 focus:border-accent resize-none"
              />
            </div>
            <Button onClick={handleNoteUpload} variant="accent" className="w-full">
              <UploadIcon className="w-4 h-4" />
              Upload Note
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20 hover:shadow-accent transition-smooth animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <File className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle>Upload PDF Files</CardTitle>
                <CardDescription>Upload one or multiple PDF documents</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/60 transition-smooth cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <File className="w-12 h-12 text-accent mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to select PDF files
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : "Support for multiple files"}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="text-sm p-2 bg-muted/50 rounded flex items-center gap-2"
                  >
                    <File className="w-4 h-4 text-accent" />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
            <Button
              onClick={handlePDFUpload}
              variant="accent"
              className="w-full"
              disabled={selectedFiles.length === 0}
            >
              <UploadIcon className="w-4 h-4" />
              Upload PDF{selectedFiles.length > 1 ? "s" : ""}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
