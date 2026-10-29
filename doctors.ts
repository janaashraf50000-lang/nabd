import { SPECIALTIES } from "@/data/specialties";

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Doctor {
  id: string;
  name: string;
  nameEn: string;
  specialtyId: string;
  specialty: string;
  specialtyEn: string;
  category: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  image: string;
  bio: string;
  qualifications: string[];
  clinic: string;
  address: string;
  hours: string;
  days: string[];
  slots: string[];
  nextSlot: string;
  reviewList: Review[];
}

const IMAGES = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80",
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80",
  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80",
  "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&q=80",
  "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
];

const MALE_FIRST = ["أحمد", "محمد", "خالد", "عمر", "يوسف", "طارق", "ماجد", "بدر", "سلطان", "فهد", "وليد", "عبدالله", "سامي", "رامي", "هشام", "كريم", "زياد", "أنس", "مروان", "عادل"];
const MALE_FIRST_EN = ["Ahmed", "Mohamed", "Khaled", "Omar", "Yousef", "Tarek", "Majed", "Badr", "Sultan", "Fahad", "Waleed", "Abdullah", "Sami", "Rami", "Hesham", "Karim", "Ziad", "Anas", "Marwan", "Adel"];
const FEMALE_FIRST = ["سارة", "منى", "ليلى", "نورة", "هند", "ريم", "أمل", "جواهر", "لمى", "شهد", "فاطمة", "دينا", "ياسمين", "مريم", "رانيا", "هبة", "سلمى", "ندى", "غادة", "إيمان"];
const FEMALE_FIRST_EN = ["Sara", "Mona", "Layla", "Noura", "Hind", "Reem", "Amal", "Jawaher", "Lama", "Shahad", "Fatima", "Dina", "Yasmin", "Mariam", "Rania", "Heba", "Salma", "Nada", "Ghada", "Eman"];
const FAMILY = ["عبدالرحمن", "المنصوري", "العتيبي", "الحربي", "الشمري", "القحطاني", "الدوسري", "السبيعي", "المطيري", "العنزي", "الغامدي", "الشهري", "القرني", "الزهراني", "الرشيد", "العلي", "الحمد", "الفهد", "النعيمي", "المالكي", "الصالح", "الخالدي", "الجهني", "البلوي", "العمري"];
const FAMILY_EN = ["Abdelrahman", "Al-Mansouri", "Al-Otaibi", "Al-Harbi", "Al-Shammari", "Al-Qahtani", "Al-Dosari", "Al-Subaie", "Al-Mutairi", "Al-Anazi", "Al-Ghamdi", "Al-Shehri", "Al-Qarni", "Al-Zahrani", "Al-Rashid", "Al-Ali", "Al-Hamad", "Al-Fahad", "Al-Nuaimi", "Al-Malki", "Al-Saleh", "Al-Khalidi", "Al-Johani", "Al-Balawi", "Al-Omari"];

const CLINICS = ["مستشفى النيل التخصصي", "مركز القاهرة الطبي", "مستشفى الأمل الدولي", "عيادات النخبة", "مركز الشفاء الطبي", "مستشفى المستقبل", "عيادات السلام", "مركز الحياة الطبي", "مستشفى المعادي التخصصي", "عيادات مصر الدولية"];
const CITIES = ["القاهرة - مدينة نصر", "الجيزة - المهندسين", "الإسكندرية - سموحة", "القاهرة - المعادي", "الجيزة - الدقي", "القاهرة - مصر الجديدة", "الإسكندرية - سيدي جابر", "القاهرة - التجمع الخامس"];

const REVIEW_TEXTS = [
  "طبيب ممتاز ومتفهم، شرح الحالة بوضوح وطمأنني كثيراً.",
  "تجربة رائعة، العيادة نظيفة والانتظار قصير جداً.",
  "دكتور محترم ومتمكن، أنصح به بشدة.",
  "استمع لي باهتمام وقدم لي خطة علاج واضحة.",
  "خدمة ممتازة وفريق عمل متعاون، شكراً جزيلاً.",
  "طبيب ذو خبرة عالية، سعيد جداً بالنتيجة.",
  "التشخيص كان دقيقاً والعلاج فعالاً، شكراً دكتور.",
  "تعامل راقٍ واحترافية عالية، تجربة مريحة.",
  "دكتور صبور ويشرح كل التفاصيل، أنصح به.",
  "أفضل تجربة طبية مررت بها، شكراً على الاهتمام.",
];
const REVIEW_AUTHORS = ["منى ع.", "أحمد س.", "سارة م.", "خالد ر.", "هند ك.", "عمر ط.", "نورة ب.", "يوسف ح.", "ريم ص.", "طارق ن.", "لمى ج.", "فهد ع."];

