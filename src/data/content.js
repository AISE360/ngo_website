// Central CMS-lite content. Mirror this in Supabase `programs` + `gallery` tables.
// Images below are real field photos copied to /public/field/.

export const ORG = {
  name: 'Thoughtful Hearts Foundation',
  short: 'Thoughtful Hearts',
  tagline: 'People • Opportunities • Brighter Tomorrows',
  address: '3rd Floor, HM Royal, Kondhwa Main Road, Opposite Gagan Avenue, Shivneri Nagar–Kondhwa Khurd, Pune – 411048, Maharashtra',
  mapsQuery: 'HM Royal Kondhwa Main Road Opposite Gagan Avenue Pune 411048',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: 'https://wa.me/919876543210?text=Hello%20Thoughtful%20Hearts%20Foundation%2C%20I%20want%20to%20help',
  email: 'hello@thoughtfulhearts.org.in',
  hoursNote: 'Tue & Thu 2:00 PM–6:00 PM, Sun 2:00 PM–8:00 PM (please call before visiting)',
}

export const PROGRAMS = [
  {
    slug: 'medical-support',
    title: 'Medical & Patient Support',
    short: 'Hospital visits, treatment aid & follow-up care',
    category: 'medical',
    color: '#E86A5E',
    hero: '/field/field-3.jpg',
    images: ['/field/field-3.jpg', '/field/field-5.jpg', '/field/field-7.jpg'],
    stats: [
      { value: 850, suffix: '+', label: 'Patients supported' },
      { value: 120, suffix: '+', label: 'Hospital visits' },
      { value: 60, suffix: '+', label: 'Follow-up cases' },
    ],
    description:
      'We stand beside patients and families during treatment — hospital visits, financial help for medicines and procedures, emotional support, oxygen-equipment assistance and follow-up care coordination in Kondhwa and across Pune.',
    points: [
      'Hospital visits & patient counselling',
      'Financial support for treatment, medicines & diagnostics',
      'Oxygen concentrator / equipment support for home care',
      'Follow-up care coordination with families',
      'Ration & essentials for families in medical distress',
    ],
  },
  {
    slug: 'vocational-training',
    title: 'Vocational Training (Tailoring & Livelihood)',
    short: 'Women’s stitching unit → income skills',
    category: 'livelihood',
    color: '#0E4C5E',
    hero: '/field/field-1.jpg',
    images: ['/field/field-1.jpg', '/field/field-2.jpg', '/field/field-4.jpg'],
    stats: [
      { value: 220, suffix: '+', label: 'Women trained' },
      { value: 6, suffix: '', label: 'Batches completed' },
      { value: 45, suffix: '%', label: 'Earning after training*' },
    ],
    description:
      'Our women’s tailoring and stitching unit teaches block-printing, embroidery, cutting and machine stitching — practical income-generating skills in a supportive classroom with machines, mentors and design inputs.',
    points: [
      'Machine stitching, cutting & finishing',
      'Block printing, embroidery & fashion sketching',
      'Mentored practice batches with design guidance',
      'Pathway to home-based orders & boutique work',
    ],
  },
  {
    slug: 'school-outreach',
    title: 'School & Education Outreach',
    short: 'Classroom sessions, counselling & awareness',
    category: 'education',
    color: '#17768F',
    hero: '/field/field-8.jpg',
    images: ['/field/field-8.jpg', '/field/field-10.jpg', '/field/field-12.jpg'],
    stats: [
      { value: 1500, suffix: '+', label: 'Students reached' },
      { value: 12, suffix: '+', label: 'Partner school visits' },
      { value: 40, suffix: '+', label: 'Awareness sessions' },
    ],
    description:
      'We conduct sessions inside partner schools — motivational talks (“Dream Big, Work Hard, Achieve More”), counselling, awareness and guidance for girls’ classrooms in and around Kondhwa.',
    points: [
      'In-school motivational & counselling sessions',
      'Awareness talks on health, safety & careers',
      'Support for uniforms, books & exam needs (case-based)',
      'Mentor volunteers from the community',
    ],
  },
  {
    slug: 'tech-coding',
    title: 'Tech & Coding Education Center',
    short: 'Computer lab → programming for youth',
    category: 'tech',
    color: '#0A3542',
    hero: '/field/field-13.jpg',
    images: ['/field/field-13.jpg', '/field/field-16.jpg', '/field/field-17.jpg'],
    stats: [
      { value: 180, suffix: '+', label: 'Youth trained' },
      { value: 4, suffix: '', label: 'Lab batches / year' },
      { value: 20, suffix: '+', label: 'Mentor-led projects' },
    ],
    description:
      'A small computer-lab program teaching digital literacy and programming fundamentals to youth — whiteboard concepts, hands-on systems, doubt-solving and project guidance toward internships and jobs.',
    points: [
      'Computer fundamentals & typing',
      'Programming basics with whiteboard + lab practice',
      'Small-batch mentoring & doubt sessions',
      'Career guidance toward internships',
    ],
  },
  {
    slug: 'art-workshops',
    title: 'Art & Creative Workshops',
    short: 'Sketching, painting & craft for children',
    category: 'art',
    color: '#D9A441',
    hero: '/field/field-6.jpg',
    images: ['/field/field-6.jpg', '/field/field-9.jpg', '/field/field-14.jpg'],
    stats: [
      { value: 300, suffix: '+', label: 'Children in workshops' },
      { value: 25, suffix: '+', label: 'Art sessions' },
      { value: 100, suffix: '%', label: 'Free & inclusive' },
    ],
    description:
      'Art and craft sessions for children and young learners — sketching, painting, embroidery-hoop art and fashion illustration that build confidence, focus and joy.',
    points: [
      'Sketching, painting & colour theory basics',
      'Embroidery-hoop & textile art',
      'Fashion illustration & design fun',
      'Showcase of learner work for families',
    ],
  },
]

