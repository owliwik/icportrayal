"use client";

import { KeyboardEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { ArtworkItem } from "@/lib/mock-data";
import { ArtworkDetailsModal } from "./ArtworkDetailsModal";

export const ArtworkCard = (artwork: ArtworkItem) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [imageError, setImageError] = useState(false);

  const openModal = () => setModalOpened(true);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  };

  return (
    <>
      <div
        aria-label={`查看作品 ${artwork.title}`}
        className={cn(
          "group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all",
          "hover:cursor-pointer hover:border-amber-300 hover:shadow-lg hover:-translate-y-1",
          "active:scale-[0.99]",
        )}
        onClick={openModal}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="relative h-64 overflow-hidden bg-slate-100">
          {!imageError ? (
            <Image
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              src={artwork.image}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-100">
              <div className="text-5xl font-semibold text-stone-400">
                {artwork.title.charAt(0)}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="text-lg font-semibold line-clamp-1">
              {artwork.title}
            </div>
            <div className="mt-1 text-sm text-slate-200 line-clamp-1">
              {artwork.author}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <div className="text-sm text-slate-500">Archive Date</div>
            <div className="mt-1 text-sm font-medium text-slate-900">
              {artwork.date}
            </div>
          </div>

          <Button
            className="bg-amber-50 text-amber-700 hover:bg-amber-100"
            onPress={openModal}
            size="sm"
          >
            查看详情
          </Button>
        </div>
      </div>

      <ArtworkDetailsModal
        artwork={artwork}
        isOpened={modalOpened}
        setOpened={setModalOpened}
      />
    </>
  );
};
