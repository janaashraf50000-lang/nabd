import {
  Stethoscope, Users, Activity, ClipboardCheck, ShieldCheck, HeartHandshake, HardHat,
  HeartPulse, Zap, Scissors, GitBranch, Gauge, Brain, BrainCircuit, MessageCircleHeart,
  Baby, Moon, Bone, AlignVerticalSpaceAround, Dumbbell, Hand, Accessibility, Pill,
  Wind, Heart, Flower2, Sparkles, Eye, Ear, MessageCircle, Droplet, Ribbon, Smile,
  FlaskConical, Scan, Atom, Dna, Apple, Bug, Siren, Syringe, Plane, Bandage,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Stethoscope, Users, Activity, ClipboardCheck, ShieldCheck, HeartHandshake, HardHat,
  HeartPulse, Zap, Scissors, GitBranch, Gauge, Brain, BrainCircuit, MessageCircleHeart,
  Baby, Moon, Bone, AlignVerticalSpaceAround, Dumbbell, Hand, Accessibility, Pill,
  Wind, Heart, Flower2, Sparkles, Eye, Ear, MessageCircle, Droplet, Ribbon, Smile,
  FlaskConical, Scan, Atom, Dna, Apple, Bug, Siren, Syringe, Plane, Bandage,
};

export function SpecialtyIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? Stethoscope;
  return <Icon className={className} />;
}