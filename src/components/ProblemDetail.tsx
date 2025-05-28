
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProblemDetailProps {
  problem: any;
}

export const ProblemDetail = ({ problem }: ProblemDetailProps) => {
  if (!problem) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const exampleTestCases = [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
    }
  ];

  return (
    <div className="h-full bg-slate-900 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Problem Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold text-white">
              {problem.id}. {problem.title}
            </h1>
            <Badge className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
          </div>
          
          <div className="flex gap-2 mb-4">
            {problem.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Problem Description */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed">
              {problem.description}
            </p>
            
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">Constraints:</h3>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• 2 ≤ nums.length ≤ 10⁴</li>
                <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>• -10⁹ ≤ target ≤ 10⁹</li>
                <li>• Only one valid answer exists.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exampleTestCases.map((example, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-white font-medium">Example {index + 1}:</h4>
                <div className="bg-slate-900/50 p-3 rounded-lg space-y-2 text-sm">
                  <div>
                    <span className="text-slate-400">Input: </span>
                    <span className="text-blue-400 font-mono">{example.input}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Output: </span>
                    <span className="text-green-400 font-mono">{example.output}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Explanation: </span>
                    <span className="text-slate-300">{example.explanation}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hints */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Hints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-slate-300 text-sm">
              <p>💡 A simple approach would be to check every combination of two numbers.</p>
              <p>💡 Can you use a hash table to improve the time complexity?</p>
              <p>💡 Think about what you need to store in the hash table.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