export const GALLERY = [
  { src: '/field/field-1.jpg', category: 'livelihood', caption: 'Tailoring unit — machine practice' },
  { src: '/field/field-2.jpg', category: 'livelihood', caption: 'Block-print guidance, one-on-one' },
  { src: '/field/field-3.jpg', category: 'medical', caption: 'Hospital visit — patient support' },
  { src: '/field/field-4.jpg', category: 'art', caption: 'Embroidery-hoop artwork' },
  { src: '/field/field-5.jpg', category: 'medical', caption: 'Bedside visit & family counselling' },
  { src: '/field/field-6.jpg', category: 'community', caption: 'Ration kits for families' },
  { src: '/field/field-7.jpg', category: 'medical', caption: 'Home-care oxygen support' },
  { src: '/field/field-8.jpg', category: 'education', caption: 'Classroom counselling session' },
  { src: '/field/field-9.jpg', category: 'community', caption: 'Ration support at centre' },
  { src: '/field/field-10.jpg', category: 'art', caption: 'Fashion sketching practice' },
  { src: '/field/field-11.jpg', category: 'livelihood', caption: 'Stitching hall — batch work' },
  { src: '/field/field-12.jpg', category: 'education', caption: 'School outreach — girls’ classroom' },
  { src: '/field/field-13.jpg', category: 'tech', caption: 'Coding lab — whiteboard concepts' },
  { src: '/field/field-14.jpg', category: 'art', caption: 'Art workshop — group learning' },
  { src: '/field/field-15.jpg', category: 'livelihood', caption: 'Cutting & finishing table' },
  { src: '/field/field-16.jpg', category: 'tech', caption: 'Lab mentoring & doubts' },
  { src: '/field/field-17.jpg', category: 'education', caption: 'Awareness talk in school' },
]

export const IMPACT_STATS = [
  { value: 850, suffix: '+', label: 'Patients & families supported' },
  { value: 1500, suffix: '+', label: 'Students reached in schools' },
  { value: 220, suffix: '+', label: 'Women trained in tailoring' },
  { value: 180, suffix: '+', label: 'Youth in coding & computers' },
]

export const TESTIMONIALS = [
  {
    quote: 'When my husband was on oxygen at home, the Foundation volunteers visited, guided us and stood with us emotionally. We never felt alone.',
    name: 'Family from Kondhwa',
    role: 'Medical support',
  },
  {
    quote: 'I joined the stitching unit with no experience. Today I take small blouse-alteration orders from home. That confidence is everything.',
    name: 'Tailoring learner',
    role: 'Vocational training',
  },
  {
    quote: 'The classroom session made our girls think bigger — “Dream Big, Work Hard” is still written on our board.',
    name: 'Partner school teacher',
    role: 'School outreach',
  },
]

export const POSTS = [
  {
    slug: 'tailoring-batch-showcase',
    title: 'Tailoring batch showcase: from first stitch to finished kurti',
    date: '2026-07-12',
    tag: 'Livelihood',
    image: '/field/field-1.jpg',
    excerpt: 'Block printing, embroidery and machine practice — how our women’s unit builds income skills step by step.',
  },
  {
    slug: 'school-dream-big-session',
    title: '“Dream Big, Work Hard” — counselling inside partner schools',
    date: '2026-06-28',
    tag: 'Education',
    image: '/field/field-8.jpg',
    excerpt: 'Classroom visits, awareness talks and mentoring for girls in Kondhwa schools.',
  },
  {
    slug: 'patient-care-diaries',
    title: 'Patient-care diaries: visits, follow-ups and ration support',
    date: '2026-06-10',
    tag: 'Medical',
    image: '/field/field-5.jpg',
    excerpt: 'Why we combine hospital visits with follow-up calls and essentials for families.',
  },
]
