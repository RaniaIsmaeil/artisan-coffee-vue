export const products = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    description:
      "Floral aroma with notes of citrus and jasmine. Bright acidity and tea-like body.",
    price: 17.5,
    roast_level: "Light",
    origin: "Ethiopia",
    image_url: "/images/placeholder-coffee-1.webp",
  },
  {
    id: "colombia-supremo",
    name: "Colombia Supremo",
    description:
      "Balanced cup with caramel sweetness and a smooth, nutty finish.",
    price: 15.0,
    roast_level: "Medium",
    origin: "Colombia",
    image_url: "/images/placeholder-coffee-2.webp",
  },
  {
    id: "brazil-serra",
    name: "Brazil Serra",
    description:
      "Chocolatey base with roasted almonds and low acidity. Great for espresso.",
    price: 14.0,
    roast_level: "Medium",
    origin: "Brazil",
    image_url: "/images/placeholder-coffee-3.webp",
  },
  {
    id: "kenya-aa",
    name: "Kenya AA",
    description:
      "Juicy berry notes, wine-like acidity, and a lingering sweet finish.",
    price: 18.0,
    roast_level: "Light",
    origin: "Kenya",
    image_url: "/images/placeholder-coffee-4.webp",
  },
  {
    id: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    description:
      "Earthy, syrupy body with cocoa and spice, low acidity. Perfect for a bold cup.",
    price: 16.5,
    roast_level: "Dark",
    origin: "Indonesia",
    image_url: "/images/placeholder-coffee-5.webp",
  },
  {
    id: "house-espresso",
    name: "House Espresso Blend",
    description:
      "Our signature blend-deep sweetness, rich crema, and a balanced profile for milk drinks.",
    price: 16.0,
    roast_level: "Dark",
    origin: "Blend",
    image_url: "/images/placeholder-coffee-6.webp",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
