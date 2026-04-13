"use client";

import { useEffect } from "react";
import { track } from "@/components/Analytics";

type Props = {
  event: "view_category" | "view_theme" | "view_item";
  params: Record<string, unknown>;
};

export function TrackView({ event, params }: Props) {
  useEffect(() => {
    track(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, JSON.stringify(params)]);
  return null;
}
