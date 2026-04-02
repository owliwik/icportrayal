"use client";

import { KeyboardEvent, useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { Artwork } from "@/lib/types/artwork";
import { ArtworkDetailsModal } from "./ArtworkDetailsModal";
import { supabase } from "@/lib/supabase/client";

export const ArtworkCard = (artwork: Artwork) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('/default-artwork.jpg');

  useEffect(() => {
    const getImageUrl = () => {
      if (!artwork.link) {
        setImageUrl('/default-artwork.jpg');
        return;
      }

      if (artwork.link.startsWith('http')) {
        setImageUrl(artwork.link);
        return;
      }

      // 清理路径
      let cleanPath = artwork.link;
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.slice(1);
      }

      try {
        const { data } = supabase.storage
          .from('artworks')
          .getPublicUrl(cleanPath);
        setImageUrl(data.publicUrl);
      } catch (error) {
        const supabaseUrl = 'https://fxehqztapwouuyvpafce.supabase.co';
        setImageUrl(`${supabaseUrl}/storage/v1/object/public/artworks/${cleanPath}`);
      }
    };

    getImageUrl();
  }, [artwork.link]);

  const openModal = () => setModalOpened(true);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '日期未知';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };

  const getFirstChar = (str: string | null | undefined) => {
    if (!str) return '?';
    return str.charAt(0);
  };

  return (
    <>
      <div
        aria-label={`查看作品 ${artwork.title || '无标题'}`}
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
            <img
              alt={artwork.title || '艺术作品'}
              src={imageUrl}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-100">
              <div className="text-5xl font-semibold text-stone-400">
                {getFirstChar(artwork.title)}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="text-lg font-semibold line-clamp-1">
              {artwork.title || '无标题'}
            </div>
            <div className="mt-1 text-sm text-slate-200 line-clamp-1">
              {artwork.name || '未知作者'} • {artwork.category || '未分类'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <div className="text-sm text-slate-500">创建日期</div>
            <div className="mt-1 text-sm font-medium text-slate-900">
              {formatDate(artwork.created_at)}
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