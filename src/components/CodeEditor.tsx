
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Play, Send, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  problem: any;
}

export const CodeEditor = ({ problem }: CodeEditorProps) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" }
  ];

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput("Running test cases...\nTest case 1: PASSED ✓\nTest case 2: PASSED ✓");
      setTestResults([
        { input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]", passed: true },
        { input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]", passed: true }
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    // Simulate submission
    setTimeout(() => {
      setOutput("Submission successful! ✓\nRuntime: 68 ms\nMemory: 44.2 MB\nYour solution beats 89.5% of submissions!");
      setIsRunning(false);
    }, 3000);
  };

  const handleReset = () => {
    setCode(`function twoSum(nums, target) {
    // Write your solution here
    
}`);
    setOutput("");
    setTestResults([]);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col">
      {/* Editor Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold">Code Editor</h2>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-slate-700">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 p-4">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-slate-800/50 border-slate-700 text-white font-mono text-sm resize-none"
          placeholder="Write your code here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <div className="flex gap-3">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-slate-700 hover:bg-slate-600 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            {isRunning ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      {/* Output Section */}
      {(output || testResults.length > 0) && (
        <div className="border-t border-slate-700 bg-slate-800/30">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3">Output</h3>
            
            {output && (
              <Card className="bg-slate-900/50 border-slate-700 mb-4">
                <CardContent className="p-4">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                    {output}
                  </pre>
                </CardContent>
              </Card>
            )}

            {testResults.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-white font-medium">Test Results:</h4>
                {testResults.map((result, index) => (
                  <Card key={index} className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 text-sm">Test Case {index + 1}</span>
                        <Badge className={result.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                          {result.passed ? "PASSED" : "FAILED"}
                        </Badge>
                      </div>
                      <div className="text-xs space-y-1">
                        <div>
                          <span className="text-slate-400">Input: </span>
                          <span className="text-blue-400 font-mono">{result.input}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Expected: </span>
                          <span className="text-yellow-400 font-mono">{result.expected}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Actual: </span>
                          <span className="text-green-400 font-mono">{result.actual}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
