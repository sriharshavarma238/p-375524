
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCircle, Settings, LogOut, Building, Mail, Calendar, CreditCard, User } from "lucide-react";
import { formatDistance } from 'date-fns';

interface UserProfileMenuProps {
  user: any;
  textColorClass: string;
  onLogout: () => Promise<void>;
}

export const UserProfileMenu = ({ user, textColorClass, onLogout }: UserProfileMenuProps) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const joinedDate = user.created_at ? formatDistance(new Date(user.created_at), new Date(), { addSuffix: true }) : '';
  
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
                onClick={() => setShowPersonalInfo(true)}
                className="cursor-pointer flex items-center gap-2 p-2 mb-1"
              >
                <User className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Personal Information</span>
                  <span className="text-xs text-gray-500">Profile details and preferences</span>
                </div>
              </DropdownMenuItem>
              
              {/* Card Details Section */}
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2 mb-1">
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

      <Dialog open={showPersonalInfo} onOpenChange={setShowPersonalInfo}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Personal Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user.user_metadata?.full_name || ''}
                className="w-full"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={user.email}
                className="w-full"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                defaultValue={user.user_metadata?.gender || 'Not specified'}
                className="w-full"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                defaultValue={user.user_metadata?.date_of_birth || 'Not specified'}
                className="w-full"
                disabled
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
        </DialogContent>
      </Dialog>
    </>
  );
};
