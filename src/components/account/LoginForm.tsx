
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginFormProps {
  onLoginSuccess: (name: string, email: string) => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!userEmail || !userPassword) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі поля",
        variant: "destructive",
      });
      return;
    }
    
    // Mock login (normally would call an API)
    const mockName = userEmail.split('@')[0];
    
    // Save to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', mockName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userCoins', '100'); // Starting coins for new users
    
    onLoginSuccess(mockName, userEmail);
    
    toast({
      title: "Успішний вхід",
      description: "Ласкаво просимо до вашого облікового запису",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вхід</CardTitle>
        <CardDescription>
          Введіть ваші облікові дані для входу в систему
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Забули пароль?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Увійти</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Немає облікового запису?{" "}
          <a href="#" className="text-primary hover:underline">
            Зареєструватись
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
