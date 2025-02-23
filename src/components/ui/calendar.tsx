
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white rounded-lg shadow-lg", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-2 pb-4 relative items-center border-b",
        caption_label: "text-base font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 hover:bg-accent/50 transition-colors"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse mt-2",
        head_row: "flex w-full",
        head_cell: "text-muted-foreground w-10 font-medium text-[0.875rem] py-2",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          "h-10 w-10 p-0 font-normal rounded-full transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "focus:bg-primary focus:text-primary-foreground rounded-full"
        ),
        day_today: "bg-accent/50 text-accent-foreground rounded-full",
        day_outside: "text-muted-foreground/50 opacity-50",
        day_disabled: "text-muted-foreground/50 opacity-30",
        day_range_middle: "aria-selected:bg-accent/50",
        day_hidden: "invisible",
        caption_dropdowns: "dropdown-buttons inline-flex gap-2",
        dropdown: cn(
          "appearance-none outline-none inline-flex bg-transparent",
          "px-3 py-1 text-sm font-medium text-center cursor-pointer",
          "rounded-md hover:bg-accent/50 transition-colors",
          "[&>option]:bg-popover [&>svg]:hidden"
        ),
        vhidden: "hidden",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4 stroke-2" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4 stroke-2" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
