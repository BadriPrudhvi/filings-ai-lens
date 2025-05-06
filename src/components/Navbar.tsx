
import { FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-border/40 py-5 backdrop-blur-md bg-background/90 sticky top-0 z-50 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-soft-purple p-2 rounded-lg">
            <FileText className="h-6 w-6 text-background" />
          </div>
          <span className="text-xl font-medium text-foreground tracking-tight">
            Filings AI Lens
          </span>
        </Link>

        <div className="flex items-center space-x-6">          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/upload">
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-soft-purple/20">
                <FileText className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </Link>
            <Link to="/benchmarking">
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-soft-teal/20">
                <Search className="h-4 w-4" />
                <span>Benchmark</span>
              </Button>
            </Link>
            <Link to="/compliance">
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-soft-coral/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m16 16 2 2 4-4" />
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                  <path d="M16.5 9.4 7.55 4.24" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" y1="22" x2="12" y2="12" />
                </svg>
                <span>Compliance</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
