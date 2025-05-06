
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Eye, Send } from "lucide-react";
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

const Compliance = () => {
  const [cloudflareText, setCloudflareText] = useState("");
  const [question, setQuestion] = useState("");
  const [complianceResponse, setComplianceResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [fillingType, setFillingType] = useState<string>("10K");
  const [showPreview, setShowPreview] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve stored text from localStorage
    const storedCloudflareText = localStorage.getItem("cloudflareText");
    
    if (storedCloudflareText) {
      setCloudflareText(storedCloudflareText);
    } else {
      toast.error("No document found. Please upload a document first.");
      navigate("/upload");
    }
  }, [navigate]);

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    if (!cloudflareText) {
      toast.error("No document found for compliance review");
      return;
    }
    
    setIsLoading(true);
    toast.success("Processing your compliance question");
    
    // Store the current question
    setPreviousQuestions(prev => [question, ...prev]);
    
    // Simulate AI processing with a delay
    setTimeout(() => {
      let response = "";
      
      if (question.toLowerCase().includes("risk")) {
        response = `
## Risk Factor Compliance Analysis

Based on the document provided, I've analyzed the risk factor disclosures:

### Compliance Status: ✅ Mostly Compliant

The risk factors section generally meets SEC requirements under Item 1A of Form 10-K, but has the following issues:

1. **Specificity Improvement Needed**: Some risk factors are too generic and should be tailored to the company's specific circumstances
          
2. **Quantification Missing**: Financial impacts of risks are not adequately quantified where possible
          
3. **Prioritization Required**: Risk factors should be presented in order of materiality
          
### Recommendations
          
1. Add specific examples of how each risk factor could impact operations
2. Where possible, include quantitative assessments of potential financial impacts
3. Reorganize risk factors to present the most material risks first
4. Add a section addressing emerging cybersecurity risks as per recent SEC guidance

^fn1^: SEC Regulation S-K Item 105 requires clear organization and specificity in risk factors.
^fn2^: Recent SEC comment letters indicate increased focus on quantification of risk impacts.
        `;
      } else if (question.toLowerCase().includes("financial") || question.toLowerCase().includes("reporting")) {
        response = `
## Financial Reporting Compliance Analysis

Based on my review of the financial disclosures:

### Compliance Status: ✅ Compliant

The financial statements appear to comply with Regulation S-X requirements, with:

1. **Proper Presentation**: Balance sheet, income statement, and cash flow statement follow required formats
          
2. **Footnote Disclosures**: Adequate footnotes explaining accounting policies and material items
          
3. **MD&A Sections**: Management Discussion & Analysis provides sufficient analysis of financial conditions
          
### Recommendations
          
1. Consider enhanced segment reporting to provide more granular performance metrics
2. Expand liquidity discussion to include more forward-looking analysis
3. Include a more detailed breakdown of revenue sources in line with recent SEC comment letter trends

^fn1^: Regulation S-X Rules 5-02 and 5-03 govern balance sheet and income statement presentations.
^fn2^: SEC Release No. 33-10890 provides updated guidance on MD&A requirements.
        `;
      } else {
        response = `
## General Compliance Review

Based on my analysis of the document:

### Compliance Status: ✅ Generally Compliant

The filing generally complies with SEC requirements, but attention should be paid to:

1. **Forward-Looking Statements**: Ensure all forward-looking statements are properly identified and accompanied by meaningful cautionary language
          
2. **Non-GAAP Measures**: Verify all non-GAAP financial measures are reconciled to the most directly comparable GAAP measure
          
3. **Disclosure Controls**: Enhance the discussion of disclosure controls and procedures
          
### Recommendations
          
1. Update the Safe Harbor statement to reflect the latest SEC guidance
2. Provide more specific discussion of how management evaluates disclosure controls
3. Review recent SEC comment letters in your industry for emerging disclosure trends

^fn1^: Securities Act Section 27A and Exchange Act Section 21E provide safe harbor for forward-looking statements.
^fn2^: Item 307 of Regulation S-K requires disclosure of management's conclusions regarding effectiveness of disclosure controls.
        `;
      }
      
      setComplianceResponse(response);
      setIsLoading(false);
      setQuestion("");
      toast.success("Compliance analysis completed");
    }, 2500);
  };

  const handleQuestionClick = (q: string) => {
    setQuestion(q);
  };

  // Process text with footnotes
  const processFootnotes = (text: string) => {
    return text.replace(/\^fn(\d+)\^/g, (match, num) => {
      return `<sup class="footnote-link" data-footnote="${num}">[${num}]</sup>`;
    });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-soft-coral/20">
              <CheckCircle className="h-6 w-6 text-soft-coral" />
            </div>
            <h1 className="text-3xl font-medium">Compliance Review</h1>
          </div>
          <p className="text-muted-foreground">
            Evaluate your financial filing for regulatory compliance issues
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
          <Card className="border border-border shadow-lg bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Document for Review</CardTitle>
                <CardDescription>
                  Primary document extracted text
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-auto"
                onClick={togglePreview}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className={`h-48 overflow-y-auto p-4 bg-card border border-border rounded-xl ${!showPreview ? 'hidden' : ''}`}>
                {cloudflareText ? (
                  <p className="text-sm whitespace-pre-line">{cloudflareText}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No document found. Please upload a document first.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="border border-border shadow-lg bg-card/50 backdrop-blur h-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Suggested Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="suggested-questions-container">
                    <Button 
                      variant="outline" 
                      className="text-xs w-full justify-start text-left h-auto py-2 border-soft-coral/30 hover:bg-soft-coral/10"
                      onClick={() => handleQuestionClick("Are there any risk disclosure compliance issues?")}
                    >
                      Are there any risk disclosure compliance issues?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs w-full justify-start text-left h-auto py-2 border-soft-coral/30 hover:bg-soft-coral/10"
                      onClick={() => handleQuestionClick("Does the financial reporting meet SEC standards?")}
                    >
                      Does the financial reporting meet SEC standards?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs w-full justify-start text-left h-auto py-2 border-soft-coral/30 hover:bg-soft-coral/10"
                      onClick={() => handleQuestionClick("Identify any compliance gaps in this document.")}
                    >
                      Identify any compliance gaps in this document.
                    </Button>
                  </div>
                  
                  {previousQuestions.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Recent Questions</h4>
                      <div className="suggested-questions-container">
                        {previousQuestions.slice(0, 3).map((q, index) => (
                          <Button 
                            key={index}
                            variant="ghost" 
                            className="text-xs w-full justify-start text-left h-auto py-2 text-muted-foreground hover:text-foreground"
                            onClick={() => handleQuestionClick(q)}
                          >
                            {q}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card className="border border-border shadow-lg bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Ask a Compliance Question</CardTitle>
                  <CardDescription>
                    Ask specific questions about regulatory compliance in your document
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="E.g., Are there any risk disclosure compliance issues?" 
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="focus-input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isLoading) {
                          handleAskQuestion();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleAskQuestion}
                      className="bg-soft-coral hover:bg-soft-coral/90 button-glow"
                      disabled={isLoading || !question.trim() || !cloudflareText}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Ask
                        </span>
                      )}
                    </Button>
                  </div>

                  {complianceResponse && (
                    <Card className="border border-soft-coral/30 shadow-lg bg-gradient-to-br from-soft-coral/5 to-transparent backdrop-blur animate-fade-in">
                      <CardContent className="p-6">
                        <div className="prose prose-invert max-w-none">
                          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: processFootnotes(complianceResponse) }}></div>
                          
                          <div className="footnote mt-8">
                            <h4 className="text-sm font-semibold mb-2">Footnotes:</h4>
                            <ol className="pl-5 text-xs">
                              <li id="fn1" className="mb-1">SEC Regulation S-K Item 105 requires clear organization and specificity in risk factors.</li>
                              <li id="fn2" className="mb-1">Recent SEC comment letters indicate increased focus on quantification of risk impacts.</li>
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compliance;
