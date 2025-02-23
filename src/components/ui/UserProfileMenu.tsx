
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, Settings, LogOut, Building, Mail, Calendar } from "lucide-react";
import { formatDistance } from 'date-fns';

interface UserProfileMenuProps {
  user: any;
  textColorClass: string;
  onLogout: () => Promise<void>;
}

export const UserProfileMenu = ({ user, textColorClass, onLogout }: UserProfileMenuProps) => {
  const joinedDate = user.created_at ? formatDistance(new Date(user.created_at), new Date(), { addSuffix: true }) : '';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
        <UserCircle className={`w-6 h-6 ${textColorClass}`} />
        <span className={textColorClass}>{user.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {user.user_metadata?.full_name || 'User'}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              {user.user_metadata?.company_name && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Building className="h-4 w-4" />
                  <span>{user.user_metadata.company_name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Joined {joinedDate}</span>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex items-center gap-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
