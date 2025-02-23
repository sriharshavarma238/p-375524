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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserCircle, Settings, LogOut, Building, Mail, CalendarIcon, CreditCard, User } from "lucide-react";
import { formatDistance, format } from 'date-fns';
import { cn } from "@/lib/utils";
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

  const mockCardData = {
    cardNumber: "4111 **** **** ****",
    cardHolder: user.user_metadata?.full_name || '',
    expiryDate: "12/25",
    cardType: "Visa"
  };

  const joinedDate = user.created_at ? formatDistance(new Date(user.created_at), new Date(), { addSuffix: true }) : '';

  const today = new Date();
  const fromYear = 1900;
  const toYear = today.getFullYear();

  const years = Array.from({ length: toYear - fromYear + 1 }, (_, i) => toYear - i);

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

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date_of_birth: format(date, 'yyyy-MM-dd')
      }));
    }
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
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date_of_birth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date_of_birth ? format(new Date(formData.date_of_birth), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date_of_birth ? new Date(formData.date_of_birth) : undefined}
                      onSelect={handleDateChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={fromYear}
                      toYear={toYear}
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Input
                  id="dob"
                  value={user.user_metadata?.date_of_birth ? format(new Date(user.user_metadata.date_of_birth), "PPP") : ''}
                  className="w-full"
                  disabled
                />
              )}
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
