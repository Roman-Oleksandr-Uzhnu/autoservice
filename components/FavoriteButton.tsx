"use client";

import { useFavorites } from "@/contexts/FavoritesContext";

type Props = {
  serviceId: number;
};

export default function FavoriteButton({ serviceId }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(serviceId);

  return (
    <button
      onClick={() => toggleFavorite(serviceId)}
      className="text-2xl hover:scale-110 transition cursor-pointer"
      title={
        liked
          ? "Видалити з обраного"
          : "Додати в обране"
      }
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}