
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdoptionFormData, Animal } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Paw } from "@/components/icons/Paw";

interface AdoptionFormProps {
  animal: Animal;
  onAdoptionSubmit?: (data: AdoptionFormData) => void;
}

const AdoptionForm = ({ animal, onAdoptionSubmit }: AdoptionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AdoptionFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    hasPets: false,
    experience: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, hasPets: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.reason) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі обов'язкові поля форми",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For now we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add adoption application to local storage
      const applications = JSON.parse(localStorage.getItem('adoptionApplications') || '[]');
      const newApplication = {
        id: `app-${Date.now()}`,
        animalId: animal.id,
        animalName: animal.name,
        status: "pending",
        date: new Date().toISOString(),
        formData: formData
      };
      applications.push(newApplication);
      localStorage.setItem('adoptionApplications', JSON.stringify(applications));
      
      // Award coins for adoption application
      const currentCoins = localStorage.getItem('userCoins');
      const userCoins = currentCoins ? parseInt(currentCoins) : 0;
      localStorage.setItem('userCoins', (userCoins + 50).toString());
      
      if (onAdoptionSubmit) {
        onAdoptionSubmit(formData);
      }
      
      toast({
        title: "Заявка на усиновлення подана",
        description: `Дякуємо за ваше бажання усиновити ${animal.name}. Ми зв'яжемося з вами найближчим часом.`,
      });
      
      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        reason: "",
        hasPets: false,
        experience: ""
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося подати заявку. Спробуйте пізніше.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Усиновити {animal.name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Заявка на усиновлення {animal.name}</DialogTitle>
          <DialogDescription>
            Будь ласка, заповніть форму. Наші співробітники зв'яжуться з вами для подальшого обговорення.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ваше ім'я та прізвище</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Адреса проживання</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Чому ви хочете усиновити саме цю тварину?</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="hasPets"
                checked={formData.hasPets}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="hasPets">У мене вже є домашні тварини</Label>
            </div>
            {formData.hasPets && (
              <div className="grid gap-2">
                <Label htmlFor="experience">Розкажіть про ваш досвід з домашніми тваринами</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center">
                  <span className="animate-spin mr-2">
                    <Paw className="h-4 w-4" />
                  </span>
                  Відправлення...
                </div>
              ) : (
                "Подати заявку"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionForm;
