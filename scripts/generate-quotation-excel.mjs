/**
 * Generate Excel Quotation Template for Jules Studio (v3)
 * 10 sheets: Thông tin, Hệ số, 7 loại web, Bảng giá tham khảo
 * Auto-calc pricing via VLOOKUP formulas
 *
 * Run: node scripts/generate-quotation-excel.mjs
 */

import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  C, FONT, PRICING, DESIGN_STYLES, FEATURES, WEB_TYPES,
  PRICE_REF, getFeaturesForType,
} from './quotation-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'jules-studio-bao-gia.xlsx');

// Sheet names for formula references
const COEFF_SHEET = 'Hệ Số';
const INFO_SHEET = '📋 Thông Tin';
const GOI_CELL = '$D$10'; // Gói dropdown cell on Info sheet
const LOAI_CELL = '$B$10'; // Loại website cell on Info sheet

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function applyBorder(cell, style = 'hair') {
  cell.border = {
    top: { style, color: { argb: C.lightBorder } },
    bottom: { style, color: { argb: C.lightBorder } },
    left: { style: 'thin', color: { argb: C.border } },
    right: { style: 'thin', color: { argb: C.border } },
  };
}

function sectionHeader(ws, row, text, cols = 6) {
  ws.mergeCells(row, 1, row, cols);
  const cell = ws.getCell(row, 1);
  cell.value = text;
  cell.font = { name: FONT, size: 13, bold: true, color: { argb: C.headerText } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.dark } };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(row).height = 32;
  return row + 1;
}

function subHeader(ws, row, headers) {
  const r = ws.getRow(row);
  r.height = 26;
  headers.forEach((h, i) => {
    const cell = r.getCell(i + 1);
    cell.value = h;
    cell.font = { name: FONT, size: 10, bold: true, color: { argb: C.headerText } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.brand } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    applyBorder(cell, 'thin');
  });
  return row + 1;
}

function categoryRow(ws, row, text, cols = 6) {
  ws.mergeCells(row, 1, row, cols);
  const cell = ws.getCell(row, 1);
  cell.value = text;
  cell.font = { name: FONT, size: 10.5, bold: true, color: { argb: C.blueText } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.brandLight } };
  cell.alignment = { vertical: 'middle', indent: 1 };
  applyBorder(cell, 'thin');
  ws.getRow(row).height = 26;
  return row + 1;
}

function yesNoDropdown(cell) {
  cell.dataValidation = {
    type: 'list',
    allowBlank: true,
    formulae: ['"✓ Có,✗ Không"'],
  };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
}

