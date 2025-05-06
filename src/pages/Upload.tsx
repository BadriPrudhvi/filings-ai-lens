
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/FileUploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Edit3 } from "lucide-react";

const Upload = () => {
  const [filingType, setFilingType] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [peerCompany, setPeerCompany] = useState("");
  const [peerReport, setPeerReport] = useState("");
  const [peerSection, setPeerSection] = useState("");
  const [focusStyle, setFocusStyle] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [extractedPeerText, setExtractedPeerText] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [uploadTab, setUploadTab] = useState("cloudflare");
  const [cloudflareInputType, setCloudflareInputType] = useState("file");
  
  const navigate = useNavigate();

  const handleFileUpload = () => {
    setFileUploaded(true);
    toast.success("File uploaded successfully");
    
    // Mock AI extraction with a delay
    setTimeout(() => {
      setExtractedText("This is simulated extracted text from your financial filing. The AI has processed your document and extracted the relevant information for analysis.");
    }, 1500);
  };

  const handleTextPaste = () => {
    if (!pastedText.trim()) {
      toast.error("Please enter some text to process");
      return;
    }
    
    // Mock AI extraction with a delay
    toast.success("Text processing started");
    setTimeout(() => {
      setExtractedText("This is simulated extracted text from your pasted content. The AI has processed your text and extracted the relevant information for analysis.");
      toast.success("Text processed successfully");
    }, 1500);
  };

  const handlePeerSelection = () => {
    if (!peerCompany || !peerReport || !peerSection || !focusStyle) {
      toast.error("Please complete all peer filing fields");
      return;
    }
    
    // Mock AI extraction with a delay
    toast.success("Peer filing extraction started");
    setTimeout(() => {
      setExtractedPeerText("This is simulated extracted text from the peer filing. The AI has processed the requested document and extracted the relevant information for comparison.");
      toast.success("Peer filing processed successfully");
    }, 1500);
  };
  
  const handleContinue = () => {
    // Store the extracted text in localStorage to simulate data persistence
    localStorage.setItem("cloudflareText", extractedText);
    localStorage.setItem("peerText", extractedPeerText);
    
    if (uploadTab === "peer" && extractedPeerText) {
      navigate("/benchmarking");
    } else if (extractedText) {
      navigate("/compliance");
    } else {
      toast.error("Please extract text before continuing");
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-medium">Document Upload</h1>
          <p className="text-muted-foreground">
            Upload your financial filings for AI-powered analysis
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border border-border shadow-lg bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Select Filing Type</CardTitle>
              <CardDescription>
                Choose the type of financial filing you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={filingType} onValueChange={setFilingType}>
                <SelectTrigger className="w-full md:w-1/3 focus-input">
                  <SelectValue placeholder="Select filing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10K">Form 10-K (Annual Report)</SelectItem>
                  <SelectItem value="10Q">Form 10-Q (Quarterly Report)</SelectItem>
                  <SelectItem value="8K">Form 8-K (Current Report)</SelectItem>
                  <SelectItem value="S1">Form S-1 (Registration Statement)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Tabs value={uploadTab} onValueChange={setUploadTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cloudflare" className="text-base">
                <FileText className="mr-2 h-4 w-4" /> Primary Document
              </TabsTrigger>
              <TabsTrigger value="peer" className="text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Peer Document (Optional)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cloudflare">
              <Card className="border border-border shadow-lg bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Primary Document Input</CardTitle>
                  <CardDescription>
                    Upload a file or paste text from your financial filing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap md:flex-nowrap space-y-2 md:space-y-0 md:space-x-4">
                    <Button 
                      variant={cloudflareInputType === "file" ? "secondary" : "outline"} 
                      onClick={() => setCloudflareInputType("file")}
                      className="w-full md:w-auto"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                    <Button 
                      variant={cloudflareInputType === "text" ? "secondary" : "outline"} 
                      onClick={() => setCloudflareInputType("text")}
                      className="w-full md:w-auto"
                    >
                      <Edit3 className="mr-2 h-4 w-4" /> Paste Text
                    </Button>
                  </div>

                  {cloudflareInputType === "file" ? (
                    <div className="space-y-4">
                      <FileUploader onUpload={handleFileUpload} />
                      
                      <div className="space-y-2">
                        <Label htmlFor="focus-style">Select Focus/Style</Label>
                        <Select value={focusStyle} onValueChange={setFocusStyle}>
                          <SelectTrigger id="focus-style" className="focus-input">
                            <SelectValue placeholder="Choose focus area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="financials">Financial Metrics</SelectItem>
                            <SelectItem value="risks">Risk Factors</SelectItem>
                            <SelectItem value="management">Management Discussion</SelectItem>
                            <SelectItem value="outlook">Future Outlook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {fileUploaded && (
                        <Button 
                          onClick={() => {
                            setExtractedText("This is simulated extracted text from your financial filing. The AI has processed your document and extracted the relevant information for analysis.");
                            toast.success("Text extracted successfully");
                          }} 
                          className="w-full md:w-auto bg-soft-purple hover:bg-soft-purple/90 button-glow"
                        >
                          Extract Text with AI
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Paste your filing text here..." 
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                        className="h-40 focus-input"
                      />
                      
                      <div className="space-y-2">
                        <Label htmlFor="focus-style-text">Select Focus/Style</Label>
                        <Select value={focusStyle} onValueChange={setFocusStyle}>
                          <SelectTrigger id="focus-style-text" className="focus-input">
                            <SelectValue placeholder="Choose focus area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="financials">Financial Metrics</SelectItem>
                            <SelectItem value="risks">Risk Factors</SelectItem>
                            <SelectItem value="management">Management Discussion</SelectItem>
                            <SelectItem value="outlook">Future Outlook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={handleTextPaste}
                        className="w-full md:w-auto bg-soft-purple hover:bg-soft-purple/90 button-glow"
                      >
                        Extract Text with AI
                      </Button>
                    </div>
                  )}

                  {extractedText && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      <Label>Extracted Text</Label>
                      <div className="p-4 bg-card border border-border rounded-2xl">
                        <p className="text-sm">{extractedText}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="peer">
              <Card className="border border-border shadow-lg bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Peer Document Selection</CardTitle>
                  <CardDescription>
                    Select a peer company's filing for comparative analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="peer-company">Select Company</Label>
                      <Select value={peerCompany} onValueChange={setPeerCompany}>
                        <SelectTrigger id="peer-company" className="focus-input">
                          <SelectValue placeholder="Choose peer company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apple">Apple Inc.</SelectItem>
                          <SelectItem value="microsoft">Microsoft Corporation</SelectItem>
                          <SelectItem value="amazon">Amazon.com Inc.</SelectItem>
                          <SelectItem value="google">Alphabet Inc.</SelectItem>
                          <SelectItem value="meta">Meta Platforms Inc.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="peer-report">Select Report</Label>
                      <Select value={peerReport} onValueChange={setPeerReport}>
                        <SelectTrigger id="peer-report" className="focus-input">
                          <SelectValue placeholder="Choose report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10K-2023">10-K (2023)</SelectItem>
                          <SelectItem value="10K-2022">10-K (2022)</SelectItem>
                          <SelectItem value="10Q-2023-Q3">10-Q (2023 Q3)</SelectItem>
                          <SelectItem value="10Q-2023-Q2">10-Q (2023 Q2)</SelectItem>
                          <SelectItem value="10Q-2023-Q1">10-Q (2023 Q1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="peer-section">Select Section</Label>
                      <Select value={peerSection} onValueChange={setPeerSection}>
                        <SelectTrigger id="peer-section" className="focus-input">
                          <SelectValue placeholder="Choose section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="risk-factors">Risk Factors</SelectItem>
                          <SelectItem value="md&a">Management's Discussion & Analysis</SelectItem>
                          <SelectItem value="financial-statements">Financial Statements</SelectItem>
                          <SelectItem value="business">Business Description</SelectItem>
                          <SelectItem value="legal">Legal Proceedings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="peer-focus">Select Focus/Style</Label>
                      <Select value={focusStyle} onValueChange={setFocusStyle}>
                        <SelectTrigger id="peer-focus" className="focus-input">
                          <SelectValue placeholder="Choose focus area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financials">Financial Metrics</SelectItem>
                          <SelectItem value="risks">Risk Factors</SelectItem>
                          <SelectItem value="management">Management Discussion</SelectItem>
                          <SelectItem value="outlook">Future Outlook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePeerSelection}
                    className="w-full md:w-auto bg-soft-purple hover:bg-soft-purple/90 button-glow"
                  >
                    Extract Peer Data with AI
                  </Button>

                  {extractedPeerText && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      <Label>Extracted Peer Text</Label>
                      <div className="p-4 bg-card border border-border rounded-2xl">
                        <p className="text-sm">{extractedPeerText}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button 
              onClick={handleContinue} 
              className="bg-soft-purple hover:bg-soft-purple/90 px-8 rounded-2xl button-glow"
              disabled={!extractedText && (!extractedPeerText || uploadTab !== "peer")}
            >
              Continue to Analysis
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
