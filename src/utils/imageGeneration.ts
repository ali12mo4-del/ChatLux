const HF_TOKEN = process.env.EXPO_PUBLIC_HF_TOKEN || '';

export async function generateImage(prompt: string): Promise<string | null> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) return null;

    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function isImageRequest(message: string): boolean {
  const keywords = [
    'ارسم', 'صور', 'اعمل صورة', 'generate image',
    'draw', 'create image', 'صورة', 'رسمة'
  ];
  return keywords.some(k => message.toLowerCase().includes(k));
}
