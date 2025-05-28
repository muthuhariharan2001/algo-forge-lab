
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

// Mock data for problems
const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"],
    acceptanceRate: 54.2,
    solved: true
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers.",
    tags: ["Linked List", "Math"],
    acceptanceRate: 38.9,
    solved: false
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptanceRate: 33.8,
    solved: false
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median.",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptanceRate: 36.2,
    solved: false
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string s, return the longest palindromic substring in s.",
    tags: ["String", "Dynamic Programming"],
    acceptanceRate: 32.4,
    solved: true
  }
];

interface ProblemsListProps {
  onProblemSelect: (problem: any) => void;
}

export const ProblemsList = ({ onProblemSelect }: ProblemsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const difficulties = ["Easy", "Medium", "Hard"];
  const allTags = Array.from(new Set(mockProblems.flatMap(p => p.tags)));

  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || problem.difficulty === selectedDifficulty;
    const matchesTag = !selectedTag || problem.tags.includes(selectedTag);
    
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search problems..."
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 text-sm">Difficulty:</span>
            {difficulties.map(diff => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                className={selectedDifficulty === diff 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                {diff}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-slate-400 text-sm mr-2">Tags:</span>
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "secondary"}
            className={`cursor-pointer transition-colors ${
              selectedTag === tag 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            }`}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Problems Grid */}
      <div className="grid gap-4">
        {filteredProblems.map((problem) => (
          <Card 
            key={problem.id} 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer group"
            onClick={() => onProblemSelect(problem)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${problem.solved ? 'bg-green-500' : 'bg-slate-600'}`} />
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                    {problem.id}. {problem.title}
                  </CardTitle>
                </div>
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300 mb-4">
                {problem.description}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {problem.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="text-slate-400 text-sm">
                  {problem.acceptanceRate}% accepted
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
