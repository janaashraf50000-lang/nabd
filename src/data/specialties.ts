export interface Specialty {
  id: string;
  ar: string;
  en: string;
  category: string;
  categoryAr: string;
  descAr: string;
  descEn: string;
  icon: string;
}

export interface SpecialtyCategory {
  id: string;
  ar: string;
  en: string;
  color: string;
}

export const CATEGORIES: SpecialtyCategory[] = [
  { id: "primary", ar: "الطب العام والرعاية الأولية", en: "General & Primary Care", color: "bg-indigo-50 text-indigo-600" },
  { id: "heart", ar: "القلب والأوعية الدموية", en: "Heart & Blood Vessels", color: "bg-rose-50 text-rose-600" },
  { id: "brain", ar: "الدماغ والأعصاب والصحة النفسية", en: "Brain, Nerves & Mental Health", color: "bg-violet-50 text-violet-600" },
  { id: "bones", ar: "العظام والمفاصل والتأهيل", en: "Bones, Joints & Rehab", color: "bg-amber-50 text-amber-600" },
  { id: "children", ar: "الأطفال وحديثي الولادة", en: "Children & Newborns", color: "bg-sky-50 text-sky-600" },
  { id: "women", ar: "صحة المرأة والحمل", en: "Women's Health", color: "bg-pink-50 text-pink-600" },
  { id: "skin", ar: "الجلد والشعر", en: "Skin & Hair", color: "bg-orange-50 text-orange-600" },
  { id: "eyes", ar: "العيون والأنف والأذن والحنجرة", en: "Eyes, ENT & Speech", color: "bg-teal-50 text-teal-600" },
  { id: "digestive", ar: "الجهاز الهضمي والكبد", en: "Digestive & Liver", color: "bg-lime-50 text-lime-600" },
  { id: "kidney", ar: "الكلى والمسالك البولية", en: "Kidneys & Urinary", color: "bg-cyan-50 text-cyan-600" },
  { id: "lungs", ar: "الرئة والجهاز التنفسي", en: "Lungs & Respiratory", color: "bg-blue-50 text-blue-600" },
  { id: "hormones", ar: "الهرمونات والسكري والتمثيل الغذائي", en: "Hormones & Diabetes", color: "bg-emerald-50 text-emerald-600" },
  { id: "blood", ar: "الدم والمناعة والأورام", en: "Blood, Immunity & Cancer", color: "bg-red-50 text-red-600" },
  { id: "surgery", ar: "الجراحة والإجراءات المتخصصة", en: "Surgery & Procedures", color: "bg-slate-100 text-slate-600" },
  { id: "dental", ar: "طب الأسنان وصحة الفم", en: "Dental & Oral Health", color: "bg-indigo-50 text-indigo-600" },
  { id: "diagnostic", ar: "الخدمات التشخيصية والمختبرية", en: "Diagnostic & Laboratory", color: "bg-purple-50 text-purple-600" },
  { id: "nutrition", ar: "التغذية والخدمات المتخصصة", en: "Nutrition & Specialized", color: "bg-green-50 text-green-600" },
];

