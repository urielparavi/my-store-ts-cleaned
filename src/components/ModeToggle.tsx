import { Moon, Sun } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setTheme } from '@/features/theme/themeSlice';

function ModeToggle() {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            relative
            bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-400
            dark:bg-gradient-to-tr dark:from-gray-700 dark:via-gray-800 dark:to-gray-900
            text-yellow-800 dark:text-yellow-300
            hover:brightness-110
            shadow-md
            transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:focus-visible:ring-amber-300
          "
          aria-label="Toggle theme"
        >
          <Sun
            className="
              h-5 w-5
              rotate-0 scale-100
              transition-transform duration-500 ease-in-out
              dark:-rotate-90 dark:scale-0
              absolute
              inset-0
              m-auto
            "
          />
          <Moon
            className="
              h-5 w-5
              rotate-90 scale-0
              transition-transform duration-500 ease-in-out
              dark:rotate-0 dark:scale-100
              absolute
              inset-0
              m-auto
            "
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-36 bg-white dark:bg-gray-900 shadow-lg rounded-md p-1"
      >
        <DropdownMenuItem
          onClick={() => dispatch(setTheme('light'))}
          className="hover:bg-yellow-100 dark:hover:bg-yellow-800 rounded-md transition-colors"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => dispatch(setTheme('dark'))}
          className="hover:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => dispatch(setTheme('system'))}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ModeToggle;
