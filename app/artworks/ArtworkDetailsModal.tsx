"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Artwork } from "@/lib/types/artwork";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export const ArtworkDetailsModal = ({
  artwork,
  isOpened,
  setOpened,
}: {
  artwork: Artwork;
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('/default-artwork.jpg');

  useEffect(() => {
    if (!isOpened) return;

    setImageError(false);

    if (!artwork.link) {
      setImageUrl('/default-artwork.jpg');
      return;
    }

    if (artwork.link.startsWith('http')) {
      setImageUrl(artwork.link);
      return;
    }

    // 优先当作站点 public 资源路径（例如 /artworks/1.jpg）
    if (artwork.link.startsWith('/')) {
      setImageUrl(artwork.link);
      return;
    }

    // 兜底：当作 Supabase Storage（bucket: artworks）对象路径
    const cleanPath = artwork.link.replace(/^\/+/, '');
    try {
      const { data } = supabase.storage
        .from('artworks')
        .getPublicUrl(cleanPath);
      setImageUrl(data.publicUrl);
    } catch {
      const supabaseUrl = 'https://fxehqztapwouuyvpafce.supabase.co';
      setImageUrl(`${supabaseUrl}/storage/v1/object/public/artworks/${cleanPath}`);
    }
  }, [artwork.link, isOpened]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '日期未知';
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getFirstChar = (str: string | null | undefined) => {
    if (!str) return '?';
    return str.charAt(0);
  };

  return (
    <Modal scrollBehavior='outside' isOpen={isOpened} onOpenChange={(isOpened) => setOpened(isOpened)}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className='text-2xl flex-col'>
              <div>{artwork.title || '无标题'}</div>
              <div className='text-base font-normal text-gray-500'>
                {artwork.name || '未知作者'}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100 mb-4">
                {!imageError ? (
                  <img
                    src={imageUrl}
                    alt={artwork.title || '艺术作品'}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error('图片加载失败:', imageUrl);
                      setImageError(true);
                    }}
                    onLoad={() => {
                      console.log('图片加载成功:', imageUrl);
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-gray-400">
                      {getFirstChar(artwork.title)}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">作品信息</h3>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm">
                      {artwork.category || '未分类'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">创作者</h3>
                  <p className="text-gray-900 mt-1">{artwork.name || '未知作者'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">创建日期</h3>
                  <p className="text-gray-900 mt-1">{formatDate(artwork.created_at)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">图片路径</h3>
                  <p className="text-xs text-gray-500 mt-1 break-all">{artwork.link || '无'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">完整 URL</h3>
                  <p className="text-xs text-gray-500 mt-1 break-all">{imageUrl}</p>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                关闭
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