export const SPECIALTIES: Specialty[] = [
  // Primary Care
  { id: "general-practice", ar: "الطب العام", en: "General Practice", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "رعاية صحية شاملة لجميع الحالات", descEn: "Comprehensive care for all conditions", icon: "Stethoscope" },
  { id: "family-medicine", ar: "طب الأسرة", en: "Family Medicine", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "رعاية صحية لجميع أفراد الأسرة", descEn: "Healthcare for the whole family", icon: "Users" },
  { id: "internal-medicine", ar: "الطب الباطني", en: "Internal Medicine", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "تشخيص وعلاج أمراض البالغين", descEn: "Diagnosis and treatment of adult diseases", icon: "Activity" },
  { id: "health-checkups", ar: "الفحوصات العامة", en: "General Health Checkups", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "فحوصات دورية شاملة", descEn: "Comprehensive periodic checkups", icon: "ClipboardCheck" },
  { id: "preventive-medicine", ar: "الطب الوقائي", en: "Preventive Medicine", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "الوقاية من الأمراض والتطعيمات", descEn: "Disease prevention and vaccination", icon: "ShieldCheck" },
  { id: "geriatric-medicine", ar: "طب الشيخوخة", en: "Geriatric Medicine", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "رعاية صحة كبار السن", descEn: "Healthcare for the elderly", icon: "HeartHandshake" },
  { id: "occupational-medicine", ar: "طب العمل", en: "Occupational Medicine", category: "primary", categoryAr: "الطب العام والرعاية الأولية", descAr: "صحة العاملين والبيئة المهنية", descEn: "Worker health and occupational environment", icon: "HardHat" },

  // Heart
  { id: "cardiology", ar: "طب القلب", en: "Cardiology", category: "heart", categoryAr: "القلب والأوعية الدموية", descAr: "تشخيص وعلاج أمراض القلب", descEn: "Diagnosis and treatment of heart disease", icon: "HeartPulse" },
  { id: "interventional-cardiology", ar: "قسطرة القلب التداخلية", en: "Interventional Cardiology", category: "heart", categoryAr: "القلب والأوعية الدموية", descAr: "قسطرة القلب والشرايين التاجية", descEn: "Cardiac catheterization and coronary arteries", icon: "Activity" },
  { id: "cardiac-electrophysiology", ar: "كهربية القلب", en: "Cardiac Electrophysiology", category: "heart", categoryAr: "القلب والأوعية الدموية", descAr: "اضطرابات نظم القلب", descEn: "Heart rhythm disorders", icon: "Zap" },
  { id: "cardiovascular-surgery", ar: "جراحة القلب والأوعية", en: "Cardiovascular Surgery", category: "heart", categoryAr: "القلب والأوعية الدموية", descAr: "جراحات القلب المفتوح", descEn: "Open heart surgery", icon: "Scissors" },
  { id: "vascular-surgery", ar: "جراحة الأوعية الدموية", en: "Vascular Surgery", category: "heart", categoryAr: "القلب والأوعية الدموية", descAr: "علاج الدوالي وأمراض الشرايين", descEn: "Varicose veins and arterial disease", icon: "GitBranch" },
  { id: "hypertension-clinics", ar: "عيادات ضغط الدم", en: "Hypertension Clinics", category: "heart", categoryAr: "القلب والأوعية الدموية", descAr: "متابعة وعلاج ارتفاع ضغط الدم", descEn: "Management of high blood pressure", icon: "Gauge" },

  // Brain
  { id: "neurology", ar: "طب الأعصاب", en: "Neurology", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "أمراض الجهاز العصبي", descEn: "Diseases of the nervous system", icon: "Brain" },
  { id: "neurosurgery", ar: "جراحة الأعصاب", en: "Neurosurgery", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "جراحات الدماغ والعمود الفقري", descEn: "Brain and spine surgery", icon: "Scissors" },
  { id: "psychiatry", ar: "الطب النفسي", en: "Psychiatry", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "تشخيص وعلاج الاضطرابات النفسية", descEn: "Diagnosis and treatment of mental disorders", icon: "BrainCircuit" },
  { id: "psychology", ar: "علم النفس والعلاج النفسي", en: "Psychology & Psychotherapy", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "العلاج النفسي والدعم", descEn: "Psychotherapy and support", icon: "MessageCircleHeart" },
  { id: "child-psychiatry", ar: "طب نفسي للأطفال والمراهقين", en: "Child & Adolescent Psychiatry", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "الصحة النفسية للأطفال والمراهقين", descEn: "Mental health for children and teens", icon: "Baby" },
  { id: "neuropsychiatry", ar: "الطب النفسي العصبي", en: "Neuropsychiatry", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "اضطرابات نفسية وعصبية مشتركة", descEn: "Combined psychiatric and neurological disorders", icon: "Brain" },
  { id: "sleep-medicine", ar: "طب النوم", en: "Sleep Medicine", category: "brain", categoryAr: "الدماغ والأعصاب والصحة النفسية", descAr: "اضطرابات النوم", descEn: "Sleep disorders", icon: "Moon" },

  // Bones
  { id: "orthopedics", ar: "جراحة العظام", en: "Orthopedics", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "أمراض وجراحات العظام والمفاصل", descEn: "Bone and joint diseases and surgery", icon: "Bone" },
  { id: "spine-surgery", ar: "جراحة العمود الفقري", en: "Spine Surgery", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "جراحات العمود الفقري والانزلاق", descEn: "Spine and disc surgery", icon: "AlignVerticalSpaceAround" },
  { id: "sports-medicine", ar: "الطب الرياضي", en: "Sports Medicine", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "إصابات الرياضيين والتأهيل", descEn: "Sports injuries and rehabilitation", icon: "Dumbbell" },
  { id: "rheumatology", ar: "أمراض الروماتيزم", en: "Rheumatology", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "أمراض المفاصل والمناعة الذاتية", descEn: "Joint and autoimmune diseases", icon: "Hand" },
  { id: "rehab-medicine", ar: "الطب الطبيعي والتأهيل", en: "Physical Medicine & Rehabilitation", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "التأهيل الطبي والوظيفي", descEn: "Medical and functional rehabilitation", icon: "Accessibility" },
  { id: "physiotherapy", ar: "العلاج الطبيعي", en: "Physiotherapy", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "تمارين وعلاج طبيعي", descEn: "Exercises and physical therapy", icon: "Activity" },
  { id: "pain-management", ar: "إدارة الألم", en: "Pain Management", category: "bones", categoryAr: "العظام والمفاصل والتأهيل", descAr: "علاج الألم المزمن", descEn: "Chronic pain treatment", icon: "Pill" },

  // Children
  { id: "pediatrics", ar: "طب الأطفال", en: "Pediatrics", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "رعاية صحة الأطفال", descEn: "Children's healthcare", icon: "Baby" },
  { id: "neonatology", ar: "طب حديثي الولادة", en: "Neonatology", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "رعاية المواليد الجدد", descEn: "Newborn care", icon: "Baby" },
  { id: "pediatric-cardiology", ar: "قلب الأطفال", en: "Pediatric Cardiology", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "أمراض قلب الأطفال", descEn: "Children's heart diseases", icon: "HeartPulse" },
  { id: "pediatric-neurology", ar: "أعصاب الأطفال", en: "Pediatric Neurology", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "أمراض أعصاب الأطفال", descEn: "Children's neurological diseases", icon: "Brain" },
  { id: "pediatric-surgery", ar: "جراحة الأطفال", en: "Pediatric Surgery", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "جراحات الأطفال وحديثي الولادة", descEn: "Pediatric and neonatal surgery", icon: "Scissors" },
  { id: "pediatric-orthopedics", ar: "عظام الأطفال", en: "Pediatric Orthopedics", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "عظام ومفاصل الأطفال", descEn: "Children's bones and joints", icon: "Bone" },
  { id: "pediatric-endocrinology", ar: "غدد الأطفال", en: "Pediatric Endocrinology", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "هرمونات ونمو الأطفال", descEn: "Children's hormones and growth", icon: "Activity" },
  { id: "pediatric-pulmonology", ar: "رئة الأطفال", en: "Pediatric Pulmonology", category: "children", categoryAr: "الأطفال وحديثي الولادة", descAr: "أمراض تنفسية للأطفال", descEn: "Children's respiratory diseases", icon: "Wind" },

  // Women
  { id: "obgyn", ar: "النساء والولادة", en: "Obstetrics & Gynecology", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "صحة المرأة والحمل والولادة", descEn: "Women's health, pregnancy and childbirth", icon: "Heart" },
  { id: "maternal-fetal", ar: "طب الأم والجنين", en: "Maternal-Fetal Medicine", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "الحمل عالي الخطورة", descEn: "High-risk pregnancy", icon: "Baby" },
  { id: "reproductive-medicine", ar: "طب الإنجاب والعقم", en: "Reproductive Medicine & Infertility", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "علاج تأخر الإنجاب", descEn: "Infertility treatment", icon: "Flower2" },
  { id: "fertility-services", ar: "خدمات الخصوبة", en: "Fertility Services", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "أطفال الأنابيب والخصوبة", descEn: "IVF and fertility", icon: "Flower2" },
  { id: "gynecological-surgery", ar: "جراحة النساء", en: "Gynecological Surgery", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "جراحات الجهاز التناسلي", descEn: "Reproductive system surgery", icon: "Scissors" },
  { id: "breast-health", ar: "صحة الثدي", en: "Breast Health", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "فحوصات وأمراض الثدي", descEn: "Breast screening and diseases", icon: "Heart" },
  { id: "menopause-care", ar: "رعاية سن الأمل", en: "Menopause Care", category: "women", categoryAr: "صحة المرأة والحمل", descAr: "رعاية مرحلة انقطاع الطمث", descEn: "Menopause care", icon: "Flower2" },

  // Skin
  { id: "dermatology", ar: "الأمراض الجلدية", en: "Dermatology", category: "skin", categoryAr: "الجلد والشعر", descAr: "أمراض الجلد والشعر والأظافر", descEn: "Skin, hair and nail diseases", icon: "Sparkles" },
  { id: "pediatric-dermatology", ar: "جلدية الأطفال", en: "Pediatric Dermatology", category: "skin", categoryAr: "الجلد والشعر", descAr: "أمراض جلدية للأطفال", descEn: "Children's skin diseases", icon: "Baby" },
  { id: "clinical-dermatology", ar: "الجلدية الإكلينيكية", en: "Clinical Dermatology", category: "skin", categoryAr: "الجلد والشعر", descAr: "تشخيص وعلاج الأمراض الجلدية", descEn: "Diagnosis and treatment of skin diseases", icon: "Stethoscope" },
  { id: "hair-scalp", ar: "أمراض الشعر وفروة الرأس", en: "Hair & Scalp Disorders", category: "skin", categoryAr: "الجلد والشعر", descAr: "تساقط الشعر ومشاكل الفروة", descEn: "Hair loss and scalp problems", icon: "Sparkles" },
  { id: "dermatologic-surgery", ar: "جراحة الجلد", en: "Dermatologic Surgery", category: "skin", categoryAr: "الجلد والشعر", descAr: "جراحات جلدية تجميلية", descEn: "Cosmetic skin surgery", icon: "Scissors" },

  // Eyes
  { id: "ophthalmology", ar: "طب العيون", en: "Ophthalmology", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "أمراض وجراحات العيون", descEn: "Eye diseases and surgery", icon: "Eye" },
  { id: "retina", ar: "الشبكية والجسم الزجاجي", en: "Retina & Vitreous", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "أمراض الشبكية", descEn: "Retinal diseases", icon: "Eye" },
  { id: "glaucoma", ar: "المياه الزرقاء", en: "Glaucoma", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "تشخيص وعلاج الجلوكوما", descEn: "Glaucoma diagnosis and treatment", icon: "Eye" },
  { id: "pediatric-ophthalmology", ar: "عيون الأطفال", en: "Pediatric Ophthalmology", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "أمراض عيون الأطفال", descEn: "Children's eye diseases", icon: "Baby" },
  { id: "ent", ar: "الأنف والأذن والحنجرة", en: "ENT (Ear, Nose & Throat)", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "أمراض الأنف والأذن والحنجرة", descEn: "Ear, nose and throat diseases", icon: "Ear" },
  { id: "audiology", ar: "سمعيات", en: "Audiology", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "تشخيص وعلاج السمع", descEn: "Hearing diagnosis and treatment", icon: "Ear" },
  { id: "hearing-balance", ar: "اضطرابات السمع والتوازن", en: "Hearing & Balance Disorders", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "الدوار ومشاكل التوازن", descEn: "Vertigo and balance problems", icon: "Activity" },
  { id: "speech-therapy", ar: "علاج النطق واللغة", en: "Speech & Language Therapy", category: "eyes", categoryAr: "العيون والأنف والأذن والحنجرة", descAr: "تأخر النطق واللغة", descEn: "Speech and language delay", icon: "MessageCircle" },

  // Digestive
  { id: "gastroenterology", ar: "الجهاز الهضمي", en: "Gastroenterology", category: "digestive", categoryAr: "الجهاز الهضمي والكبد", descAr: "أمراض الجهاز الهضمي", descEn: "Digestive system diseases", icon: "Activity" },
  { id: "hepatology", ar: "أمراض الكبد", en: "Hepatology", category: "digestive", categoryAr: "الجهاز الهضمي والكبد", descAr: "أمراض الكبد والمرارة", descEn: "Liver and gallbladder diseases", icon: "Activity" },
  { id: "colorectal-surgery", ar: "جراحة القولون والمستقيم", en: "Colorectal Surgery", category: "digestive", categoryAr: "الجهاز الهضمي والكبد", descAr: "جراحات القولون والمستقيم", descEn: "Colon and rectal surgery", icon: "Scissors" },
  { id: "proctology", ar: "جراحة الشرج والمستقيم", en: "Proctology", category: "digestive", categoryAr: "الجهاز الهضمي والكبد", descAr: "أمراض الشرج والمستقيم", descEn: "Anorectal diseases", icon: "Scissors" },
  { id: "digestive-health", ar: "صحة الجهاز الهضمي", en: "General Digestive Health", category: "digestive", categoryAr: "الجهاز الهضمي والكبد", descAr: "رعاية عامة للجهاز الهضمي", descEn: "General digestive care", icon: "Stethoscope" },
  { id: "bariatric-surgery", ar: "جراحة السمنة", en: "Bariatric Surgery", category: "digestive", categoryAr: "الجهاز الهضمي والكبد", descAr: "جراحات إنقاص الوزن", descEn: "Weight loss surgery", icon: "Scissors" },

  // Kidney
  { id: "nephrology", ar: "أمراض الكلى", en: "Nephrology", category: "kidney", categoryAr: "الكلى والمسالك البولية", descAr: "أمراض الكلى والغسيل", descEn: "Kidney diseases and dialysis", icon: "Droplet" },
  { id: "urology", ar: "المسالك البولية", en: "Urology", category: "kidney", categoryAr: "الكلى والمسالك البولية", descAr: "أمراض المسالك البولية", descEn: "Urinary tract diseases", icon: "Droplet" },
  { id: "pediatric-urology", ar: "مسالك الأطفال", en: "Pediatric Urology", category: "kidney", categoryAr: "الكلى والمسالك البولية", descAr: "مسالك بولية للأطفال", descEn: "Children's urinary tract", icon: "Baby" },
  { id: "kidney-transplant", ar: "زراعة الكلى", en: "Kidney Transplant Medicine", category: "kidney", categoryAr: "الكلى والمسالك البولية", descAr: "زراعة ومتابعة الكلى", descEn: "Kidney transplant and follow-up", icon: "Activity" },
  { id: "andrology", ar: "طب الذكورة", en: "Andrology", category: "kidney", categoryAr: "الكلى والمسالك البولية", descAr: "صحة الرجل والخصوبة", descEn: "Men's health and fertility", icon: "Droplet" },

  // Lungs
  { id: "pulmonology", ar: "أمراض الصدر", en: "Pulmonology", category: "lungs", categoryAr: "الرئة والجهاز التنفسي", descAr: "أمراض الرئة والتنفس", descEn: "Lung and respiratory diseases", icon: "Wind" },
  { id: "respiratory-medicine", ar: "طب الجهاز التنفسي", en: "Respiratory Medicine", category: "lungs", categoryAr: "الرئة والجهاز التنفسي", descAr: "تشخيص وعلاج أمراض التنفس", descEn: "Diagnosis and treatment of respiratory diseases", icon: "Wind" },
  { id: "allergy-immunology", ar: "الحساسية والمناعة", en: "Allergy & Immunology", category: "lungs", categoryAr: "الرئة والجهاز التنفسي", descAr: "الحساسية وأمراض المناعة", descEn: "Allergy and immune diseases", icon: "ShieldCheck" },
  { id: "asthma-clinics", ar: "عيادات الربو", en: "Asthma Clinics", category: "lungs", categoryAr: "الرئة والجهاز التنفسي", descAr: "متابعة وعلاج الربو", descEn: "Asthma management", icon: "Wind" },
  { id: "sleep-breathing", ar: "اضطرابات التنفس أثناء النوم", en: "Sleep-Related Breathing Disorders", category: "lungs", categoryAr: "الرئة والجهاز التنفسي", descAr: "الشخير وانقطاع النفس", descEn: "Snoring and sleep apnea", icon: "Moon" },

  // Hormones
  { id: "endocrinology", ar: "الغدد الصماء", en: "Endocrinology", category: "hormones", categoryAr: "الهرمونات والسكري والتمثيل الغذائي", descAr: "أمراض الغدد والهرمونات", descEn: "Gland and hormone diseases", icon: "Activity" },
  { id: "diabetes-care", ar: "رعاية السكري", en: "Diabetes Care", category: "hormones", categoryAr: "الهرمونات والسكري والتمثيل الغذائي", descAr: "متابعة وعلاج السكري", descEn: "Diabetes management", icon: "Droplet" },
  { id: "thyroid-disorders", ar: "أمراض الغدة الدرقية", en: "Thyroid Disorders", category: "hormones", categoryAr: "الهرمونات والسكري والتمثيل الغذائي", descAr: "فرط ونقص نشاط الدرقية", descEn: "Hyper and hypothyroidism", icon: "Activity" },
  { id: "metabolic-medicine", ar: "طب التمثيل الغذائي", en: "Metabolic Medicine", category: "hormones", categoryAr: "الهرمونات والسكري والتمثيل الغذائي", descAr: "اضطرابات الأيض", descEn: "Metabolic disorders", icon: "Activity" },

  // Blood
  { id: "hematology", ar: "أمراض الدم", en: "Hematology", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "أمراض الدم والدم غير الطبيعي", descEn: "Blood diseases", icon: "Droplet" },
  { id: "medical-oncology", ar: "الأورام الطبية", en: "Medical Oncology", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "علاج الأورام بالأدوية", descEn: "Cancer treatment with medication", icon: "Ribbon" },
  { id: "surgical-oncology", ar: "جراحة الأورام", en: "Surgical Oncology", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "استئصال الأورام جراحياً", descEn: "Surgical tumor removal", icon: "Scissors" },
  { id: "radiation-oncology", ar: "الأورام الإشعاعية", en: "Radiation Oncology", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "العلاج الإشعاعي للأورام", descEn: "Radiation therapy for tumors", icon: "Zap" },
  { id: "hematologic-oncology", ar: "أورام الدم", en: "Hematologic Oncology", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "أورام الدم واللمفومة", descEn: "Blood cancers and lymphoma", icon: "Droplet" },
  { id: "clinical-immunology", ar: "المناعة الإكلينيكية", en: "Clinical Immunology", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "أمراض نقص المناعة", descEn: "Immunodeficiency diseases", icon: "ShieldCheck" },
  { id: "autoimmune", ar: "الروماتيزم والمناعة الذاتية", en: "Rheumatology & Autoimmune Diseases", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "أمراض المناعة الذاتية", descEn: "Autoimmune diseases", icon: "Hand" },
  { id: "palliative-care", ar: "الرعاية التلطيفية", en: "Palliative Care", category: "blood", categoryAr: "الدم والمناعة والأورام", descAr: "رعاية المرضى المزمنين", descEn: "Care for chronic patients", icon: "HeartHandshake" },

  // Surgery
  { id: "general-surgery", ar: "الجراحة العامة", en: "General Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "جراحات البطن والمناظير", descEn: "Abdominal and laparoscopic surgery", icon: "Scissors" },
  { id: "cardiothoracic-surgery", ar: "جراحة القلب والصدر", en: "Cardiothoracic Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "جراحات القلب والصدر", descEn: "Heart and chest surgery", icon: "Scissors" },
  { id: "plastic-surgery", ar: "الجراحة التجميلية والترميمية", en: "Plastic & Reconstructive Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "جراحات تجميلية وترميمية", descEn: "Cosmetic and reconstructive surgery", icon: "Sparkles" },
  { id: "maxillofacial-surgery", ar: "جراحة الفم والوجه والفكين", en: "Oral & Maxillofacial Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "جراحات الفم والوجه", descEn: "Mouth and facial surgery", icon: "Scissors" },
  { id: "thoracic-surgery", ar: "جراحة الصدر", en: "Thoracic Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "جراحات الرئة والصدر", descEn: "Lung and chest surgery", icon: "Scissors" },
  { id: "transplant-surgery", ar: "جراحة الزراعة", en: "Transplant Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "زراعة الأعضاء", descEn: "Organ transplantation", icon: "Activity" },
  { id: "minimally-invasive", ar: "الجراحة المحدودة التدخل", en: "Minimally Invasive Surgery", category: "surgery", categoryAr: "الجراحة والإجراءات المتخصصة", descAr: "جراحات المناظير المتقدمة", descEn: "Advanced laparoscopic surgery", icon: "Scissors" },

  // Dental
  { id: "general-dentistry", ar: "طب الأسنان العام", en: "General Dentistry", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "رعاية عامة للأسنان", descEn: "General dental care", icon: "Smile" },
  { id: "orthodontics", ar: "تقويم الأسنان", en: "Orthodontics", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "تقويم وترتيب الأسنان", descEn: "Braces and teeth alignment", icon: "Smile" },
  { id: "pediatric-dentistry", ar: "أسنان الأطفال", en: "Pediatric Dentistry", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "رعاية أسنان الأطفال", descEn: "Children's dental care", icon: "Baby" },
  { id: "oral-surgery", ar: "جراحة الفم", en: "Oral Surgery", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "جراحات الفم والأسنان", descEn: "Mouth and dental surgery", icon: "Scissors" },
  { id: "periodontics", ar: "أمراض اللثة", en: "Periodontics", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "علاج أمراض اللثة", descEn: "Gum disease treatment", icon: "Smile" },
  { id: "endodontics", ar: "علاج الجذور", en: "Endodontics", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "علاج عصب الأسنان", descEn: "Root canal treatment", icon: "Smile" },
  { id: "prosthodontics", ar: "تركيبات الأسنان", en: "Prosthodontics", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "تركيبات وأطقم الأسنان", descEn: "Dental prosthetics and dentures", icon: "Smile" },
  { id: "oral-medicine", ar: "طب الفم", en: "Oral Medicine", category: "dental", categoryAr: "طب الأسنان وصحة الفم", descAr: "أمراض الفم والغشاء المخاطي", descEn: "Oral and mucosal diseases", icon: "Stethoscope" },

  // Diagnostic
  { id: "clinical-pathology", ar: "علم الأمراض الإكلينيكي", en: "Clinical Pathology", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "تشخيص الأمراض مخبرياً", descEn: "Laboratory disease diagnosis", icon: "FlaskConical" },
  { id: "laboratory-medicine", ar: "طب المختبرات", en: "Laboratory Medicine", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "تحاليل طبية شاملة", descEn: "Comprehensive medical tests", icon: "FlaskConical" },
  { id: "radiology", ar: "الأشعة", en: "Radiology", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "التصوير الطبي بالأشعة", descEn: "Medical imaging", icon: "Scan" },
  { id: "diagnostic-imaging", ar: "التصوير التشخيصي", en: "Diagnostic Imaging", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "رنين ومقطعي وموجات", descEn: "MRI, CT and ultrasound", icon: "Scan" },
  { id: "interventional-radiology", ar: "الأشعة التداخلية", en: "Interventional Radiology", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "إجراءات علاجية بالأشعة", descEn: "Image-guided procedures", icon: "Scan" },
  { id: "nuclear-medicine", ar: "الطب النووي", en: "Nuclear Medicine", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "التصوير والعلاج النووي", descEn: "Nuclear imaging and therapy", icon: "Atom" },
  { id: "medical-genetics", ar: "الوراثة الطبية", en: "Medical Genetics", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "الأمراض الوراثية والجينية", descEn: "Genetic and hereditary diseases", icon: "Dna" },
  { id: "clinical-biochemistry", ar: "الكيمياء الحيوية الإكلينيكية", en: "Clinical Biochemistry", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "تحاليل كيميائية حيوية", descEn: "Biochemical analysis", icon: "FlaskConical" },
  { id: "microbiology", ar: "الأحياء الدقيقة", en: "Microbiology", category: "diagnostic", categoryAr: "الخدمات التشخيصية والمختبرية", descAr: "العدوى والجراثيم", descEn: "Infection and bacteria", icon: "FlaskConical" },

  // Nutrition & Specialized
  { id: "clinical-nutrition", ar: "التغذية العلاجية", en: "Clinical Nutrition", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "تغذية علاجية للمرضى", descEn: "Therapeutic nutrition for patients", icon: "Apple" },
  { id: "dietetics", ar: "علوم التغذية", en: "Dietetics", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "أنظمة غذائية صحية", descEn: "Healthy diet plans", icon: "Apple" },
  { id: "sports-nutrition", ar: "تغذية الرياضيين", en: "Sports Nutrition", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "تغذية للرياضيين", descEn: "Athlete nutrition", icon: "Dumbbell" },
  { id: "infectious-disease", ar: "الأمراض المعدية", en: "Infectious Disease Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "تشخيص وعلاج العدوى", descEn: "Infection diagnosis and treatment", icon: "Bug" },
  { id: "tropical-medicine", ar: "طب المناطق الحارة", en: "Tropical Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "أمراض المناطق الاستوائية", descEn: "Tropical diseases", icon: "Bug" },
  { id: "emergency-medicine", ar: "طب الطوارئ", en: "Emergency Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "الحالات الطارئة", descEn: "Emergency cases", icon: "Siren" },
  { id: "intensive-care", ar: "العناية المركزة", en: "Intensive Care Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "رعاية الحالات الحرجة", descEn: "Critical care", icon: "Activity" },
  { id: "anesthesiology", ar: "التخدير", en: "Anesthesiology", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "التخدير وإدارة الألم", descEn: "Anesthesia and pain management", icon: "Syringe" },
  { id: "pain-medicine", ar: "طب الألم", en: "Pain Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "علاج الألم المتخصص", descEn: "Specialized pain treatment", icon: "Pill" },
  { id: "travel-medicine", ar: "طب المسافرين", en: "Travel Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "تطعيمات ونصائح السفر", descEn: "Travel vaccines and advice", icon: "Plane" },
  { id: "genetic-counseling", ar: "الاستشارات الوراثية", en: "Genetic Counseling", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "استشارات وراثية", descEn: "Genetic counseling", icon: "Dna" },
  { id: "wound-care", ar: "رعاية الجروح", en: "Wound Care", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "علاج ومتابعة الجروح", descEn: "Wound treatment and follow-up", icon: "Bandage" },
  { id: "rehabilitation-medicine", ar: "طب التأهيل", en: "Rehabilitation Medicine", category: "nutrition", categoryAr: "التغذية والخدمات المتخصصة", descAr: "تأهيل شامل", descEn: "Comprehensive rehabilitation", icon: "Accessibility" },
];

export function getSpecialtyById(id: string): Specialty | undefined {
  return SPECIALTIES.find((s) => s.id === id);
}

export function getSpecialtiesByCategory(categoryId: string): Specialty[] {
  return SPECIALTIES.filter((s) => s.category === categoryId);
}