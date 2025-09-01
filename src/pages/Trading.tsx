import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Bitcoin,
  Coins,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Trading = () => {
  const [orderType, setOrderType] = useState("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const { toast } = useToast();

  const cryptoPairs = [
    { pair: "BTC/USDT", price: 67432.18, change: 2.45, volume: "1.2B", icon: Bitcoin },
    { pair: "ETH/USDT", price: 3245.67, change: -1.23, volume: "890M", icon: Coins },
    { pair: "ADA/USDT", price: 0.987, change: 5.67, volume: "234M", icon: Activity },
  ];

  const recentTrades = [
    { pair: "BTC/USDT", type: "buy", amount: 0.125, price: 67200, time: "2 min ago" },
    { pair: "ETH/USDT", type: "sell", amount: 2.5, price: 3250, time: "5 min ago" },
    { pair: "ADA/USDT", type: "buy", amount: 1000, price: 0.985, time: "8 min ago" },
  ];

  const handleTrade = (type: "buy" | "sell") => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Trade Executed",
      description: `${type.toUpperCase()} order for ${amount} has been placed successfully!`,
    });

    setAmount("");
    setPrice("");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trading</h1>
        <Badge variant="secondary" className="bg-accent/20 text-accent">
          Live Market
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Pairs */}
        <Card className="crypto-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Market Pairs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cryptoPairs.map((crypto) => {
                const Icon = crypto.icon;
                return (
                  <div key={crypto.pair} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{crypto.pair}</div>
                        <div className="text-sm text-muted-foreground">Vol: {crypto.volume}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-lg">${crypto.price.toLocaleString()}</div>
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

                    <div className="flex gap-2">
                      <Button size="sm" variant="profit" onClick={() => handleTrade("buy")}>
                        Buy
                      </Button>
                      <Button size="sm" variant="loss" onClick={() => handleTrade("sell")}>
                        Sell
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Trading Panel */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={orderType} onValueChange={setOrderType} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="limit">Limit</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="profit" onClick={() => handleTrade("buy")} className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Buy
                  </Button>
                  <Button variant="loss" onClick={() => handleTrade("sell")} className="w-full">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Sell
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="limit" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount-limit">Amount</Label>
                  <Input
                    id="amount-limit"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="profit" onClick={() => handleTrade("buy")} className="w-full">
                    Buy Limit
                  </Button>
                  <Button variant="loss" onClick={() => handleTrade("sell")} className="w-full">
                    Sell Limit
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trades */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTrades.map((trade, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Badge variant={trade.type === "buy" ? "default" : "secondary"} className={trade.type === "buy" ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"}>
                    {trade.type.toUpperCase()}
                  </Badge>
                  <span className="font-medium">{trade.pair}</span>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">{trade.amount} @ ${trade.price}</div>
                  <div className="text-sm text-muted-foreground">{trade.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trading;