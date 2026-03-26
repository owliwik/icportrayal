"use client";

import { Artwork } from "@/lib/types/artwork";
import { ArtworkCard } from "./ArtworkCard";
import { Skeleton } from "@/components/ui/skeleton";

export const ArtworkGrid = ({ artworks }: { artworks?: Artwork[] }) => {
  return (
    <div className='max-w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-x-5 gap-y-8'>
      {artworks
        ? artworks.map((artwork) => (
            <div key={artwork.id} className='w-64'>
              <ArtworkCard {...artwork} />
            </div>
          ))
        : Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i.toString()} className='w-64 h-[196px]' />
          ))}
    </div>
  );
};