import {
  Ambulance, BadgeCheck, BrickWall, CircleCheck, CircleHelp, FireExtinguisher, Flame, HardHat,
  LifeBuoy, PhoneCall, Send, ShieldCheck, Stethoscope, Truck, Wind, type LucideIcon,
} from "lucide-react";
import type { AgencyKind, IncidentType } from "@shared";

// Every icon that stands for a piece of the app's data, in one place (lucide-react icons).
// Change an icon here and it changes everywhere.

/** What is happening (SOS cards, labels). */
export const TYPE_ICON: Record<IncidentType, LucideIcon> = {
  fire: Flame,
  smoke: Wind,
  medical: Ambulance,
  trapped: LifeBuoy,
  collapse: BrickWall,
  other: CircleHelp,
};

/** Who is coming. */
export const KIND_ICON: Record<AgencyKind, LucideIcon> = {
  fire: Truck,
  ambulance: Ambulance,
  police: ShieldCheck,
};

/** The "answer" to each danger, shown to the reporter (fire → extinguisher). */
export const REMEDY_ICON: Record<IncidentType, LucideIcon> = {
  fire: FireExtinguisher,
  smoke: FireExtinguisher,
  medical: Stethoscope,
  trapped: LifeBuoy,
  collapse: HardHat,
  other: ShieldCheck,
};

/** Reporter's steps: sent, seen, help requested, on the way (vehicles), closed. */
export const STEP_ICON: LucideIcon[] = [Send, BadgeCheck, PhoneCall, Truck, CircleCheck];