// ═══════════════════════════════════════════════════════════
// SHEET 1: THÔNG TIN DỰ ÁN
// ═══════════════════════════════════════════════════════════
function buildInfoSheet(workbook) {
  const ws = workbook.addWorksheet('📋 Thông Tin', {
    properties: { tabColor: { argb: C.brand } },
    pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1 },
  });

  ws.columns = [
    { width: 5 },   // A
    { width: 38 },  // B
    { width: 14 },  // C
    { width: 28 },  // D
  ];

  let row = 1;

  // Header
  ws.mergeCells(`A${row}:D${row}`);
  const titleCell = ws.getCell(`A${row}`);
  titleCell.value = '✦ JULES STUDIO';
  titleCell.font = { name: FONT, size: 22, bold: true, color: { argb: C.brand } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(row).height = 40;
  row++;

  ws.mergeCells(`A${row}:D${row}`);
  ws.getCell(`A${row}`).value = 'Thiết kế Website Chuyên Nghiệp — Hiện Đại — Tốc Độ';
  ws.getCell(`A${row}`).font = { name: FONT, size: 11, color: { argb: C.sectionText } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(row).height = 22;
  row++;

  ws.mergeCells(`A${row}:D${row}`);
  ws.getCell(`A${row}`).value = '📧 contact@julesstudio.dev  •  📱 0xxx.xxx.xxx  •  🌐 julesstudio.dev';
  ws.getCell(`A${row}`).font = { name: FONT, size: 9, color: { argb: C.sectionText } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'center', vertical: 'middle' };
  row += 2;

  // Client info
  row = sectionHeader(ws, row, '📋 THÔNG TIN KHÁCH HÀNG', 4);
  const infoFields = [
    ['Ngày báo giá:', '', 'Hiệu lực:', '30 ngày'],
    ['Khách hàng:', '', 'Điện thoại:', ''],
    ['Email:', '', 'Zalo:', ''],
    ['Tên website:', '', 'Tên miền:', ''],
  ];

  for (const f of infoFields) {
    ws.getRow(row).height = 26;
    ws.getCell(`A${row}`).value = f[0];
    ws.getCell(`A${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.sectionText } };
    ws.getCell(`A${row}`).alignment = { horizontal: 'right', vertical: 'middle' };
    ws.getCell(`B${row}`).value = f[1];
    ws.getCell(`B${row}`).font = { name: FONT, size: 10 };
    ws.getCell(`B${row}`).alignment = { vertical: 'middle' };
    ws.getCell(`B${row}`).border = { bottom: { style: 'dotted', color: { argb: C.border } } };
    ws.getCell(`C${row}`).value = f[2];
    ws.getCell(`C${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.sectionText } };
    ws.getCell(`C${row}`).alignment = { horizontal: 'right', vertical: 'middle' };
    ws.getCell(`D${row}`).value = f[3];
    ws.getCell(`D${row}`).font = { name: FONT, size: 10 };
    ws.getCell(`D${row}`).alignment = { vertical: 'middle' };
    ws.getCell(`D${row}`).border = { bottom: { style: 'dotted', color: { argb: C.border } } };
    row++;
  }

  // Loại web & Gói
  ws.getRow(row).height = 26;
  ws.getCell(`A${row}`).value = 'Loại website:';
  ws.getCell(`A${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.sectionText } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'right', vertical: 'middle' };
  ws.getCell(`B${row}`).dataValidation = {
    type: 'list', allowBlank: true,
    formulae: [`"${WEB_TYPES.map(t => t.name).join(',')}"`],
  };
  ws.getCell(`B${row}`).border = { bottom: { style: 'dotted', color: { argb: C.border } } };
  ws.getCell(`C${row}`).value = 'Gói:';
  ws.getCell(`C${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.sectionText } };
  ws.getCell(`C${row}`).alignment = { horizontal: 'right', vertical: 'middle' };
  ws.getCell(`D${row}`).dataValidation = {
    type: 'list', allowBlank: true,
    formulae: ['"Cơ bản (🟢),Phổ thông (🟢+🟡),Nâng cao (🟢+🟡+⚪)"'],
  };
  ws.getCell(`D${row}`).border = { bottom: { style: 'dotted', color: { argb: C.border } } };
  row += 2;

  // Design styles
  row = sectionHeader(ws, row, '🎨 PHONG CÁCH THIẾT KẾ (chọn 1-2)', 4);
  row = subHeader(ws, row, ['STT', 'Phong cách', 'Chọn', 'Mô tả']);

  DESIGN_STYLES.forEach((style, i) => {
    const r = ws.getRow(row);
    r.height = 22;
    const bg = i % 2 === 0 ? C.white : C.zebra;
    r.getCell(1).value = i + 1;
    r.getCell(1).font = { name: FONT, size: 9, color: { argb: C.sectionText } };
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).value = style.name;
    r.getCell(2).font = { name: FONT, size: 10, color: { argb: C.darkText } };
    r.getCell(2).alignment = { vertical: 'middle', indent: 1 };
    yesNoDropdown(r.getCell(3));
    r.getCell(3).font = { name: FONT, size: 11, bold: true };
    r.getCell(4).value = style.desc;
    r.getCell(4).font = { name: FONT, size: 9, italic: true, color: { argb: C.sectionText } };
    r.getCell(4).alignment = { vertical: 'middle' };
    for (let c = 1; c <= 4; c++) {
      r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      applyBorder(r.getCell(c));
    }
    row++;
  });

  // Design requirement fields (structured)
  row++;
  row = sectionHeader(ws, row, '📝 YÊU CẦU THIẾT KẾ CHI TIẾT', 4);

  const designFields = [
    { label: 'Màu sắc yêu thích:', placeholder: 'VD: xanh navy, vàng gold, trắng...' },
    { label: 'Font chữ yêu thích:', placeholder: 'VD: Montserrat, Playfair Display, Be Vietnam Pro...' },
    { label: 'Website tham khảo:', placeholder: 'Ghi URL website mẫu bạn thích' },
    { label: 'Tone & Mood:', placeholder: 'VD: sang trọng, trẻ trung, chuyên nghiệp, vui tươi...' },
    { label: 'Logo / Brand guidelines:', placeholder: 'Có sẵn logo? Có bộ nhận diện thương hiệu?' },
    { label: 'Yêu cầu khác:', placeholder: '' },
  ];

  for (const field of designFields) {
    ws.getRow(row).height = 26;
    ws.getCell(`A${row}`).value = field.label;
    ws.getCell(`A${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.sectionText } };
    ws.getCell(`A${row}`).alignment = { horizontal: 'right', vertical: 'middle' };
    ws.mergeCells(`B${row}:D${row}`);
    ws.getCell(`B${row}`).value = field.placeholder;
    ws.getCell(`B${row}`).font = { name: FONT, size: 9.5, italic: true, color: { argb: C.border } };
    ws.getCell(`B${row}`).alignment = { vertical: 'middle' };
    ws.getCell(`B${row}`).border = { bottom: { style: 'dotted', color: { argb: C.border } } };
    row++;
  }
  row++;

  // Terms
  row = sectionHeader(ws, row, '📝 GHI CHÚ & ĐIỀU KHOẢN', 4);
  const notes = [
    '1. Báo giá có hiệu lực 30 ngày kể từ ngày lập.',
    '2. Đặt cọc 40% trước khi bắt đầu. Thanh toán 60% còn lại khi nghiệm thu.',
    '3. Thời gian tính từ ngày nhận đủ nội dung & tài liệu từ khách hàng.',
    '4. Nội dung (text, hình ảnh) do khách hàng cung cấp. Hỗ trợ thiết kế banner miễn phí.',
    '5. Sửa đổi lớn sau khi duyệt thiết kế sẽ phát sinh thêm phí.',
    '6. Bảo trì miễn phí 3 tháng đầu (fix bug, cập nhật nội dung nhỏ).',
  ];
  for (const note of notes) {
    ws.mergeCells(`A${row}:D${row}`);
    ws.getCell(`A${row}`).value = note;
    ws.getCell(`A${row}`).font = { name: FONT, size: 9.5, color: { argb: C.sectionText } };
    ws.getCell(`A${row}`).alignment = { vertical: 'middle', wrapText: true, indent: 1 };
    ws.getRow(row).height = 20;
    row++;
  }

  // Signature
  row += 2;
  ws.mergeCells(`A${row}:B${row}`);
  ws.getCell(`A${row}`).value = 'ĐẠI DIỆN JULES STUDIO';
  ws.getCell(`A${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.brand } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'center' };
  ws.mergeCells(`C${row}:D${row}`);
  ws.getCell(`C${row}`).value = 'KHÁCH HÀNG';
  ws.getCell(`C${row}`).font = { name: FONT, size: 10, bold: true, color: { argb: C.brand } };
  ws.getCell(`C${row}`).alignment = { horizontal: 'center' };
  row += 4;
  ws.mergeCells(`A${row}:B${row}`);
  ws.getCell(`A${row}`).value = '(Ký, ghi rõ họ tên)';
  ws.getCell(`A${row}`).font = { name: FONT, size: 9, italic: true, color: { argb: C.sectionText } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'center' };
  ws.mergeCells(`C${row}:D${row}`);
  ws.getCell(`C${row}`).value = '(Ký, ghi rõ họ tên)';
  ws.getCell(`C${row}`).font = { name: FONT, size: 9, italic: true, color: { argb: C.sectionText } };
  ws.getCell(`C${row}`).alignment = { horizontal: 'center' };
}

// ═══════════════════════════════════════════════════════════
// SHEET 2: HỆ SỐ TÍNH NĂNG
// ═══════════════════════════════════════════════════════════
function buildCoeffSheet(workbook) {
  const ws = workbook.addWorksheet(COEFF_SHEET, {
    properties: { tabColor: { argb: C.orangeText } },
  });

  ws.columns = [
    { width: 5 },   // A: STT
    { width: 42 },  // B: Tính năng
    { width: 10 },  // C: Hệ số
    { width: 30 },  // D: Ghi chú
  ];

  let row = 1;
  ws.mergeCells('A1:D1');
  ws.getCell('A1').value = '🔢 HỆ SỐ TÍNH NĂNG';
  ws.getCell('A1').font = { name: FONT, size: 16, bold: true, color: { argb: C.brand } };
  ws.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 36;
  row = 3;

  row = subHeader(ws, row, ['STT', 'Tính năng', 'Hệ số', 'Ghi chú']);

  let currentCat = '';
  let idx = 1;

  for (const feat of FEATURES) {
    // Category header
    if (feat.cat !== currentCat) {
      row = categoryRow(ws, row, feat.cat);
      currentCat = feat.cat;
    }

    const r = ws.getRow(row);
    r.height = 24;
    const bg = idx % 2 === 0 ? C.zebra : C.white;

    r.getCell(1).value = idx;
    r.getCell(1).font = { name: FONT, size: 9, color: { argb: C.sectionText } };
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

    r.getCell(2).value = feat.name;
    r.getCell(2).font = { name: FONT, size: 10, color: { argb: C.darkText } };
    r.getCell(2).alignment = { vertical: 'middle', indent: 1 };

    r.getCell(3).value = feat.coeff;
    r.getCell(3).font = { name: FONT, size: 11, bold: true, color: { argb: C.orangeText } };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };

    r.getCell(4).value = feat.note;
    r.getCell(4).font = { name: FONT, size: 9, italic: true, color: { argb: C.sectionText } };
    r.getCell(4).alignment = { vertical: 'middle' };

    for (let c = 1; c <= 4; c++) {
      r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      applyBorder(r.getCell(c));
    }

    idx++;
    row++;
  }

  // Summary
  row += 1;
  ws.mergeCells(`A${row}:D${row}`);
  ws.getCell(`A${row}`).value = `💡 Hệ số phản ánh độ phức tạp của tính năng. Tổng hệ số × ${PRICING.coefficient} ÷ 8 = Số ngày. Số ngày × ${PRICING.dailyRate.toLocaleString()} VNĐ = Giá.`;
  ws.getCell(`A${row}`).font = { name: FONT, size: 9, italic: true, color: { argb: C.yellowText } };
  ws.getCell(`A${row}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.yellowBg } };
  ws.getCell(`A${row}`).alignment = { vertical: 'middle', indent: 1, wrapText: true };
  ws.getRow(row).height = 28;
}

// ═══════════════════════════════════════════════════════════
// SHEETS 3-9: PER WEB TYPE
// ═══════════════════════════════════════════════════════════
function buildTypeSheet(workbook, webType) {
  const ws = workbook.addWorksheet(webType.name, {
    properties: { tabColor: { argb: webType.color } },
    pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1 },
  });

  ws.columns = [
    { width: 5 },   // A: STT
    { width: 38 },  // B: Tính năng
    { width: 14 },  // C: Mức độ
    { width: 12 },  // D: Có / Không
    { width: 10 },  // E: Hệ số (formula)
    { width: 28 },  // F: Ghi chú
  ];

  let row = 1;

  // Title
  ws.mergeCells('A1:F1');
  ws.getCell('A1').value = `📋 ${webType.name.toUpperCase()} — BẢNG TÍNH NĂNG`;
  ws.getCell('A1').font = { name: FONT, size: 16, bold: true, color: { argb: C.brand } };
  ws.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 36;
  row = 3;

  row = subHeader(ws, row, ['STT', 'Tính năng', 'Mức độ', 'Có / Không', 'Hệ số', 'Ghi chú']);

  const features = getFeaturesForType(webType.idx);
  let currentCat = '';
  let idx = 1;
  const coeffCells = []; // Track cells with coefficient formulas for SUM

  for (const feat of features) {
    // Category header
    if (feat.isNewCat) {
      row = categoryRow(ws, row, feat.cat);
      currentCat = feat.cat;
    }

    const r = ws.getRow(row);
    r.height = 24;
    const bg = idx % 2 === 0 ? C.zebra : C.white;

    // A: STT
    r.getCell(1).value = idx;
    r.getCell(1).font = { name: FONT, size: 9, color: { argb: C.sectionText } };
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

    // B: Feature name
    r.getCell(2).value = feat.name;
    r.getCell(2).font = { name: FONT, size: 10, color: { argb: C.darkText } };
    r.getCell(2).alignment = { vertical: 'middle', indent: 1 };

    // C: Priority (pre-filled)
    r.getCell(3).value = feat.priority;
    r.getCell(3).font = { name: FONT, size: 10, color: { argb: 
      feat.priorityKey === 'g' ? C.greenText :
      feat.priorityKey === 'y' ? C.yellowText : C.sectionText
    }};
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    // Color background based on priority
    const priorityBg = feat.priorityKey === 'g' ? C.greenBg : feat.priorityKey === 'y' ? C.yellowBg : bg;

    // D: Có/Không — auto-fill based on Gói + Loại web from Sheet 1
    // Only auto-fills if Loại website on Sheet 1 matches THIS sheet's type
    const goiRef = `'${INFO_SHEET}'!${GOI_CELL}`;
    const loaiRef = `'${INFO_SHEET}'!${LOAI_CELL}`;
    const autoFormula = `IF(AND(${loaiRef}="${webType.name}",OR(C${row}="🟢 Bắt buộc",AND(C${row}="🟡 Nên có",OR(${goiRef}="Phổ thông (🟢+🟡)",${goiRef}="Nâng cao (🟢+🟡+⚪)")),AND(C${row}="⚪ Tùy chọn",${goiRef}="Nâng cao (🟢+🟡+⚪)"))),"✓ Có","✗ Không")`;
    r.getCell(4).value = { formula: autoFormula };
    r.getCell(4).font = { name: FONT, size: 11, bold: true };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };

    // E: Coefficient (VLOOKUP from Hệ Số sheet)
    const formula = `IF(D${row}="✓ Có",VLOOKUP(B${row},'${COEFF_SHEET}'!B:C,2,FALSE),0)`;
    r.getCell(5).value = { formula };
    r.getCell(5).font = { name: FONT, size: 10, bold: true, color: { argb: C.orangeText } };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    coeffCells.push(`E${row}`);

    // F: Notes
    r.getCell(6).value = feat.note;
    r.getCell(6).font = { name: FONT, size: 9, italic: true, color: { argb: C.sectionText } };
    r.getCell(6).alignment = { vertical: 'middle' };

    for (let c = 1; c <= 6; c++) {
      const cellBg = c === 3 ? priorityBg : bg;
      r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cellBg } };
      applyBorder(r.getCell(c));
    }

    idx++;
    row++;
  }

  // ─── SUMMARY SECTION ───
  row += 2;
  const summaryStart = row;
  row = sectionHeader(ws, row, '💰 TỔNG KẾT TỰ ĐỘNG');

  // Build SUM formula
  const sumFormula = coeffCells.length > 0
    ? `SUM(${coeffCells[0]}:${coeffCells[coeffCells.length - 1]})`
    : '0';

  const summaryItems = [
    { icon: '📊', label: 'Tổng hệ số (features đã chọn)', formula: sumFormula, unit: '' },
    { icon: '×', label: `Hệ số × ${PRICING.coefficient}`, formula: `E${row}*${PRICING.coefficient}`, unit: '' },
    { icon: '📅', label: 'Số ngày (làm tròn lên)', formula: `CEILING(E${row + 1}/8,1)`, unit: 'ngày' },
    { icon: '💰', label: 'GIÁ DỰ KIẾN', formula: `E${row + 2}*${PRICING.dailyRate}`, unit: 'VNĐ', total: true },
  ];

  for (const item of summaryItems) {
    const r = ws.getRow(row);
    r.height = 30;
    const bg = item.total ? C.orangeBg : C.white;

    ws.mergeCells(`A${row}:B${row}`);

    r.getCell(1).value = `${item.icon}  ${item.label}`;
    r.getCell(1).font = {
      name: FONT, size: item.total ? 12 : 10,
      bold: !!item.total,
      color: { argb: item.total ? C.orangeText : C.darkText },
    };
    r.getCell(1).alignment = { vertical: 'middle', indent: 1 };

    // Skip C, D
    ws.mergeCells(`E${row}:F${row}`);
    r.getCell(5).value = { formula: item.formula };
    r.getCell(5).font = {
      name: FONT, size: item.total ? 14 : 11,
      bold: true,
      color: { argb: item.total ? C.orangeText : C.darkText },
    };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    if (item.total) {
      r.getCell(5).numFmt = '#,##0';
    }

    for (let c = 1; c <= 6; c++) {
      r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      applyBorder(r.getCell(c), item.total ? 'medium' : 'thin');
    }
    row++;
  }

  // Payment breakdown
  row++;
  const dep = PRICING.deposit;
  const paymentItems = [
    { icon: '💳', label: `Đặt cọc (${dep * 100}%)`, formula: `E${summaryStart + 4}*${dep}` },
    { icon: '💳', label: `Thanh toán nghiệm thu (${(1 - dep) * 100}%)`, formula: `E${summaryStart + 4}*${1 - dep}` },
  ];

  for (const item of paymentItems) {
    const r = ws.getRow(row);
    r.height = 26;
    ws.mergeCells(`A${row}:B${row}`);
    r.getCell(1).value = `${item.icon}  ${item.label}`;
    r.getCell(1).font = { name: FONT, size: 10, color: { argb: C.darkText } };
    r.getCell(1).alignment = { vertical: 'middle', indent: 1 };
    ws.mergeCells(`E${row}:F${row}`);
    r.getCell(5).value = { formula: item.formula };
    r.getCell(5).font = { name: FONT, size: 11, bold: true, color: { argb: C.darkText } };
    r.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).numFmt = '#,##0';
    for (let c = 1; c <= 6; c++) applyBorder(r.getCell(c));
    row++;
  }

  // Note
  row++;
  ws.mergeCells(`A${row}:F${row}`);
  ws.getCell(`A${row}`).value = '💡 Chọn Loại website + Gói ở sheet "📋 Thông Tin" → Có/Không tự động theo gói. Có thể ghi đè thủ công.';
  ws.getCell(`A${row}`).font = { name: FONT, size: 9, italic: true, color: { argb: C.yellowText } };
  ws.getCell(`A${row}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.yellowBg } };
  ws.getCell(`A${row}`).alignment = { vertical: 'middle', indent: 1 };
  ws.getRow(row).height = 24;
}

