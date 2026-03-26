"use client";

import { ArtworkItem } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import { ArtworkCard } from "./ArtworkCard";

export const ArtworkGrid = ({ artworks }: { artworks?: ArtworkItem[] }) => {
  if (!artworks) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <Skeleton className="h-56 w-full rounded-none" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
        <div className="mb-4 text-4xl">🖼️</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">暂无作品</h3>
        <p className="text-gray-500">当前筛选条件下还没有可展示的内容</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} {...artwork} />
      ))}
    </div>
  );
};
