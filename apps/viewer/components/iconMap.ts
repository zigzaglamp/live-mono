// apps/viewer/components/iconMap.ts

"use client";
import { Sparkles, Utensils, ShoppingBag, House, Plane, Baby, Laptop, Palette, Ticket, MessageCircleMore, Eye, DoorOpen, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  utensils: Utensils,
  house: House,
  plane: Plane,
  baby: Baby,
  laptop: Laptop,
  palette: Palette,
  ticket: Ticket,
  eye: Eye,
  doorOpen: DoorOpen,
  bell: Bell,
  "message-circle-more": MessageCircleMore,
  "shopping-bag": ShoppingBag,
};
