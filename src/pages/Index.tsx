
import { FileText, BarChart2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            AI-Powered Financial Document Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            Extract insights, benchmark against peers, and ensure compliance from your financial filings
          </p>
        </div>

        <div className="mt-8">
          <Link to="/upload">
            <Button className="bg-soft-purple hover:bg-soft-purple/90 text-white rounded-2xl py-6 px-8 shadow-lg button-glow">
              <FileText className="mr-2 h-5 w-5" />
              <span className="text-lg">Start Analyzing Documents</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
          <Card className="card-container bg-gradient-to-br from-soft-purple/10 to-soft-purple/5 border border-soft-purple/20 hover:shadow-soft-purple/20 hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 space-y-4">
              <div className="p-3 bg-soft-purple/20 rounded-full">
                <FileText className="h-8 w-8 text-soft-purple" />
              </div>
              <h3 className="text-xl font-medium">Document Upload</h3>
              <p className="text-muted-foreground text-center">
                Upload or paste financial filings for AI-powered text extraction
              </p>
            </CardContent>
          </Card>

          <Card className="card-container bg-gradient-to-br from-soft-teal/10 to-soft-teal/5 border border-soft-teal/20 hover:shadow-soft-teal/20 hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 space-y-4">
              <div className="p-3 bg-soft-teal/20 rounded-full">
                <BarChart2 className="h-8 w-8 text-soft-teal" />
              </div>
              <h3 className="text-xl font-medium">Peer Benchmarking</h3>
              <p className="text-muted-foreground text-center">
                Compare financial metrics against competitors in your industry
              </p>
            </CardContent>
          </Card>

          <Card className="card-container bg-gradient-to-br from-soft-coral/10 to-soft-coral/5 border border-soft-coral/20 hover:shadow-soft-coral/20 hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 space-y-4">
              <div className="p-3 bg-soft-coral/20 rounded-full">
                <CheckCircle className="h-8 w-8 text-soft-coral" />
              </div>
              <h3 className="text-xl font-medium">Compliance Review</h3>
              <p className="text-muted-foreground text-center">
                Ensure regulatory compliance with AI-powered document analysis
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
