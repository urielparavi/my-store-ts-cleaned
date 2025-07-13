import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';
import { Button } from './ui/button';
import { links } from '@/utils';
import { useAppSelector } from '@/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function LinksDropdown() {
  const user = useAppSelector((state) => state.userState.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-52 lg:hidden shadow-md border border-gray-200 dark:border-gray-700"
        align="start"
        sideOffset={25}
      >
        {links.map((link) => {
          const restricted = link.href === 'checkout' || link.href === 'orders';
          if (restricted && !user) return null;

          const isActive = location.pathname === `/${link.href}`;

          return (
            <DropdownMenuItem
              key={link.label}
              onSelect={() => {
                setOpen(false);
                navigate(link.href);
              }}
              className={`text-sm capitalize w-full px-4 py-2 rounded-md transition-colors
  ${
    isActive
      ? 'bg-gray-100 text-orange-500 font-semibold dark:bg-zinc-800'
      : 'hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white text-muted-foreground'
  }
`}
            >
              {link.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
