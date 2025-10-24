import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  FileText,
  Wand2,
  Loader2,
  AlertCircle,
  CheckCircle,
  Save,
  ChevronDown,
  File,
  FileDown,
} from "lucide-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { generateMakalah } from "../lib/mastra-client";
import { RichTextEditor } from "../components/rich-editor/rich-text-editor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export function MakalahMaker() {
  const [topic, setTopic] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  // @note handle makalah generation using mastra client
  const handleGenerateMakalah = async () => {
    if (!topic.trim()) {
      setError("Masukkan topik untuk menghasilkan makalah");
      return;
    }

    setIsGenerating(true);
    setError("");
    setSuccess("");

    try {
      const generatedContent = await generateMakalah(topic);
      setGeneratedContent(generatedContent);
      setSuccess("Makalah berhasil dihasilkan!");
    } catch (err) {
      setError(
        "Terjadi kesalahan saat menghasilkan makalah. Pastikan server Mastra berjalan.",
      );
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // @note handle document export
  const handleExport = async (format: "doc" | "docx") => {
    const filename = documentName.trim() || "document";

    try {
      // @note get content from rich editor
      const content = editorContent || "No content available";

      if (format === "docx") {
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: content.split("\n\n").map(
                (paragraph: string) =>
                  new Paragraph({
                    children: [new TextRun(paragraph)],
                  }),
              ),
            },
          ],
        });

        // @note use toBlob instead of toBuffer for browser compatibility
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${filename}.docx`);
      } else {
        const blob = new Blob([content], { type: "application/msword" });
        saveAs(blob, `${filename}.doc`);
      }

      setSuccess(`Dokumen berhasil diekspor sebagai ${format.toUpperCase()}!`);
    } catch (err) {
      setError("Gagal mengekspor dokumen");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-left space-y-2">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <FileText className="h-10 w-10 text-primary" />
            Makalah Maker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Buat makalah akademik dengan bantuan AI dan editor canggih. Masukkan
            topik makalah Anda dan biarkan AI membantu menghasilkan konten
            berkualitas tinggi.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Document Name Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                  <File className="h-5 w-5 text-primary" />
                  Nama Dokumen
                </CardTitle>
                <CardDescription>
                  Masukkan nama file untuk ekspor dokumen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="docName" className="text-foreground">
                    Nama File
                  </Label>
                  <Input
                    id="docName"
                    placeholder="Contoh: Makalah AI Pendidikan"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Jika kosong, akan menggunakan "document" sebagai nama file
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Topic Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Generator AI
                </CardTitle>
                <CardDescription>
                  Masukkan topik untuk menghasilkan makalah secara otomatis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-foreground">
                    Topik Makalah
                  </Label>
                  <Input
                    id="topic"
                    placeholder="Contoh: Dampak AI dalam Pendidikan"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleGenerateMakalah}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menghasilkan...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Hasilkan Makalah
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-green-600 text-sm p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    {success}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Button with Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                  <Save className="h-5 w-5 text-primary" />
                  Simpan Dokumen
                </CardTitle>
                <CardDescription>
                  Ekspor makalah dalam format yang diinginkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full" size="lg">
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Dokumen
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleExport("docx")}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Simpan sebagai DOCX
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("doc")}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Simpan sebagai DOC
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Rich Editor */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">
                  Editor Makalah
                </CardTitle>
                <CardDescription>
                  Edit dan format makalah Anda dengan editor canggih yang
                  mendukung formatting kaya
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <RichTextEditor
                  initialContent={generatedContent}
                  onContentChange={setEditorContent}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
