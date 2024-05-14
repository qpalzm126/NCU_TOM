import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

const settings = [
  { name: "Dashboard", url: "/dashboard/lulin", disabled: false },
  { name: "Settings", url: "/settings", disabled: true },
];

import { Button as ButtonUI } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthTooltip() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonUI variant="outline">Hi, {}</ButtonUI>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {settings.map((setting) => (
            <DropdownMenuItem key={setting.name} disabled={setting.disabled}>
              <Link href={setting.url} passHref>
                {setting.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem> Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
