import React from 'react'
import { Link } from "react-router-dom";
import { Code, Users, Zap } from "lucide-react";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
            CodeDuo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 opacity-60">
            Real-time collaborative code editor. Code together, build together.
          </p>
          <div className="flex gap-4 justify-center">
            <button className='bg-black text-white py-2 px-4 rounded bg-auto hover:bg-black/75'>
              <Link className='block w-full px-4 py-2 text-white text-center ' to="/signup"> Get Started </Link>
            </button>
            <button className='border border-black text-black py-2 px-4 rounded  hover:bg-blue-50/75'>
              <Link className='block w-full px-4 py-2 text-black text-center' to="/login">Sign In</Link>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <Code className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Real-time Editing</h3>
            <p className="text-muted-foreground opacity-60">
              See changes instantly as you and your partner code together
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Easy Collaboration</h3>
            <p className="text-muted-foreground opacity-60">
              Share room IDs and start coding together in seconds
            </p>
          </div>
          <div className="text-center p-6">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-muted-foreground opacity-60">
              Built with modern web technologies for smooth performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

