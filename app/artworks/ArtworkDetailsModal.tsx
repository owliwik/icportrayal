"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { ArtworkItem } from "@/lib/mock-data";

export const ArtworkDetailsModal = ({
  artwork,
  isOpened,
  setOpened,
}: {
  artwork: ArtworkItem;
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
}) => {
  return (
    <Modal
      isOpen={isOpened}
      onOpenChange={(nextOpen) => setOpened(nextOpen)}
      scrollBehavior="outside"
      size="3xl"
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex-col">
              <div className="text-2xl">{artwork.title}</div>
              <div className="text-base font-normal text-gray-500">
                {artwork.author}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                  src={artwork.image}
                />
              </div>

              <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Title
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {artwork.title}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Author
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {artwork.author}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Date
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {artwork.date}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                关闭
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
