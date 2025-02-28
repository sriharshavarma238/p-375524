
import React, { useState, useRef } from 'react';
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { UserCircle, Settings, LogOut, Building, Mail, CalendarIcon, CreditCard, User, Upload } from "lucide-react";
import { formatDistance, format } from 'date-fns';
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProfilePicture } from './ProfilePicture';

interface UserProfileMenuProps {
  user: any;
  textColorClass: string;
  onLogout: () => Promise<void>;
  isMobile?: boolean;
  profileUrl?: string;
  onProfileUpload: (url: string) => void;
}

export const UserProfileMenu = ({ 
  user, 
  textColorClass, 
  onLogout, 
  isMobile = false,
  profileUrl,
  onProfileUpload
}: UserProfileMenuProps) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
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

  const displayName = user.user_metadata?.full_name || 'User';

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
      {isMobile ? (
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative group">
              <ProfilePicture
                url={profileUrl}
                size="sm"
                onUpload={onProfileUpload}
                className="cursor-pointer transition-transform hover:scale-105"
              />
            </div>
            <div className="overflow-hidden">
              <div className="font-medium text-gray-900 truncate">{displayName}</div>
              <div className="text-sm text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setShowPersonalInfo(true)}
              className="w-full flex items-center gap-2 p-2 text-left text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <User className="h-4 w-4" />
              <span>Personal Information</span>
            </button>
            <button
              onClick={() => setShowCardDetails(true)}
              className="w-full flex items-center gap-2 p-2 text-left text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <CreditCard className="h-4 w-4" />
              <span>Card Details</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 p-2 text-left text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-opacity duration-200 group">
            <div className="relative">
              <ProfilePicture
                url={profileUrl}
                size="sm"
                onUpload={onProfileUpload}
                className="cursor-pointer transition-transform group-hover:scale-105"
              />
            </div>
            <span className={`${textColorClass} truncate max-w-[120px]`}>{displayName}</span>
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
      )}

      <Dialog open={showPersonalInfo} onOpenChange={setShowPersonalInfo}>
        <DialogContent className="sm:max-w-[425px] p-6 bg-white text-gray-900 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="flex items-center justify-between pr-8">
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
          
          <div className="grid gap-4 py-2">
            <div className="flex justify-center mb-6">
              <ProfilePicture 
                url={profileUrl}
                size="lg"
                onUpload={onProfileUpload}
                className="cursor-pointer"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-800">Full Name</Label>
              <Input
                id="name"
                name="full_name"
                value={isEditing ? formData.full_name : user.user_metadata?.full_name || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 text-gray-900"
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-800">Email</Label>
              <Input
                id="email"
                value={user.email}
                className="w-full bg-gray-50 text-gray-900"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender" className="text-gray-800">Gender</Label>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={handleGenderChange}
                >
                  <SelectTrigger id="gender" className="bg-gray-50 text-gray-900">
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
                  className="w-full bg-gray-50 text-gray-900"
                  disabled
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob" className="text-gray-800">Date of Birth</Label>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50 text-gray-900",
                        !formData.date_of_birth && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date_of_birth ? format(new Date(formData.date_of_birth), "MMMM d, yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 border-b">
                      <div className="space-y-2">
                        <Label className="text-gray-800">Date of Birth</Label>
                        <div className="text-sm text-gray-600">
                          Please select your date of birth
                        </div>
                      </div>
                    </div>
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
                      classNames={{
                        months: "space-y-4",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center gap-2",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center gap-1",
                        nav_button: cn(
                          "h-7 w-7 bg-transparent p-0 hover:opacity-70 transition-opacity text-gray-700"
                        ),
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse",
                        head_row: "flex",
                        head_cell: "w-9 font-normal text-[0.8rem] text-gray-600",
                        row: "flex w-full mt-2",
                        cell: cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100 text-gray-900",
                          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        ),
                        day: cn(
                          "h-9 w-9 p-0 font-normal text-gray-900",
                          "hover:bg-gray-100",
                          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                          "disabled:opacity-50 disabled:pointer-events-none"
                        ),
                        day_range_end: "day-range-end",
                        day_selected: cn(
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                          "focus:bg-primary focus:text-primary-foreground"
                        ),
                        day_today: "bg-gray-100 text-gray-900",
                        day_outside: "text-gray-400 opacity-50",
                        day_disabled: "text-gray-400 opacity-50",
                        day_hidden: "invisible",
                      }}
                    />
                    <div className="p-3 border-t">
                      <div className="text-xs text-gray-600">
                        Use the year dropdown above to quickly navigate to your birth year
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Input
                  id="dob"
                  value={user.user_metadata?.date_of_birth ? format(new Date(user.user_metadata.date_of_birth), "MMMM d, yyyy") : ''}
                  className="w-full bg-gray-50 text-gray-900"
                  disabled
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="joined" className="text-gray-800">Member Since</Label>
              <Input
                id="joined"
                value={joinedDate}
                className="w-full bg-gray-50 text-gray-900"
                disabled
              />
            </div>
          </div>
          
          {isEditing && (
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">Cancel</Button>
              <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save Changes</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCardDetails} onOpenChange={setShowCardDetails}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900">
              <CreditCard className="h-5 w-5" />
              <span>Card Details</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="p-6 border rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <Label className="text-gray-800">Card Type</Label>
                <span className="font-medium text-gray-900">{mockCardData.cardType}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-gray-800">Card Number</Label>
                <span className="font-mono text-gray-900">{mockCardData.cardNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-gray-800">Card Holder</Label>
                <span className="text-gray-900">{mockCardData.cardHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-gray-800">Expiry Date</Label>
                <span className="text-gray-900">{mockCardData.expiryDate}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              For security reasons, your full card number and CVV are not displayed.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
