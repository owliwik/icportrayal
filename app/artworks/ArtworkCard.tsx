"use client";

import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { Artwork } from "@/lib/types/artwork";
import { ArtworkDetailsModal } from "./ArtworkDetailsModal";
import { supabase } from "@/lib/supabase/client";
import { FaRegPaperPlane } from "react-icons/fa6";

export const ArtworkCard = (artwork: Artwork) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("/default-artwork.jpg");

  useEffect(() => {
    setImageError(false);

    if (!artwork.link) {
      setImageUrl("/default-artwork.jpg");
      return;
    }

    if (artwork.link.startsWith("http")) {
      setImageUrl(artwork.link);
      return;
    }

    // 先当作站点 public 资源路径使用（例如 /artworks/1.jpg）
    if (artwork.link.startsWith("/")) {
      setImageUrl(artwork.link);
      return;
    }

    // 兜底：当作 Supabase Storage（bucket: artworks）对象路径
    const cleanPath = artwork.link.replace(/^\/+/, "");
    try {
      const { data } = supabase.storage.from("artworks").getPublicUrl(cleanPath);
      setImageUrl(data.publicUrl);
    } catch {
      const supabaseUrl = "https://fxehqztapwouuyvpafce.supabase.co";
      setImageUrl(
        `${supabaseUrl}/storage/v1/object/public/artworks/${cleanPath}`,
      );
    }
  }, [artwork.link]);

  const openModal = () => setModalOpened(true);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  };

  const formatDate = useMemo(() => {
    if (!artwork.created_at) return "日期未知";
    const date = new Date(artwork.created_at);
    if (Number.isNaN(date.getTime())) return "日期未知";
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }, [artwork.created_at]);

  return (
    <>
      <div
        aria-label={`查看作品 ${artwork.title || '无标题'}`}
        className={cn(
          "group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all",
          "hover:cursor-pointer hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5",
          "active:scale-[0.98]",
        )}
        onClick={openModal}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="relative h-28 overflow-hidden bg-slate-100">
          {!imageError ? (
            <img
              alt={artwork.title || '艺术作品'}
              src={imageUrl}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-gray-100 flex items-center justify-center">
              <div className="text-2xl text-gray-400 font-bold">
                {(artwork.title || "?").charAt(0)}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <div className="text-sm font-bold drop-shadow-md line-clamp-1">
              {artwork.title || '无标题'}
            </div>
            <div className="text-slate-200 text-xs drop-shadow-md line-clamp-1">
              {formatDate} • {artwork.name || "未知作者"} • {artwork.category || "未分类"}
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 relative min-h-[60px]">
          <div className="text-xs mb-1 line-clamp-2 text-gray-600">
            {artwork.title || "无标题"} · {artwork.category || "未分类"}
          </div>
          <div className="text-xs text-slate-500 line-clamp-1">
            作者: {artwork.name || "未知作者"}
          </div>
          <Button
            aria-label="查看作品详情"
            className="absolute top-[50%] translate-y-[-50%] right-3 rounded-full flex justify-center items-center bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
            onPress={openModal}
            size="sm"
            isIconOnly
          >
            <FaRegPaperPlane className="text-sm" />
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
