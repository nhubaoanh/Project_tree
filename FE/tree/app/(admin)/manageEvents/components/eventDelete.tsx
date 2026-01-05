"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEvent } from "@/types/event";
import { deleteEvent } from "@/service/event.service";
import { useToast } from "@/service/useToas";
import storage from "@/utils/storage";

interface EventDeleteModalProps {
  isOpen: boolean;
  events: IEvent[];
  onClose: () => void;
  onSuccess?: () => void;
}

export const EventDeleteModal: React.FC<EventDeleteModalProps> = ({
  isOpen,
  events,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const deleteMutation = useMutation({
    mutationFn: ({ listJson, luUserId }: { listJson: { suKienId: string }[]; luUserId: string }) =>
      deleteEvent(listJson, luUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      showSuccess(events.length > 1 ? `Đã xóa ${events.length} sự kiện.` : "Đã xóa sự kiện.");
      onClose();
      onSuccess?.();
    },
    onError: (error: any) => {
      showError(error.message || "Không thể xóa sự kiện này.");
    },
  });

  const handleConfirmDelete = () => {
    const user = storage.getUser();
    console.log("Events to delete:", events);
    console.log("Events count:", events.length);
    if (events.length > 0 && user?.nguoiDungId) {
      const listJson = events.map((e) => ({ suKienId: e.suKienId }));
      console.log("listJson:", listJson);
      deleteMutation.mutate({ listJson, luUserId: user.nguoiDungId });
    }
  };

  if (!isOpen || events.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-[#d4af37]">
        <h3 className="text-lg font-bold text-[#5d4037] mb-4">
          Xác nhận xóa
        </h3>
        <p className="text-gray-600 mb-6">
          {events.length === 1 ? (
            <>
              Bạn có chắc chắn muốn xóa sự kiện{" "}
              <strong className="text-[#b91c1c]">{events[0].tenSuKien}</strong>?
            </>
          ) : (
            <>
              Bạn có chắc chắn muốn xóa{" "}
              <strong className="text-[#b91c1c]">{events.length} sự kiện</strong> đã chọn?
            </>
          )}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
          >
            {deleteMutation.isPending && <Loader2 className="animate-spin" size={16} />}
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
};
