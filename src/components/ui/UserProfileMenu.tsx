
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle, Settings, LogOut, Building, Mail, Calendar, CreditCard, User } from "lucide-react";
import { formatDistance } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";

interface UserProfileMenuProps {
  user: any;
  textColorClass: string;
  onLogout: () => Promise<void>;
}

export const UserProfileMenu = ({ user, textColorClass, onLogout }: UserProfileMenuProps) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user.user_metadata?.full_name || '',
    gender: user.user_metadata?.gender || '',
    date_of_birth: user.user_metadata?.date_of_birth || '',
  });

  // Mock card data - in a real application, this would come from your payment provider
  const mockCardData = {
    cardNumber: "4111 **** **** ****",
    cardHolder: user.user_metadata?.full_name || '',
    expiryDate: "12/25",
    cardType: "Visa"
  };

  const joinedDate = user.created_at ? formatDistance(new Date(user.created_at), new Date(), { addSuffix: true }) : '';

  const handleSave = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
        }
      });

      if (error) throw error;
      
      setIsEditing(false);
      // Force a page reload to update the user data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      gender: value
    }));
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-opacity duration-200">
          <UserCircle className={`w-6 h-6 ${textColorClass}`} />
          <span className={textColorClass}>{user.email}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[280px]">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer flex items-center gap-2 p-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[280px] p-2">
              {/* Personal Information Section */}
              <DropdownMenuItem 
                onClick={() => {
                  setShowPersonalInfo(true);
                  setIsEditing(false);
                }}
                className="cursor-pointer flex items-center gap-2 p-2 mb-1"
              >
                <User className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Personal Information</span>
                  <span className="text-xs text-gray-500">Profile details and preferences</span>
                </div>
              </DropdownMenuItem>
              
              {/* Card Details Section */}
              <DropdownMenuItem 
                onClick={() => setShowCardDetails(true)}
                className="cursor-pointer flex items-center gap-2 p-2 mb-1"
              >
                <CreditCard className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Card Details</span>
                  <span className="text-xs text-gray-500">Manage payment methods</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-2" />
              
              {/* Logout Option */}
              <DropdownMenuItem 
                onClick={onLogout} 
                className="cursor-pointer flex items-center gap-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Personal Information Dialog */}
      <Dialog open={showPersonalInfo} onOpenChange={setShowPersonalInfo}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Personal Information</span>
              {!isEditing && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="text-sm"
                >
                  Edit Profile
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="full_name"
                value={isEditing ? formData.full_name : user.user_metadata?.full_name || ''}
                onChange={handleChange}
                className="w-full"
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                className="w-full"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={handleGenderChange}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="not_specified">Rather not say</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="gender"
                  value={user.user_metadata?.gender || 'Not specified'}
                  className="w-full"
                  disabled
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="date_of_birth"
                type="date"
                value={isEditing ? formData.date_of_birth : user.user_metadata?.date_of_birth || ''}
                onChange={handleChange}
                className="w-full"
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="joined">Member Since</Label>
              <Input
                id="joined"
                value={joinedDate}
                className="w-full"
                disabled
              />
            </div>
          </div>
          {isEditing && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Card Details Dialog */}
      <Dialog open={showCardDetails} onOpenChange={setShowCardDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Card Details</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="p-6 border rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <Label>Card Type</Label>
                <span className="font-medium">{mockCardData.cardType}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label>Card Number</Label>
                <span className="font-mono">{mockCardData.cardNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label>Card Holder</Label>
                <span>{mockCardData.cardHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label>Expiry Date</Label>
                <span>{mockCardData.expiryDate}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              For security reasons, your full card number and CVV are not displayed.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
