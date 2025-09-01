import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Activity, 
  DollarSign, 
  Bitcoin,
  Coins,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CryptoDashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Successful",
      description: `${action} completed successfully!`,
    });
  };

  const cryptoData = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 67432.18,
      change: 2.45,
      holding: 0.125,
      value: 8429.02,
      icon: Bitcoin
    },
    {
      symbol: "ETH", 
      name: "Ethereum",
      price: 3245.67,
      change: -1.23,
      holding: 2.5,
      value: 8114.18,
      icon: Coins
    },
    {
      symbol: "ADA",
      name: "Cardano", 
      price: 0.987,
      change: 5.67,
      holding: 1250,
      value: 1233.75,
      icon: Activity
    }
  ];

  const totalPortfolioValue = cryptoData.reduce((sum, crypto) => sum + crypto.value, 0);
  const totalChange = ((totalPortfolioValue - 17000) / 17000) * 100;

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            BashCrypto
          </h1>
          <p className="text-muted-foreground mt-2">Professional Cryptocurrency Trading Platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="crypto" onClick={() => handleAction("Trade")}>
            <Activity className="w-4 h-4" />
            Trade Now
          </Button>
          <Button variant="outline" onClick={() => handleAction("Deposit")}>
            <Wallet className="w-4 h-4" />
            Deposit
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="crypto-card md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setBalanceVisible(!balanceVisible)}
            >
              {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {balanceVisible ? `$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "••••••"}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {totalChange >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-accent" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-destructive" />
              )}
              <span className={totalChange >= 0 ? "profit-text" : "loss-text"}>
                {totalChange >= 0 ? "+" : ""}{totalChange.toFixed(2)}%
              </span>
              <span className="text-muted-foreground text-sm">24h</span>
            </div>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold profit-text">+$1,247.32</div>
            <p className="text-xs text-muted-foreground">
              Profitable day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            Your Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cryptoData.map((crypto, index) => {
              const Icon = crypto.icon;
              return (
                <div key={crypto.symbol} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">${crypto.price.toLocaleString()}</div>
                    <div className="flex items-center gap-1">
                      {crypto.change >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-accent" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-destructive" />
                      )}
                      <span className={`text-sm ${crypto.change >= 0 ? "profit-text" : "loss-text"}`}>
                        {crypto.change >= 0 ? "+" : ""}{crypto.change}%
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">{crypto.holding.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Holdings</div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">${crypto.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Value</div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="crypto" onClick={() => handleAction(`Buy ${crypto.symbol}`)}>
                      Buy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction(`Sell ${crypto.symbol}`)}>
                      Sell
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-20 flex-col gap-2" variant="outline" onClick={() => handleAction("Deposit Funds")}>
          <Wallet className="w-6 h-6" />
          Deposit
        </Button>
        <Button className="h-20 flex-col gap-2" variant="outline" onClick={() => handleAction("Withdraw Funds")}>
          <ArrowUpRight className="w-6 h-6" />
          Withdraw
        </Button>
        <Button className="h-20 flex-col gap-2" variant="outline" onClick={() => handleAction("View Analytics")}>
          <BarChart3 className="w-6 h-6" />
          Analytics
        </Button>
        <Button className="h-20 flex-col gap-2" variant="crypto" onClick={() => handleAction("Start Trading")}>
          <TrendingUp className="w-6 h-6" />
          Trade
        </Button>
      </div>

      {/* Market Stats */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-accent/10">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold profit-text">$2.1T</div>
              <div className="text-sm text-muted-foreground">Total Market Cap</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">52.4%</div>
              <div className="text-sm text-muted-foreground">BTC Dominance</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <Coins className="w-8 h-8 text-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Fear & Greed Index</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDashboard;