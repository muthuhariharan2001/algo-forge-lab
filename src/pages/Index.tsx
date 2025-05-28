
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ProblemsList } from "@/components/ProblemsList";
import { CodeEditor } from "@/components/CodeEditor";
import { ProblemDetail } from "@/components/ProblemDetail";

const Index = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');

  const handleProblemSelect = (problem: any) => {
    setSelectedProblem(problem);
    setView('editor');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation onBackClick={view === 'editor' ? handleBackToDashboard : undefined} />
      
      <div className="pt-16">
        {view === 'dashboard' ? (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Code<span className="text-blue-400">Practice</span>
              </h1>
              <p className="text-slate-300 text-lg">
                Master your coding skills with our curated collection of problems
              </p>
            </div>
            <ProblemsList onProblemSelect={handleProblemSelect} />
          </div>
        ) : (
          <div className="h-screen flex">
            <div className="w-1/2 border-r border-slate-700">
              <ProblemDetail problem={selectedProblem} />
            </div>
            <div className="w-1/2">
              <CodeEditor problem={selectedProblem} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
