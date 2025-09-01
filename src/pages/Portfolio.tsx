import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import {
  Bitcoin,
  Coins,
  Activity,
  TrendingUp,
  BarChart3,
  Shuffle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const { toast } = useToast();

  const portfolioData = [
    { name: "Bitcoin", value: 8429.02, percentage: 48.2, color: "#F7931A", change: 2.45, icon: Bitcoin },
    { name: "Ethereum", value: 8114.18, percentage: 46.4, color: "#627EEA", change: -1.23, icon: Coins },
    { name: "Cardano", value: 943.75, percentage: 5.4, color: "#0033AD", change: 5.67, icon: Activity },
  ];

  const performanceData = [
    { date: "Jan", value: 15000 },
    { date: "Feb", value: 16200 },
    { date: "Mar", value: 15800 },
    { date: "Apr", value: 17100 },
    { date: "May", value: 16900 },
    { date: "Jun", value: 17486 },
  ];

  const handleRebalance = () => {
    toast({
      title: "Portfolio Rebalanced",
      description: "Your portfolio has been rebalanced according to your target allocation.",
    });
  };

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <Button variant="crypto" onClick={handleRebalance}>
          <Shuffle className="w-4 h-4 mr-2" />
          Rebalance
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +$486.95 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold profit-text">+2.8%</div>
            <p className="text-xs text-muted-foreground">
              +$476.81 today
            </p>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All-Time High</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalValue * 1.23).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              23% from ATH
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Chart */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {portfolioData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Performance (6M)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Portfolio Value"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Detail */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle>Holdings Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {portfolioData.map((holding) => {
              const Icon = holding.icon;
              return (
                <div key={holding.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{holding.name}</div>
                        <div className="text-sm text-muted-foreground">{holding.percentage}% of portfolio</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">${holding.value.toLocaleString()}</div>
                      <div className="flex items-center gap-1">
                        {holding.change >= 0 ? (
                          <ArrowUpRight className="w-3 h-3 text-accent" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-destructive" />
                        )}
                        <span className={`text-sm ${holding.change >= 0 ? "profit-text" : "loss-text"}`}>
                          {holding.change >= 0 ? "+" : ""}{holding.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={holding.percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;