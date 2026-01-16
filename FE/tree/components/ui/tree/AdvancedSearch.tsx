"use client";

import { memo, useState, useMemo } from "react";
import { Node } from "reactflow";
import { FamilyNodeData } from "./FamilyNode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface AdvancedSearchProps {
  nodes: Node<FamilyNodeData>[];
  onSearch: (results: string[]) => void;
  show: boolean;
  onToggle: () => void;
}

interface SearchFilters {
  name: string;
  gender: "all" | "1" | "2";
  status: "all" | "alive" | "deceased";
  generation: string;
  occupation: string;
}

export const AdvancedSearch = memo(({ nodes, onSearch, show, onToggle }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    gender: "all",
    status: "all",
    generation: "all",
    occupation: "",
  });

  // Combobox states
  const [openGeneration, setOpenGeneration] = useState(false);
  const [generationSearch, setGenerationSearch] = useState("");

  const handleSearch = () => {
    const results = nodes.filter((node) => {
      const data = node.data;

      // Filter by name
      if (filters.name && !data.hoTen?.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }

      // Filter by gender
      if (filters.gender !== "all" && data.gioiTinh !== Number(filters.gender)) {
        return false;
      }

      // Filter by status
      if (filters.status === "alive" && data.ngayMat) {
        return false;
      }
      if (filters.status === "deceased" && !data.ngayMat) {
        return false;
      }

      // Filter by generation
      if (filters.generation !== "all" && data.doiThuoc !== Number(filters.generation)) {
        return false;
      }

      // Filter by occupation
      if (filters.occupation && !data.ngheNghiep?.toLowerCase().includes(filters.occupation.toLowerCase())) {
        return false;
      }

      return true;
    });

    onSearch(results.map((n) => n.id));
  };

  const handleReset = () => {
    setFilters({
      name: "",
      gender: "all",
      status: "all",
      generation: "all",
      occupation: "",
    });
    setGenerationSearch("");
    onSearch([]);
  };

  const generations = useMemo(() => 
    [...new Set(nodes.map((n) => n.data.doiThuoc).filter(Boolean))].sort((a, b) => a! - b!),
    [nodes]
  );

  // Filter generations by search
  const filteredGenerations = useMemo(() => {
    if (!generationSearch) return generations;
    return generations.filter((g) => 
      `Đời ${g}`.toLowerCase().includes(generationSearch.toLowerCase()) ||
      g?.toString().includes(generationSearch)
    );
  }, [generations, generationSearch]);

  if (!show) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 bg-white dark:bg-gray-800 shadow-lg border border-amber-400 dark:border-amber-600 rounded-lg px-3 py-2 hover:shadow-xl transition-all z-10 flex items-center gap-2"
        title="Tìm kiếm nâng cao"
      >
        <Filter className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tìm kiếm nâng cao</span>
      </button>
    );
  }

  return (
    <div className="fixed top-20 left-4 w-80 bg-white dark:bg-gray-800 shadow-xl border border-amber-400 dark:border-amber-600 rounded-lg z-10 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-bold text-sm">Tìm kiếm nâng cao</h3>
        </div>
        <button
          onClick={onToggle}
          className="hover:bg-white/20 rounded p-1 transition-colors"
          title="Đóng"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Tên</label>
          <Input
            type="text"
            placeholder="Nhập tên..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Giới tính</label>
          <Select value={filters.gender} onValueChange={(v) => setFilters({ ...filters, gender: v as any })}>
            <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-600 bg-white/95 backdrop-blur">
              <SelectItem value="all" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                Tất cả
              </SelectItem>
              <SelectItem value="1" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                Nam
              </SelectItem>
              <SelectItem value="2" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                Nữ
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Trạng thái</label>
          <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v as any })}>
            <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-600 bg-white/95 backdrop-blur">
              <SelectItem value="all" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                Tất cả
              </SelectItem>
              <SelectItem value="alive" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                Còn sống
              </SelectItem>
              <SelectItem value="deceased" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                Đã mất
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generation - Combobox with search */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Thế hệ</label>
          <Popover open={openGeneration} onOpenChange={setOpenGeneration}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openGeneration}
                className="w-full h-9 justify-between text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                {filters.generation === "all" 
                  ? "Tất cả" 
                  : `Đời ${filters.generation}`
                }
                <span className="ml-2 h-4 w-4 shrink-0 opacity-50">▼</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0 dark:bg-gray-800 dark:border-gray-600">
              <Command className="dark:bg-gray-800">
                <CommandInput 
                  placeholder="Tìm thế hệ..." 
                  value={generationSearch}
                  onValueChange={setGenerationSearch}
                  className="h-9 dark:bg-gray-700 dark:text-white"
                />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-sm dark:text-gray-400">
                    Không tìm thấy thế hệ
                  </CommandEmpty>
                  <CommandGroup className="dark:bg-gray-800">
                    <CommandItem
                      value="all"
                      onSelect={() => {
                        setFilters({ ...filters, generation: "all" });
                        setOpenGeneration(false);
                        setGenerationSearch("");
                      }}
                      className="dark:text-white dark:hover:bg-gray-700 dark:aria-selected:bg-gray-700"
                    >
                      Tất cả
                    </CommandItem>
                    {filteredGenerations.map((g) => (
                      <CommandItem
                        key={g}
                        value={g!.toString()}
                        onSelect={(value) => {
                          setFilters({ ...filters, generation: value });
                          setOpenGeneration(false);
                          setGenerationSearch("");
                        }}
                        className="dark:text-white dark:hover:bg-gray-700 dark:aria-selected:bg-gray-700"
                      >
                        Đời {g}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Occupation */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Nghề nghiệp</label>
          <Input
            type="text"
            placeholder="Nhập nghề nghiệp..."
            value={filters.occupation}
            onChange={(e) => setFilters({ ...filters, occupation: e.target.value })}
            className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleSearch}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            size="sm"
          >
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <X className="h-4 w-4 mr-2" />
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
});

AdvancedSearch.displayName = "AdvancedSearch";
