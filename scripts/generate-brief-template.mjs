/**
 * Generate Word Template — Brief Dự Án — Jules Studio
 * Tạo file .docx template với branding Jules Studio
 * Admin copy nội dung brief vào các section placeholder
 *
 * Run: node scripts/generate-brief-template.mjs
 */

import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, PageBreak, BorderStyle, TabStopPosition,
  TabStopType, Footer, Header, ImageRun, Table, TableRow,
  TableCell, WidthType, ShadingType, TableBorders,
} from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'jules-studio-brief-template.docx');

// Brand colors (hex)
const BRAND = {
  indigo: '6366F1',
  dark: '1E293B',
  slate700: '334155',
  slate400: '94A3B8',
  slate200: 'E2E8F0',
  white: 'FFFFFF',
};

// ═══════════════════════════════════════════════════════════
// HELPER: Styled text runs
// ═══════════════════════════════════════════════════════════
const brandFont = 'Segoe UI';

function heading(text, level = HeadingLevel.HEADING_1, options = {}) {
  return new Paragraph({
    heading: level,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text,
        font: brandFont,
        bold: true,
        color: options.color || BRAND.indigo,
        size: options.size || (level === HeadingLevel.HEADING_1 ? 32 : 26),
      }),
    ],
  });
}

function body(text, options = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        font: brandFont,
        size: options.size || 22,
        color: options.color || BRAND.dark,
        italics: options.italic || false,
        bold: options.bold || false,
      }),
    ],
  });
}

function placeholder(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: `[${text}]`,
        font: brandFont,
        size: 22,
        color: BRAND.slate400,
        italics: true,
      }),
    ],
  });
}

function bullet(text, options = {}) {
  return new Paragraph({
    bullet: { level: options.level || 0 },
    spacing: { after: 60 },
    children: [
      new TextRun({
        text,
        font: brandFont,
        size: 22,
        color: options.color || BRAND.dark,
      }),
    ],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: BRAND.slate200 },
    },
    children: [new TextRun({ text: '', size: 4 })],
  });
}

function emptyLine() {
  return new Paragraph({ spacing: { after: 80 }, children: [] });
}

function sectionNumber(num, title) {
  return new Paragraph({
    spacing: { before: 400, after: 150 },
    children: [
      new TextRun({
        text: `${num}. `,
        font: brandFont,
        bold: true,
        size: 28,
        color: BRAND.indigo,
      }),
      new TextRun({
        text: title.toUpperCase(),
        font: brandFont,
        bold: true,
        size: 28,
        color: BRAND.dark,
      }),
    ],
  });
}

function labelValue(label, placeholderText) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: `${label}: `,
        font: brandFont,
        bold: true,
        size: 22,
        color: BRAND.slate700,
      }),
      new TextRun({
        text: placeholderText,
        font: brandFont,
        size: 22,
        color: BRAND.slate400,
        italics: true,
      }),
    ],
  });
}

