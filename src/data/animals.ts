
import { Animal } from "@/types";

export const animals: Animal[] = [
  {
    id: "1",
    name: "Барсик",
    type: "cat",
    breed: "Звичайна домашня",
    age: 18,
    size: "medium",
    gender: "male",
    health: ["Вакцинований", "Стерилізований", "Здоровий"],
    description: "Барсик - чудовий компаньйон, який любить гратися з іграшками та відпочивати на сонячних підвіконнях. Він дружелюбний і чудово ладнає з іншими котами.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=500&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=500&auto=format&fit=crop",
    ],
    status: "available",
    dateAdded: "2023-03-15",
    adoptionFee: 0
  },
  {
    id: "2",
    name: "Рекс",
    type: "dog",
    breed: "Німецька вівчарка",
    age: 36,
    size: "large",
    gender: "male",
    health: ["Вакцинований", "Чіпований", "Здоровий"],
    description: "Рекс - розумний та відданий пес. Він знає базові команди і любить тривалі прогулянки. Чудовий охоронець для вашого дому та вірний друг для всієї родини.",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=500&auto=format&fit=crop",
    status: "available",
    dateAdded: "2023-05-10"
  },
  {
    id: "3",
    name: "Мурка",
    type: "cat",
    breed: "Сіамська",
    age: 12,
    size: "small",
    gender: "female",
    health: ["Вакцинована", "Стерилізована", "Здорова"],
    description: "Мурка - ніжна та граційна кішечка. Вона любить спокій та комфорт, чудово підійде для тихої домівки. Любить сидіти на колінах та муркотіти.",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=500&auto=format&fit=crop",
    status: "pending",
    dateAdded: "2023-06-20"
  },
  {
    id: "4",
    name: "Бобік",
    type: "dog",
    breed: "Лабрадор",
    age: 24,
    size: "large",
    gender: "male",
    health: ["Вакцинований", "Стерилізований", "Здоровий"],
    description: "Бобік - енергійний та життєрадісний пес. Обожнює грати з м'ячем та приносити палички. Дуже дружелюбний до дітей та інших тварин.",
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=500&auto=format&fit=crop",
    status: "available",
    dateAdded: "2023-02-05"
  },
  {
    id: "5",
    name: "Сніжок",
    type: "cat",
    breed: "Персидська",
    age: 24,
    size: "medium",
    gender: "male",
    health: ["Вакцинований", "Стерилізований", "Спеціальна дієта"],
    description: "Сніжок - розкішний білосніжний кіт з густою шерстю. Він спокійний та елегантний, любить догляд та увагу. Потребує регулярного розчісування.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=500&auto=format&fit=crop",
    status: "available",
    dateAdded: "2023-04-18",
    adoptionFee: 200
  },
  {
    id: "6",
    name: "Лайка",
    type: "dog",
    breed: "Хаскі",
    age: 30,
    size: "large",
    gender: "female",
    health: ["Вакцинована", "Стерилізована", "Здорова"],
    description: "Лайка - активна та грайлива собака. Вона енергійна та потребує багато фізичної активності. Чудово підходить для активної сім'ї, яка любить подорожі та прогулянки.",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=500&auto=format&fit=crop",
    status: "available",
    dateAdded: "2023-05-02"
  }
];
