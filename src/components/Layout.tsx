
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4 animate-fade-in">
        {children}
      </main>
      <Toaster richColors />
    </div>
  );
};

export default Layout;