const QUAL_POOL: Record<string, string[]> = {
  default: ["البورد المصري", "زمالة الكلية الملكية", "دكتوراه في الطب", "ماجستير التخصص", "زمالة جامعة القاهرة"],
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function pick<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)];
}

function buildReviews(seed: number, count: number, baseRating: number): Review[] {
  const r = seeded(seed);
  const n = Math.min(count, 4);
  const out: Review[] = [];
  for (let i = 0; i < n; i++) {
    const rating = Math.max(3, Math.min(5, Math.round(baseRating + (r() - 0.5) * 2)));
    out.push({
      id: `rv-${seed}-${i}`,
      author: pick(REVIEW_AUTHORS, r),
      date: `2025-0${1 + Math.floor(r() * 5)}-${String(1 + Math.floor(r() * 27)).padStart(2, "0")}`,
      rating,
      text: pick(REVIEW_TEXTS, r),
    });
  }
  return out;
}

function buildDoctors(): Doctor[] {
  const doctors: Doctor[] = [];
  let counter = 0;

  SPECIALTIES.forEach((spec, specIndex) => {
    const count = 5 + (specIndex % 2); // 5 or 6 per specialty
    for (let i = 0; i < count; i++) {
      counter++;
      const r = seeded(counter * 137 + specIndex * 31);
      const isFemale = r() > 0.5;
      const first = isFemale ? pick(FEMALE_FIRST, r) : pick(MALE_FIRST, r);
      const firstEn = isFemale ? pick(FEMALE_FIRST_EN, r) : pick(MALE_FIRST_EN, r);
      const fam = pick(FAMILY, r);
      const famEn = pick(FAMILY_EN, r);
      const rating = Math.round((4.3 + r() * 0.7) * 10) / 10;
      const reviews = 40 + Math.floor(r() * 260);
      const experience = 5 + Math.floor(r() * 20);
      const fee = 150 + Math.floor(r() * 15) * 25;
      const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"].filter(() => r() > 0.35);
      const finalSlots = slots.length >= 3 ? slots : ["09:00", "11:00", "14:00", "16:30"];
      const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"].filter(() => r() > 0.3);
      const finalDays = days.length >= 3 ? days : ["الأحد", "الثلاثاء", "الخميس"];
      const quals = [
        pick(QUAL_POOL.default, r),
        pick(QUAL_POOL.default, r),
        `${experience} ${"سنوات خبرة"}`,
      ];

      doctors.push({
        id: `doc-${spec.id}-${i + 1}`,
        name: `د. ${first} ${fam}`,
        nameEn: `Dr. ${firstEn} ${famEn}`,
        specialtyId: spec.id,
        specialty: spec.ar,
        specialtyEn: spec.en,
        category: spec.category,
        rating,
        reviews,
        experience,
        fee,
        image: IMAGES[counter % IMAGES.length],
        bio: `${isFemale ? "استشارية" : "استشاري"} ${spec.ar}، خبرة ${experience} سنوات في تشخيص وعلاج الحالات المتعلقة بـ${spec.descAr}.`,
        qualifications: quals,
        clinic: pick(CLINICS, r),
        address: pick(CITIES, r),
        hours: `${finalDays[0]} - ${finalDays[finalDays.length - 1]}، 9:00 ص - 6:00 م`,
        days: finalDays,
        slots: finalSlots,
        nextSlot: finalSlots[0],
        reviewList: buildReviews(counter, reviews, rating),
      });
    }
  });

  return doctors;
}

export const DOCTORS: Doctor[] = buildDoctors();

export function getDoctorsBySpecialty(specialtyId: string): Doctor[] {
  return DOCTORS.filter((d) => d.specialtyId === specialtyId);
}

export function getDoctorById(id: string): Doctor | undefined {
  return DOCTORS.find((d) => d.id === id);
}