import { cn } from "@/lib/utils";
import Icon from "./icon";
import { Shad } from "./ui";
import { Fragment } from "react";

type Options = {
  id: string;
  label: string;
  icon?: string;
  checked?: boolean;
  onChange: () => void;
};

type Props = {
  label: string;
  iconName?: string;
  iconClassName?: string;
  className?: string;
  size?: number;
  options: Options[];
  disabled?: boolean;
};

const DropdownMenu = ({
  label,
  iconName,
  iconClassName,
  className,
  size = 18,
  options,
  disabled = false,
}: Props) => {
  return (
    <Shad.DropdownMenu>
      <Shad.DropdownMenuTrigger disabled={disabled} asChild>
        <div
          className={cn(
            "flex items-center bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 py-2 rounded-md gap-1.5 px-4 has-[>svg]:px-2.5 cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {iconName && (
            <Icon name={iconName} size={size} className={iconClassName} />
          )}
          {label && <span className="text-sm font-medium">{label}</span>}
        </div>
      </Shad.DropdownMenuTrigger>
      <Shad.DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        {options.map((option) => (
          <Fragment key={option.id}>
            {option.id === "logout" && (
              <div className="h-px bg-border my-1 mx-auto" />
            )}
            <Shad.DropdownMenuItem
              onClick={() => option.onChange()}
              className="flex items-center gap-2 px-2 py-1 capitalize"
            >
              {option.icon && (
                <Icon name={option.icon} size={16} className="mr-2" />
              )}
              <span className="text-sm">{option.label}</span>
            </Shad.DropdownMenuItem>
          </Fragment>
        ))}
      </Shad.DropdownMenuContent>
    </Shad.DropdownMenu>
  );
};
export default DropdownMenu;
