import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Security = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const { toast } = useToast();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const recentSessions = [
    {
      id: "1",
      device: "Chrome on MacBook Pro",
      location: "New York, NY",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: "2", 
      device: "Safari on iPhone 15",
      location: "New York, NY",
      lastActive: "1 hour ago",
      current: false,
    },
    {
      id: "3",
      device: "Edge on Windows PC",
      location: "Los Angeles, CA", 
      lastActive: "2 days ago",
      current: false,
    },
  ];

  const securityEvents = [
    {
      id: "1",
      event: "Successful login",
      time: "2 minutes ago",
      location: "New York, NY",
      status: "success",
    },
    {
      id: "2",
      event: "Password changed",
      time: "3 days ago", 
      location: "New York, NY",
      status: "success",
    },
    {
      id: "3",
      event: "Failed login attempt",
      time: "1 week ago",
      location: "Unknown location",
      status: "warning",
    },
  ];

  const handlePasswordChange = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error", 
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    });

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const enable2FA = () => {
    setTwoFactorEnabled(true);
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been enabled for your account.",
    });
  };

  const disable2FA = () => {
    setTwoFactorEnabled(false);
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled.",
    });
  };

  const terminateSession = (sessionId: string) => {
    toast({
      title: "Session Terminated",
      description: "The selected session has been terminated.",
    });
  };

  const downloadBackupCodes = () => {
    toast({
      title: "Backup Codes Downloaded",
      description: "Your backup codes have been downloaded securely.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Security</h1>
        <Badge variant="secondary" className="bg-accent/20 text-accent">
          <Shield className="w-4 h-4 mr-1" />
          Secure Account
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Management */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
            </div>

            <Button variant="crypto" onClick={handlePasswordChange} className="w-full">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Authenticator App</div>
                <div className="text-sm text-muted-foreground">
                  Use an authenticator app for additional security
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={twoFactorEnabled ? disable2FA : enable2FA}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Biometric Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition
                </div>
              </div>
              <Switch
                checked={biometricEnabled}
                onCheckedChange={setBiometricEnabled}
              />
            </div>

            {twoFactorEnabled && (
              <div className="space-y-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={downloadBackupCodes} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Backup Codes
                </Button>
                <p className="text-xs text-muted-foreground">
                  Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <Badge className="bg-accent/20 text-accent">Current</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{session.lastActive}</div>
                  {!session.current && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => terminateSession(session.id)}
                    >
                      Terminate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Events */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.status === "success" ? "bg-accent/10" : "bg-yellow-500/10"
                }`}>
                  {event.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-accent" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-medium">{event.event}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {event.time}
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;