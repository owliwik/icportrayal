import { Metadata } from "next";
import { ArtworksPageClient } from "./ArtworksPageClient";

export const metadata: Metadata = {
  title: "作品展示 | IC Portrayal",
  description: "浏览 IC Portrayal 的视觉作品与创作档案。",
};

export default function ArtworksPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ArtworksPageClient />
      </div>
    </div>
  );
}
