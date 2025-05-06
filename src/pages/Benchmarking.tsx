
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from "react-markdown";

const Benchmarking = () => {
  const [cloudflareText, setCloudflareText] = useState("");
  const [peerText, setPeerText] = useState("");
  const [benchmarkingResponse, setBenchmarkingResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fillingType, setFillingType] = useState<string>("10K");
  const [showPrimaryPreview, setShowPrimaryPreview] = useState(false);
  const [showPeerPreview, setShowPeerPreview] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve stored text from localStorage
    const storedCloudflareText = localStorage.getItem("cloudflareText");
    const storedPeerText = localStorage.getItem("peerText");
    
    if (storedCloudflareText) {
      setCloudflareText(storedCloudflareText);
    }
    
    if (storedPeerText) {
      setPeerText(storedPeerText);
    }
    
    if (!storedCloudflareText && !storedPeerText) {
      toast.error("No documents found. Please upload documents first.");
      navigate("/upload");
    }
  }, [navigate]);

  const runBenchmarking = () => {
    if (!cloudflareText || !peerText) {
      toast.error("Both primary and peer documents are required for benchmarking");
      return;
    }
    
    setIsLoading(true);
    toast.success("Peer benchmarking analysis started");
    
    // Simulate AI processing with a delay
    setTimeout(() => {
      setBenchmarkingResponse(`
## Peer Benchmarking Analysis

### Key Financial Metrics Comparison
- **Revenue Growth**: Your company shows a 15% YoY growth versus the peer's 12%
- **Profit Margin**: 8.5% versus peer's 10.2%
- **Operating Expenses**: 42% of revenue versus peer's 38%
- **R&D Investment**: 14% of revenue versus peer's 16%

### Risk Assessment
Your company has identified fewer regulatory risks compared to peer, but has more exposure to supply chain disruptions.

### Strategic Positioning
Your company is more focused on domestic market expansion, while the peer is aggressively pursuing international markets.

### Recommendations
1. Consider increasing R&D investment to maintain competitive edge
2. Explore supply chain diversification strategies
3. Evaluate international expansion opportunities based on peer success model

^fn1^: Analysis based on comparative ratios from the most recent fiscal year.
^fn2^: Peer average is calculated across the top 5 competitors in the industry.
      `);
      setIsLoading(false);
      toast.success("Benchmarking analysis completed");
    }, 3000);
  };

  const togglePrimaryPreview = () => {
    setShowPrimaryPreview(!showPrimaryPreview);
  };

  const togglePeerPreview = () => {
    setShowPeerPreview(!showPeerPreview);
  };

  // Process text with footnotes
  const processFootnotes = (text: string) => {
    return text.replace(/\^fn(\d+)\^/g, (match, num) => {
      return `<sup class="footnote-link" data-footnote="${num}">[${num}]</sup>`;
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-soft-teal/20">
              <BarChart2 className="h-6 w-6 text-soft-teal" />
            </div>
            <h1 className="text-3xl font-medium">Peer Benchmarking</h1>
          </div>
          <p className="text-muted-foreground">
            Compare your financial filing with peer companies to identify competitive insights
          </p>

          <div className="flex items-center space-x-3 mt-4">
            <Select value={fillingType} onValueChange={setFillingType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10K">10-K Annual Report</SelectItem>
                <SelectItem value="10Q">10-Q Quarterly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border shadow-lg bg-card/50 backdrop-blur h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Document</CardTitle>
                  <CardDescription>
                    Primary document extracted text
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-auto"
                  onClick={togglePrimaryPreview}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className={`h-64 overflow-y-auto p-4 bg-card border border-border rounded-xl ${!showPrimaryPreview ? 'hidden' : ''}`}>
                  {cloudflareText ? (
                    <p className="text-sm whitespace-pre-line">{cloudflareText}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No primary document found. Please upload a document first.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-lg bg-card/50 backdrop-blur h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Peer Document</CardTitle>
                  <CardDescription>
                    Peer document extracted text
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-auto"
                  onClick={togglePeerPreview}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className={`h-64 overflow-y-auto p-4 bg-card border border-border rounded-xl ${!showPeerPreview ? 'hidden' : ''}`}>
                  {peerText ? (
                    <p className="text-sm whitespace-pre-line">{peerText}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No peer document found. Please upload or select a peer document first.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={runBenchmarking}
              className="bg-soft-teal hover:bg-soft-teal/90 px-8 py-6 rounded-2xl shadow-lg button-glow relative"
              disabled={isLoading || !cloudflareText || !peerText}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running Analysis...
                </span>
              ) : (
                <span className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Run Peer Benchmarking
                </span>
              )}
            </Button>
          </div>

          {benchmarkingResponse && (
            <Card className="border border-soft-teal/30 shadow-lg bg-gradient-to-br from-soft-teal/5 to-transparent backdrop-blur animate-fade-in">
              <CardHeader>
                <CardTitle className="text-soft-teal">Peer Benchmarking Results</CardTitle>
                <CardDescription>
                  AI-powered comparative analysis of your document against peer filings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="markdown-content" dangerouslySetInnerHTML={{ __html: processFootnotes(benchmarkingResponse) }}></div>
                  
                  <div className="footnote mt-8">
                    <h4 className="text-sm font-semibold mb-2">Footnotes:</h4>
                    <ol className="pl-5 text-xs">
                      <li id="fn1" className="mb-1">Analysis based on comparative ratios from the most recent fiscal year.</li>
                      <li id="fn2" className="mb-1">Peer average is calculated across the top 5 competitors in the industry.</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Benchmarking;