// ═══════════════════════════════════════════════════════════
// DOCUMENT
// ═══════════════════════════════════════════════════════════
async function generate() {
  const doc = new Document({
    creator: 'Jules Studio',
    title: 'Brief Dự Án — Jules Studio',
    description: 'Template mô tả dự án website',
    styles: {
      default: {
        document: {
          run: { font: brandFont, size: 22, color: BRAND.dark },
        },
      },
    },
    sections: [
      // ─── COVER PAGE ───
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          emptyLine(), emptyLine(), emptyLine(), emptyLine(),
          emptyLine(), emptyLine(), emptyLine(), emptyLine(),

          // Brand name
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: '✦ JULES STUDIO',
                font: brandFont,
                bold: true,
                size: 48,
                color: BRAND.indigo,
              }),
            ],
          }),

          // Subtitle
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'Thiết kế Website Chuyên Nghiệp — Hiện Đại — Tốc Độ',
                font: brandFont,
                size: 22,
                color: BRAND.slate700,
              }),
            ],
          }),

          divider(),

          // Doc title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: 'BRIEF DỰ ÁN',
                font: brandFont,
                bold: true,
                size: 52,
                color: BRAND.dark,
              }),
            ],
          }),

          emptyLine(), emptyLine(),

          // Project info
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'Dự án: ', font: brandFont, size: 24, color: BRAND.slate700 }),
              new TextRun({ text: '[Tên dự án]', font: brandFont, size: 24, color: BRAND.slate400, italics: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'Khách hàng: ', font: brandFont, size: 24, color: BRAND.slate700 }),
              new TextRun({ text: '[Tên khách hàng]', font: brandFont, size: 24, color: BRAND.slate400, italics: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'Ngày lập: ', font: brandFont, size: 24, color: BRAND.slate700 }),
              new TextRun({ text: '[DD/MM/YYYY]', font: brandFont, size: 24, color: BRAND.slate400, italics: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'Version: ', font: brandFont, size: 24, color: BRAND.slate700 }),
              new TextRun({ text: '1.0', font: brandFont, size: 24, color: BRAND.dark }),
            ],
          }),

          emptyLine(), emptyLine(), emptyLine(), emptyLine(),

          // Contact
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '📧 contact@julesstudio.dev  •  📱 0xxx.xxx.xxx  •  🌐 julesstudio.dev',
                font: brandFont,
                size: 18,
                color: BRAND.slate400,
              }),
            ],
          }),
        ],
      },

      // ─── CONTENT PAGES ───
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: '✦ Jules Studio — Brief Dự Án',
                    font: brandFont,
                    size: 16,
                    color: BRAND.slate400,
                    italics: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Tài liệu nội bộ Jules Studio — Không phát tán',
                    font: brandFont,
                    size: 14,
                    color: BRAND.slate400,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // ─── SECTION 1 ───
          sectionNumber(1, 'Tổng Quan Dự Án'),
          labelValue('Tên dự án', '[Điền tên dự án]'),
          labelValue('Loại website', '[Landing / Giới thiệu / Doanh nghiệp / E-commerce / Web App / Booking / Blog]'),
          emptyLine(),
          body('Mục tiêu:', { bold: true, color: BRAND.slate700 }),
          placeholder('Mô tả mục tiêu chính của dự án (2-3 câu)'),
          emptyLine(),
          body('Mô tả tổng quan:', { bold: true, color: BRAND.slate700 }),
          placeholder('Mô tả chức năng chính và đặc điểm nổi bật (3-5 câu)'),

          divider(),

          // ─── SECTION 2 ───
          sectionNumber(2, 'Đối Tượng Sử Dụng'),
          emptyLine(),
          body('👤 Người dùng (User):', { bold: true }),
          bullet('Cần tài khoản: [Có / Không]'),
          bullet('Hành vi chính: [Xem thông tin, liên hệ, đặt lịch...]'),
          emptyLine(),
          body('👨‍💼 Quản trị (Admin):', { bold: true }),
          bullet('Quản lý: [Nội dung, đơn hàng, khách hàng...]'),
          bullet('Dashboard: [Có / Không]'),
          emptyLine(),
          placeholder('Thêm role khác nếu có (Staff, Editor...)'),

          divider(),

          // ─── SECTION 3 ───
          sectionNumber(3, 'Luồng Chính (User Flow)'),
          emptyLine(),
          body('Luồng người dùng:', { bold: true, color: BRAND.slate700 }),
          bullet('Bước 1: [Mô tả]'),
          bullet('Bước 2: [Mô tả]'),
          bullet('Bước 3: [Mô tả]'),
          bullet('Bước 4: [Mô tả]'),
          bullet('Bước 5: [Mô tả]'),
          emptyLine(),
          body('Luồng Admin (nếu có):', { bold: true, color: BRAND.slate700 }),
          bullet('Bước 1: [Mô tả]'),
          bullet('Bước 2: [Mô tả]'),
          bullet('Bước 3: [Mô tả]'),

          divider(),

          // ─── SECTION 4 ───
          sectionNumber(4, 'Tính Năng Chi Tiết'),
          body('(Danh sách tính năng đã chọn từ Excel báo giá, mô tả chi tiết hơn)', { italic: true, color: BRAND.slate400 }),
          emptyLine(),

          body('⚙️ CORE (Trang cơ bản)', { bold: true, color: BRAND.indigo }),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          emptyLine(),

          body('📝 NỘI DUNG', { bold: true, color: BRAND.indigo }),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          emptyLine(),

          body('🔧 KỸ THUẬT', { bold: true, color: BRAND.indigo }),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          bullet('[Tên tính năng]: [Mô tả 1-2 câu]'),
          emptyLine(),

          placeholder('Thêm categories khác: Admin, Auth, Thông báo, Nâng cao...'),

          divider(),

          // ─── SECTION 5 ───
          sectionNumber(5, 'Ràng Buộc & Giới Hạn'),
          body('Những tính năng KHÔNG nằm trong scope dự án:', { italic: true, color: BRAND.slate700 }),
          emptyLine(),
          bullet('❌ [Tính năng không có 1]'),
          bullet('❌ [Tính năng không có 2]'),
          bullet('❌ [Tính năng không có 3]'),
          bullet('❌ [Tính năng không có 4]'),
          bullet('❌ [Tính năng không có 5]'),
          emptyLine(),
          body('⚠️ Mọi thay đổi ngoài scope sẽ được đánh giá và báo giá bổ sung.', { italic: true, color: BRAND.slate400, size: 20 }),

          divider(),

          // ─── SECTION 6 ───
          sectionNumber(6, 'Phong Cách Thiết Kế'),
          labelValue('Phong cách', '[VD: Minimalism, Glassmorphism]'),
          labelValue('Màu sắc chủ đạo', '[VD: Xanh navy #1E3A5F, Vàng gold #D4A843]'),
          labelValue('Font chữ', '[VD: Montserrat, Be Vietnam Pro]'),
          labelValue('Tone & Mood', '[VD: Sang trọng, chuyên nghiệp, hiện đại]'),
          labelValue('Website tham khảo', '[URL website mẫu]'),
          emptyLine(),
          placeholder('Ghi chú thêm về phong cách (nếu có)'),

          divider(),

          // ─── SECTION 7 ───
          sectionNumber(7, 'Ghi Chú'),
          placeholder('Yêu cầu đặc biệt của khách hàng'),
          placeholder('Lưu ý kỹ thuật (hosting, domain, tích hợp bên thứ 3...)'),
          placeholder('Nội dung: khách cung cấp hay Jules Studio tạo?'),
          emptyLine(), emptyLine(),

          // Signature
          divider(),
          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({ text: 'ĐẠI DIỆN JULES STUDIO', font: brandFont, bold: true, size: 22, color: BRAND.indigo }),
              new TextRun({ text: '\t\t\t\t', font: brandFont }),
              new TextRun({ text: 'KHÁCH HÀNG', font: brandFont, bold: true, size: 22, color: BRAND.indigo }),
            ],
          }),
          emptyLine(), emptyLine(), emptyLine(),
          new Paragraph({
            children: [
              new TextRun({ text: '(Ký, ghi rõ họ tên)', font: brandFont, size: 18, color: BRAND.slate400, italics: true }),
              new TextRun({ text: '\t\t\t\t', font: brandFont }),
              new TextRun({ text: '(Ký, ghi rõ họ tên)', font: brandFont, size: 18, color: BRAND.slate400, italics: true }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Template saved: ${outputPath}`);
  console.log('📄 Sections: Cover + 7 sections + Signature');
}

generate().catch(console.error);
