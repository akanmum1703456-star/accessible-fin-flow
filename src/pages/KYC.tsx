import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCheck,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Camera,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KYC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycStatus] = useState("pending"); // "pending", "approved", "rejected"
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    occupation: "",
    sourceOfFunds: "",
    idType: "",
    idNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Step Completed",
        description: `Step ${currentStep} completed successfully!`,
      });
    }
  };

  const handleSubmit = () => {
    toast({
      title: "KYC Application Submitted",
      description: "Your KYC application has been submitted for review. You will receive an update within 24-48 hours.",
    });
  };

  const uploadDocument = (type: string) => {
    toast({
      title: "Document Uploaded",
      description: `${type} has been uploaded successfully!`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-accent/20 text-accent";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "rejected":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <UserCheck className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Know Your Customer (KYC)</h1>
        <div className="flex items-center gap-2">
          {getStatusIcon(kycStatus)}
          <Badge className={getStatusColor(kycStatus)}>
            {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Verification Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of 4</span>
              <span>{progress.toFixed(0)}% Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Steps Navigation */}
        <Card className="crypto-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Verification Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: 1, title: "Personal Information", icon: UserCheck },
                { step: 2, title: "Address Verification", icon: FileText },
                { step: 3, title: "Document Upload", icon: Upload },
                { step: 4, title: "Review & Submit", icon: CheckCircle },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentStep === item.step;
                const isCompleted = currentStep > item.step;
                
                return (
                  <div
                    key={item.step}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive ? "bg-primary/10 border border-primary/20" : 
                      isCompleted ? "bg-accent/10" : "bg-muted/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? "bg-primary text-primary-foreground" :
                      isCompleted ? "bg-accent text-accent-foreground" : "bg-muted"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isActive ? "text-primary" : ""}`}>
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground">Step {item.step}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="crypto-card lg:col-span-3">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Address Verification"}
              {currentStep === 3 && "Document Upload"}
              {currentStep === 4 && "Review & Submit"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select onValueChange={(value) => handleInputChange("nationality", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Address Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="Enter postal code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      placeholder="Enter your occupation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sourceOfFunds">Source of Funds</Label>
                    <Select onValueChange={(value) => handleInputChange("sourceOfFunds", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salary">Salary/Employment</SelectItem>
                        <SelectItem value="business">Business Income</SelectItem>
                        <SelectItem value="investment">Investment Returns</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select onValueChange={(value) => handleInputChange("idType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="drivers-license">Driver's License</SelectItem>
                        <SelectItem value="national-id">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange("idNumber", e.target.value)}
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 border-2 border-dashed border-border rounded-lg text-center space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-medium">Upload Government ID</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload a clear photo of your government-issued ID
                      </p>
                    </div>
                    <Button onClick={() => uploadDocument("Government ID")}>
                      <Camera className="w-4 h-4 mr-2" />
                      Upload ID
                    </Button>
                  </div>

                  <div className="p-6 border-2 border-dashed border-border rounded-lg text-center space-y-4">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-medium">Proof of Address</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload a utility bill or bank statement (not older than 3 months)
                      </p>
                    </div>
                    <Button onClick={() => uploadDocument("Proof of Address")}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-muted/50 space-y-4">
                  <h3 className="text-lg font-semibold">Review Your Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Personal Information:</strong>
                      <div className="mt-2 space-y-1">
                        <div>Name: {formData.firstName} {formData.lastName}</div>
                        <div>Date of Birth: {formData.dateOfBirth}</div>
                        <div>Nationality: {formData.nationality}</div>
                        <div>Phone: {formData.phoneNumber}</div>
                      </div>
                    </div>
                    
                    <div>
                      <strong>Address Information:</strong>
                      <div className="mt-2 space-y-1">
                        <div>Address: {formData.address}</div>
                        <div>City: {formData.city}</div>
                        <div>Postal Code: {formData.postalCode}</div>
                        <div>Country: {formData.country}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Your information is encrypted and securely stored</span>
                  </div>
                </div>

                <Button variant="crypto" onClick={handleSubmit} className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit KYC Application
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button variant="crypto" onClick={handleNext}>
                  Next Step
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KYC;