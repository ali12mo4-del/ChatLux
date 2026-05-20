import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function exportChatAsPDF(messages: any[], title: string) {
  try {
    const html = `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; direction: rtl; }
    h1 { color: #4fc3f7; text-align: center; border-bottom: 2px solid #4fc3f7; padding-bottom: 10px; }
    .date { color: #888; text-align: center; margin-bottom: 20px; font-size: 12px; }
    .message { margin: 10px 0; padding: 12px 16px; border-radius: 12px; max-width: 80%; }
    .user { background: #4fc3f7; color: #000; margin-left: auto; text-align: right; }
    .assistant { background: #1a2035; color: #fff; margin-right: auto; text-align: right; }
    .label { font-size: 11px; opacity: 0.7; margin-bottom: 4px; }
    .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <h1>✨ ChatLux</h1>
  <div class="date">${title} - ${new Date().toLocaleDateString('ar')}</div>
  ${messages.map(m => `
    <div class="message ${m.role}">
      <div class="label">${m.role === 'user' ? '👤 أنا' : '🤖 ChatLux'}</div>
      ${m.content}
    </div>
  `).join('')}
  <div class="footer">تم التصدير من ChatLux by Ali Mohammed</div>
</body>
</html>`;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'مشاركة المحادثة',
    });
  } catch (e) {
    console.error(e);
  }
}
