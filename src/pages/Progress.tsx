import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Calendar, Target } from "lucide-react";

const progressData = {
  overall: 85,
  taskCompletion: 92,
  weeklyTrend: 5,
  taskTrend: 3
};

const subjectProgress = [
  { subject: "Math", progress: 95, color: "bg-blue-500" },
  { subject: "Science", progress: 88, color: "bg-green-500" },
  { subject: "History", progress: 76, color: "bg-purple-500" }
];

const weeklyData = [
  { week: "Week 1", value: 78 },
  { week: "Week 2", value: 82 },
  { week: "Week 3", value: 75 },
  { week: "Week 4", value: 85 }
];

const timeFrames = [
  { label: "Week", active: false },
  { label: "Month", active: true },
  { label: "Year", active: false }
];

export default function Progress() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Progress" showBackButton={true} />
      
      <main className="flex-1 p-4 space-y-6">
        {/* Time Frame Tabs */}
        <div className="flex justify-center gap-2">
          {timeFrames.map((timeFrame) => (
            <Button
              key={timeFrame.label}
              variant={timeFrame.active ? "default" : "outline"}
              size="sm"
              className={timeFrame.active ? "bg-primary text-primary-foreground" : ""}
            >
              {timeFrame.label}
            </Button>
          ))}
        </div>

        {/* Overall Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">
                {progressData.overall}%
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Last 30 days</span>
                <Badge variant="success" className="flex items-center gap-1">
                  <TrendingUp size={12} />
                  +{progressData.weeklyTrend}%
                </Badge>
              </div>
            </div>
            
            {/* Simple Progress Chart Visualization */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                {weeklyData.map((week) => (
                  <span key={week.week}>{week.week}</span>
                ))}
              </div>
              <div className="flex items-end justify-between gap-1 h-20">
                {weeklyData.map((week, index) => (
                  <div
                    key={week.week}
                    className="bg-primary rounded-t flex-1 transition-all duration-300"
                    style={{ height: `${(week.value / 100) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Completion */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-foreground mb-2">
                {progressData.taskCompletion}%
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Last 30 days</span>
                <Badge variant="success" className="flex items-center gap-1">
                  <TrendingUp size={12} />
                  +{progressData.taskTrend}%
                </Badge>
              </div>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Completed</span>
              <span>Incomplete</span>
            </div>
            <ProgressBar value={progressData.taskCompletion} className="h-2" />
          </CardContent>
        </Card>

        {/* Subject Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Subject Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{subject.subject}</span>
                  <span className="text-muted-foreground">{subject.progress}%</span>
                </div>
                <ProgressBar value={subject.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">7</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-xs text-muted-foreground">Goals Met</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}