"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { Button } from "@nextui-org/button";
import { Artwork, CATEGORY_OPTIONS, mockArtworks } from "@/lib/types/artwork";
import { ArtworkGrid } from "./ArtworkGrid";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import { FaFilter } from "react-icons/fa";

const Page = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [useMockData, setUseMockData] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const fetchArtworks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo("正在从数据库获取数据...");

      console.log("[Client] 开始获取艺术作品数据");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/artworks", {
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      clearTimeout(timeoutId);

      console.log("[Client] 响应状态:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.error || "获取数据失败"}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        if (data.length === 0) {
          setUseMockData(true);
          setArtworks(mockArtworks);
        } else {
          console.log(`[Client] 成功获取 ${data.length} 条数据`);
          setDebugInfo(`成功获取 ${data.length} 条数据`);
          setUseMockData(false);
          setArtworks(data);
        }
      } else {
        setDebugInfo("数据格式错误，使用示例数据");
        setUseMockData(true);
        setArtworks(mockArtworks);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setDebugInfo("请求超时，显示示例数据");
      } else {
        const errorMessage = error instanceof Error ? error.message : "获取作品数据失败";
        setDebugInfo(`${errorMessage}，显示示例数据`);
      }

      setUseMockData(true);
      setArtworks(mockArtworks);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const filteredArtworks = useMemo(() => {
    if (!activeCategory) return artworks;
    return artworks.filter((artwork) => artwork.category === activeCategory); // 使用 category
  }, [activeCategory, artworks]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    artworks.forEach((artwork) => {
      const category = artwork.category || "未分类"; // 使用 category
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [artworks]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleRefresh = () => {
    setUseMockData(false);
    fetchArtworks();
  };

  if (loading && artworks.length === 0) {
    return (
      <div className="space-y-10 max-w-7xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-stone-700 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">
                艺术作品
              </h1>
              <p className="text-slate-200 mt-2">
                展示创意 · 感受艺术魅力
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
                <span className="rounded-full border border-white/20 px-3 py-1">
                  总数 {artworks.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[360px] flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <Spinner label="加载作品中..." color="primary" size="lg" />
            <div className="text-sm text-slate-500">首次加载可能需要一点时间</div>
            {debugInfo && <div className="text-xs text-slate-400 mt-2">{debugInfo}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-stone-700 p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              艺术作品
            </h1>
            <p className="text-slate-200 mt-2">展示创意 · 感受艺术魅力</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <span className="rounded-full border border-white/20 px-3 py-1">
                总数 {artworks.length}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                当前 {filteredArtworks.length}
              </span>
            </div>
            {debugInfo && (
              <div className="mt-2 text-xs text-slate-300">
                {debugInfo}
                {useMockData && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 rounded-full">
                    示例数据模式
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {useMockData && (
              <Button
                color="warning"
                size="sm"
                variant="flat"
                onPress={handleRefresh}
                className="bg-yellow-500/20"
              >
                尝试连接数据库
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={!activeCategory ? "solid" : "bordered"}
            color={!activeCategory ? "primary" : "default"}
            onPress={() => setActiveCategory(null)}
            startContent={<FaFilter className="text-sm" />}
            className="min-w-[110px]"
          >
            全部 ({artworks.length})
          </Button>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <Button
              key={category}
              variant={activeCategory === category ? "solid" : "bordered"}
              color={activeCategory === category ? "primary" : "default"}
              onPress={() => handleCategoryClick(category)}
              className="min-w-[110px]"
            >
              {category} ({count})
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeCategory ? activeCategory : "全部作品"}
            <span className="text-gray-500 text-lg ml-2">
              ({filteredArtworks.length}个)
            </span>
          </h2>
          {activeCategory && (
            <Button
              size="sm"
              variant="flat"
              color="default"
              onPress={() => setActiveCategory(null)}
            >
              清除筛选
            </Button>
          )}
        </div>

        {filteredArtworks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-2xl mb-2">🔍</div>
            <div className="mb-2">没有找到该分类的作品</div>
            <div className="text-sm text-gray-400 mb-4">尝试选择其他分类或查看全部作品</div>
            <Button
              color="primary"
              variant="flat"
              onPress={() => setActiveCategory(null)}
            >
              查看全部作品
            </Button>
          </div>
        ) : (
          <ArtworkGrid artworks={filteredArtworks} />
        )}
      </div>
    </div>
  );
};

export default Page;