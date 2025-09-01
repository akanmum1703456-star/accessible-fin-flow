import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  QrCode,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Wallet = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const { toast } = useToast();

  const walletAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  const transactions = [
    {
      id: "1",
      type: "deposit",
      amount: 5000,
      currency: "USDT",
      status: "completed",
      date: "2024-01-15",
      hash: "0x1234...5678"
    },
    {
      id: "2", 
      type: "withdrawal",
      amount: 0.125,
      currency: "BTC",
      status: "pending",
      date: "2024-01-14",
      hash: "0x8765...4321"
    },
    {
      id: "3",
      type: "deposit",
      amount: 2.5,
      currency: "ETH", 
      status: "completed",
      date: "2024-01-13",
      hash: "0x9999...1111"
    }
  ];

  const balances = [
    { currency: "USDT", amount: 12847.52, usdValue: 12847.52 },
    { currency: "BTC", amount: 0.125, usdValue: 8429.02 },
    { currency: "ETH", amount: 2.5, usdValue: 8114.18 },
  ];

  const handleDeposit = () => {
    if (!depositAmount) {
      toast({
        title: "Error",
        description: "Please enter a deposit amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deposit Initiated",
      description: `Deposit of $${depositAmount} has been initiated successfully!`,
    });
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !withdrawAddress) {
      toast({
        title: "Error", 
        description: "Please enter both amount and address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawal of $${withdrawAmount} has been initiated successfully!`,
    });
    setWithdrawAmount("");
    setWithdrawAddress("");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent/20 text-accent";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      default:
        return "bg-destructive/20 text-destructive";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          Secure Wallet
        </Badge>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {balances.map((balance) => (
          <Card key={balance.currency} className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{balance.currency} Balance</CardTitle>
              <WalletIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance.amount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ≈ ${balance.usdValue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit/Withdraw */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Manage Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="deposit" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              </TabsList>
              
              <TabsContent value="deposit" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">Amount (USD)</Label>
                  <Input
                    id="deposit-amount"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Wallet Address:</span>
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code className="text-xs break-all">{walletAddress}</code>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="crypto" onClick={handleDeposit} className="w-full">
                    <ArrowDownLeft className="w-4 h-4 mr-2" />
                    Deposit
                  </Button>
                  <Button variant="outline" className="w-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-address">Destination Address</Label>
                  <Input
                    id="withdraw-address"
                    placeholder="Enter wallet address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Amount (USD)</Label>
                  <Input
                    id="withdraw-amount"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-2 text-yellow-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Network fee: ~$2.50
                  </div>
                </div>
                
                <Button variant="crypto" onClick={handleWithdraw} className="w-full">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Credit Card</div>
                    <div className="text-sm text-muted-foreground">**** 4532</div>
                  </div>
                </div>
                <Badge className="bg-accent/20 text-accent">Primary</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                    <WalletIcon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-sm text-muted-foreground">ACH Transfer</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              
              <Button variant="outline" className="w-full">
                + Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "deposit" ? "bg-accent/10" : "bg-destructive/10"
                  }`}>
                    {tx.type === "deposit" ? (
                      <ArrowDownLeft className={`w-5 h-5 ${tx.type === "deposit" ? "text-accent" : "text-destructive"}`} />
                    ) : (
                      <ArrowUpRight className={`w-5 h-5 ${tx.type === "deposit" ? "text-accent" : "text-destructive"}`} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{tx.type}</div>
                    <div className="text-sm text-muted-foreground">{tx.date}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">
                    {tx.type === "deposit" ? "+" : "-"}{tx.amount} {tx.currency}
                  </div>
                  <div className="text-sm text-muted-foreground">{tx.hash}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusIcon(tx.status)}
                  <Badge className={getStatusColor(tx.status)}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;