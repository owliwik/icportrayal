"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { artworks, ArtworkItem } from "@/lib/mock-data";
import sleep from "@/lib/sleep";
import { ArtworkGrid } from "./ArtworkGrid";

type ArtworkYear = string;

export const ArtworksPageClient = () => {
  const [items, setItems] = useState<ArtworkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<ArtworkYear | null>(null);

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      setError(null);

      try {
        await sleep(700);
        setItems(artworks);
      } catch {
        setError("获取作品数据失败");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  const years = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.date.slice(0, 4)))).sort(
      (a, b) => Number(b) - Number(a),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!activeYear) return items;
    return items.filter((item) => item.date.startsWith(activeYear));
  }, [activeYear, items]);

  const latestArtwork = useMemo(() => {
    return [...items].sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  }, [items]);

  const activeLabel = activeYear ? `${activeYear} 作品` : "全部作品";

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      await sleep(500);
      setItems(artworks);
    } catch {
      setError("刷新作品数据失败");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-stone-800 to-amber-900 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
          <div className="relative z-10">
            <h1 className="text-4xl font-semibold tracking-tight">作品展示</h1>
            <p className="mt-2 text-slate-200">
              Design, image, and visual archive
            </p>
          </div>
        </div>

        <div className="min-h-[360px] flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <Spinner label="加载作品中..." color="primary" size="lg" />
            <div className="text-sm text-slate-500">正在整理创作档案</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[360px] flex flex-col items-center justify-center space-y-4 rounded-2xl border border-rose-100 bg-rose-50/60 p-8 text-center">
        <div className="text-3xl">⚠️</div>
        <div className="text-lg text-rose-600">加载失败: {error}</div>
        <Button color="primary" onPress={handleRefresh}>
          重试加载
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-stone-800 to-amber-900 p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">作品展示</h1>
            <p className="mt-2 text-slate-200">
              Design, image, and visual archive
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <span className="rounded-full border border-white/20 px-3 py-1">
                总数 {items.length}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                创作者 {new Set(items.map((item) => item.author)).size}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                年份 {years.length}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Latest
            </div>
            <div className="mt-2 text-lg font-semibold">
              {latestArtwork?.title || "No artwork yet"}
            </div>
            <div className="mt-1 text-sm text-slate-200">
              {latestArtwork
                ? `${latestArtwork.author} · ${latestArtwork.date}`
                : "Archive pending"}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <Button
            className="min-w-[110px]"
            color={!activeYear ? "primary" : "default"}
            onPress={() => setActiveYear(null)}
            variant={!activeYear ? "solid" : "bordered"}
          >
            全部作品 ({items.length})
          </Button>
          {years.map((year) => {
            const isActive = activeYear === year;
            const count = items.filter((item) =>
              item.date.startsWith(year),
            ).length;

            return (
              <Button
                key={year}
                className="min-w-[110px]"
                color={isActive ? "primary" : "default"}
                onPress={() =>
                  setActiveYear((prev) => (prev === year ? null : year))
                }
                variant={isActive ? "solid" : "bordered"}
              >
                {year} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeLabel}
            <span className="ml-2 text-lg text-gray-500">
              ({filteredItems.length}件)
            </span>
          </h2>
          {activeYear && (
            <Button
              color="default"
              onPress={() => setActiveYear(null)}
              size="sm"
              variant="flat"
            >
              清除筛选
            </Button>
          )}
        </div>

        <ArtworkGrid artworks={filteredItems} />
      </div>
    </div>
  );
};
