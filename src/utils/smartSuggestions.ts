export const SUGGESTIONS: Record<string, string[]> = {
  default: [
    'ما هو الذكاء الاصطناعي؟',
    'احكيلي نكتة',
    'ساعدني في التخطيط ليومي',
    'اقترح عليا فيلم',
  ],
  morning: [
    'صباح الخير! ايه برنامجي النهارده؟',
    'محتاج تحفيز الصبح',
    'ايه أكلة فطار صحية؟',
  ],
  evening: [
    'عندي وقت فراغ، ايه تقترح؟',
    'محتاج أسترخي، ساعدني',
    'احكيلي حاجة ممتعة',
  ],
  programming: [
    'ساعدني في bug في الكود',
    'اشرحلي الـ API',
    'اعمل معايا code review',
  ],
  doctor: [
    'عندي صداع، ايه السبب؟',
    'ايه أكل صحي للقلب؟',
    'كيف أحسن نومي؟',
  ],
};

export function getSmartSuggestions(
  personality: string,
  lastMessage?: string
): string[] {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return SUGGESTIONS.morning;
  if (hour >= 18) return SUGGESTIONS.evening;
  if (personality === 'programmer') return SUGGESTIONS.programming;
  if (personality === 'doctor') return SUGGESTIONS.doctor;

  return SUGGESTIONS.default;
}
