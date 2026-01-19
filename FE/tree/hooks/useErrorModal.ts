import { useState } from "react";

interface ErrorItem {
  row?: number;
  field: string;
  message: string;
  value?: any;
}

interface UseErrorModalReturn {
  // States
  isOpen: boolean;
  title: string;
  errors: ErrorItem[];
  warnings: ErrorItem[];
  validCount: number;
  totalCount: number;
  
  // Actions
  showError: (
    title: string,
    errors: ErrorItem[],
    warnings?: ErrorItem[],
    summary?: { validCount?: number; totalCount?: number }
  ) => void;
  hideError: () => void;
}

export const useErrorModal = (): UseErrorModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [warnings, setWarnings] = useState<ErrorItem[]>([]);
  const [validCount, setValidCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const showError = (
    errorTitle: string,
    errorList: ErrorItem[],
    warningList: ErrorItem[] = [],
    summary?: { validCount?: number; totalCount?: number }
  ) => {
    setTitle(errorTitle);
    setErrors(errorList);
    setWarnings(warningList);
    setValidCount(summary?.validCount || 0);
    setTotalCount(summary?.totalCount || 0);
    setIsOpen(true);
  };

  const hideError = () => {
    setIsOpen(false);
    setTitle("");
    setErrors([]);
    setWarnings([]);
    setValidCount(0);
    setTotalCount(0);
  };

  return {
    // States
    isOpen,
    title,
    errors,
    warnings,
    validCount,
    totalCount,
    
    // Actions
    showError,
    hideError,
  };
};