// ═══════════════════════════════════════════════════════════
// SHEET 10: BẢNG GIÁ THAM KHẢO
// ═══════════════════════════════════════════════════════════
function buildRefSheet(workbook) {
  const ws = workbook.addWorksheet('📊 Bảng Giá', {
    properties: { tabColor: { argb: C.greenText } },
  });

  ws.columns = [
    { width: 5 },
    { width: 35 },
    { width: 24 },
    { width: 16 },
    { width: 30 },
  ];

  let row = 1;
  ws.mergeCells('A1:E1');
  ws.getCell('A1').value = '📊 BẢNG GIÁ THAM KHẢO — JULES STUDIO';
  ws.getCell('A1').font = { name: FONT, size: 16, bold: true, color: { argb: C.brand } };
  ws.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 38;
  row = 3;

  const headers = ['STT', 'Loại Website', 'Giá từ (VNĐ)', 'Thời gian', 'Ghi chú'];
  const r = ws.getRow(row);
  r.height = 28;
  headers.forEach((h, i) => {
    const cell = r.getCell(i + 1);
    cell.value = h;
    cell.font = { name: FONT, size: 10, bold: true, color: { argb: C.headerText } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.dark } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    applyBorder(cell, 'thin');
  });
  row++;

  PRICE_REF.forEach((item, i) => {
    const r = ws.getRow(row);
    r.height = 30;
    const bg = i % 2 === 0 ? C.white : C.zebra;
    r.getCell(1).value = i + 1;
    r.getCell(1).font = { name: FONT, size: 9, color: { argb: C.sectionText } };
    r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(2).value = item.type;
    r.getCell(2).font = { name: FONT, size: 10, bold: true, color: { argb: C.darkText } };
    r.getCell(2).alignment = { vertical: 'middle', indent: 1, wrapText: true };
    r.getCell(3).value = item.price;
    r.getCell(3).font = { name: FONT, size: 10, color: { argb: C.orangeText } };
    r.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(4).value = item.time;
    r.getCell(4).font = { name: FONT, size: 10, color: { argb: C.darkText } };
    r.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    r.getCell(5).value = item.note;
    r.getCell(5).font = { name: FONT, size: 9, italic: true, color: { argb: C.sectionText } };
    r.getCell(5).alignment = { vertical: 'middle' };
    for (let c = 1; c <= 5; c++) {
      r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      applyBorder(r.getCell(c));
    }
    row++;
  });

  row += 2;
  ws.mergeCells(`A${row}:E${row}`);
  ws.getCell(`A${row}`).value = '⚠️ Giá chỉ mang tính tham khảo. Giá chính thức tùy thuộc yêu cầu cụ thể và tính năng được chọn.';
  ws.getCell(`A${row}`).font = { name: FONT, size: 10, italic: true, color: { argb: C.yellowText } };
  ws.getCell(`A${row}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.yellowBg } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(row).height = 28;
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function generate() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Jules Studio';
  workbook.created = new Date();

  // Sheet 1: Thông tin
  buildInfoSheet(workbook);

  // Sheet 2: Hệ số
  buildCoeffSheet(workbook);

  // Sheets 3-9: Per web type
  for (const webType of WEB_TYPES) {
    buildTypeSheet(workbook, webType);
  }

  // Sheet 10: Bảng giá tham khảo
  buildRefSheet(workbook);

  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ File saved: ${outputPath}`);
  console.log(`📊 Sheets: ${workbook.worksheets.length}`);
  console.log(`📋 Total features: ${FEATURES.length}`);
  console.log(`🌐 Web types: ${WEB_TYPES.map(t => t.name).join(', ')}`);
}

generate().catch(console.error);
