"use client";

import { useDeferredValue, useState } from "react";

type SearchableItem = {
  title: string;
};

export function useDashboardSearch<T extends SearchableItem>(items: T[]) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredItems = normalizedQuery
    ? items.filter((item) => item.title.toLowerCase().includes(normalizedQuery))
    : items;

  return {
    query,
    setQuery,
    filteredItems,
  };
}
