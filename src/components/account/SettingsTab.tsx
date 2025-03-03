
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsTabProps {
  name: string;
  email: string;
}

const SettingsTab = ({ name, email }: SettingsTabProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Налаштування облікового запису</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Особиста інформація</CardTitle>
          <CardDescription>
            Оновіть ваші особисті дані та контактну інформацію
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Повне ім'я</Label>
                <Input id="fullName" defaultValue={name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountEmail">Email</Label>
                <Input id="accountEmail" type="email" defaultValue={email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380501234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адреса</Label>
                <Input id="address" placeholder="Ваша адреса" />
              </div>
            </div>
            <Button type="button">Зберегти зміни</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Зміна пароля</CardTitle>
          <CardDescription>
            Оновіть ваш пароль для безпеки облікового запису
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Поточний пароль</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Новий пароль</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Підтвердіть новий пароль</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button type="button">Змінити пароль</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsTab;
