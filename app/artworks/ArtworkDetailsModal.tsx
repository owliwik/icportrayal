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
import Image from "next/image";
import { useState } from "react";

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
  const imageUrl = artwork.link || '/default-artwork.jpg';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <Modal scrollBehavior='outside' isOpen={isOpened} onOpenChange={(isOpened) => setOpened(isOpened)}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className='text-2xl flex-col'>
              <div>{artwork.title}</div>
              <div className='text-base font-normal text-gray-500'>
                {artwork.name}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100 mb-4">
                {!imageError ? (
                  <Image
                    src={imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-gray-400">
                      {artwork.title.charAt(0)}
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
                  <p className="text-gray-900 mt-1">{artwork.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">创建日期</h3>
                  <p className="text-gray-900 mt-1">{formatDate(artwork.created_at)}</p>
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