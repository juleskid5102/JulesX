// Resend Email Integration
// Uses Resend free tier (100 emails/day)
// API docs: https://resend.com/docs/api-reference/emails/send-email

interface EmailAttachment {
  filename: string;
  content: string; // base64 encoded
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail(apiKey: string, options: EmailOptions): Promise<boolean> {
  if (!apiKey) {
    console.warn('[Email] No API key configured, skipping email');
    return false;
  }

  try {
    const body: any = {
      from: 'Jules Studio <onboarding@resend.dev>',
      to: [options.to],
      subject: options.subject,
      html: options.html,
    };

    if (options.attachments && options.attachments.length > 0) {
      body.attachments = options.attachments;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Email] Failed:', err);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[Email] Error:', e);
    return false;
  }
}

// ── CLIENT CONFIRMATION EMAIL ──

interface ProjectEmailData {
  clientName: string;
  clientEmail: string;
  websiteTypeName: string;
  selectedFeatures: string[];
  estimatedTimeMin: number;
  estimatedTimeMax: number;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  projectId: string;
  projectName?: string;
}

function formatVND(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m : m.toFixed(1)} triệu VNĐ`;
  }
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildConfirmationEmail(data: ProjectEmailData): EmailOptions {
  const featuresHtml = data.selectedFeatures.length > 0
    ? data.selectedFeatures.map(f => `<li style="padding:2px 0;color:#94a3b8;">${escapeHtml(f)}</li>`).join('')
    : '<li style="color:#64748b;">Không có tính năng bổ sung</li>';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#111118;border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:32px;">
      <h1 style="color:#fff;font-size:20px;margin:0 0 8px;">Jules Studio đã nhận yêu cầu của bạn</h1>
      <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Xin chào <strong style="color:#fff;">${escapeHtml(data.clientName)}</strong>,</p>
      <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Cảm ơn bạn đã gửi yêu cầu xây dựng website tại Jules Studio. Dưới đây là thông tin bạn đã đăng ký:</p>

      <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:20px;margin-bottom:16px;">
        <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Mã dự án</p>
        <p style="color:#818cf8;font-size:16px;font-weight:700;margin:0;">${escapeHtml(data.projectId)}</p>
      </div>

      <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:20px;margin-bottom:16px;">
        <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Loại website</p>
        <p style="color:#fff;font-size:14px;font-weight:600;margin:0;">${escapeHtml(data.websiteTypeName)}</p>
      </div>

      <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:20px;margin-bottom:16px;">
        <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Tính năng đã chọn</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;">${featuresHtml}</ul>
      </div>

      <div style="display:flex;gap:12px;margin-bottom:24px;">
        <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;">
          <p style="color:#64748b;font-size:11px;margin:0 0 4px;">⏱ Thời gian</p>
          <p style="color:#fff;font-size:16px;font-weight:700;margin:0;">${data.estimatedTimeMin} – ${data.estimatedTimeMax} ngày</p>
        </div>
        <div style="flex:1;background:rgba(99,102,241,0.1);border-radius:12px;padding:16px;">
          <p style="color:#64748b;font-size:11px;margin:0 0 4px;">💰 Chi phí</p>
          <p style="color:#818cf8;font-size:16px;font-weight:700;margin:0;">~ ${formatVND(data.estimatedPriceMin)} – ${formatVND(data.estimatedPriceMax)}</p>
        </div>
      </div>

      <div style="border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;margin-bottom:20px;">
        <h3 style="color:#fff;font-size:14px;margin:0 0 12px;">Bước tiếp theo</h3>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#94a3b8;">
          <li style="padding:2px 0;">Đội ngũ Jules Studio sẽ xem xét yêu cầu của bạn</li>
          <li style="padding:2px 0;">Chúng tôi sẽ liên hệ để tư vấn chi tiết</li>
          <li style="padding:2px 0;">Bạn sẽ nhận bản mô tả dự án đầy đủ trước khi triển khai</li>
        </ul>
        <p style="color:#64748b;font-size:12px;margin:16px 0 0;">⏱ Thời gian phản hồi: trong vòng 24 giờ.</p>
      </div>

      <p style="color:#475569;font-size:11px;margin:0;font-style:italic;">Chi phí và thời gian hiển thị là ước tính tham khảo.</p>
    </div>
    <p style="color:#334155;font-size:11px;text-align:center;margin:16px 0 0;">Trân trọng, Jules Studio</p>
  </div>
</body>
</html>`;

  return {
    to: data.clientEmail,
    subject: `Jules Studio đã nhận yêu cầu của bạn — ${data.projectId}`,
    html,
  };
}

// ── ADMIN NOTIFICATION EMAIL ──

export function buildAdminNotificationEmail(data: ProjectEmailData, adminEmail: string): EmailOptions {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#111118;border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:32px;">
      <h1 style="color:#fff;font-size:18px;margin:0 0 16px;">🔔 Yêu cầu dự án mới: ${escapeHtml(data.projectId)}</h1>
      <table style="width:100%;font-size:13px;color:#94a3b8;">
        <tr><td style="padding:4px 0;color:#64748b;">Khách:</td><td style="padding:4px 0;color:#fff;">${escapeHtml(data.clientName)}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Email:</td><td style="padding:4px 0;color:#fff;">${escapeHtml(data.clientEmail)}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Loại:</td><td style="padding:4px 0;color:#fff;">${escapeHtml(data.websiteTypeName)}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Timeline:</td><td style="padding:4px 0;color:#fff;">${data.estimatedTimeMin}–${data.estimatedTimeMax} ngày</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Giá:</td><td style="padding:4px 0;color:#818cf8;">${formatVND(data.estimatedPriceMin)} – ${formatVND(data.estimatedPriceMax)}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;

  return {
    to: adminEmail,
    subject: `[New Project] ${data.projectId} — ${data.clientName}`,
    html,
  };
}
