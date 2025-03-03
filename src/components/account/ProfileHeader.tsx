
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CoinBalance from "@/components/common/CoinBalance";

interface ProfileHeaderProps {
  name: string;
  email: string;
  coins: number;
  onLogout: () => void;
}

const ProfileHeader = ({ name, email, coins, onLogout }: ProfileHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <Badge variant="outline" className="mb-1">Користувач</Badge>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <CoinBalance coins={coins} />
        <Button variant="outline" size="sm" onClick={onLogout}>
          Вийти
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
