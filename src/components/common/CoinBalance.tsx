
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CoinBalanceProps {
  coins: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const CoinBalance = ({ coins, showLabel = true, size = "md" }: CoinBalanceProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-primary ${sizeClasses[size]}`}
            >
              <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
              <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
            </svg>
            <span className={textSizeClasses[size]}>
              {coins} {showLabel && "монет"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Рятувальні монети можна отримати за донати або активність</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CoinBalance;
