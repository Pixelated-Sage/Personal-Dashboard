// 3. DashboardPage.jsx
import React from "react";
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import DailyTasks from "../components/dashboard/DailyTasks";
import SkillProgress from "../components/dashboard/SkillProgress";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import CalendarHeatmap from "../components/dashboard/CalenderHeatmap";
import AICards from "../components/dashboard/AICards";
import SkillChart from "../components/dashboard/GraphOverview";
import TaskPieChart from "../components/dashboard/Taskpichart";
import TaskLineChart from "../components/dashboard/TaskLineChart";
import TaskStatsCard from "../components/dashboard/TaskStateCard";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Top Row: AI Suggestion & Calendar Heatmap */}
      <div className="">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Task Line Chart - 80% */}
          <div className="w-full lg:w-4/5">
            <TaskLineChart />
          </div>

          {/* Stats Card - 20% */}
          <div className="w-full lg:w-1/5">
            <TaskStatsCard />
          </div>
        </div>
      </div>

      {/* Second Row: Skill & Project Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyTasks />
        <SkillProgress />
        <ProjectProgress />
      </div>

      {/* Third Row: Skill Chart & Task Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillChart />
        <TaskPieChart />
      </div>

      {/* Task Line Chart */}
      <div>
        
      </div>
        
      {/* Daily Tasks */}
      <div>
        <AICards />
      </div>
    </div>
  );
};

export default Dashboard;
