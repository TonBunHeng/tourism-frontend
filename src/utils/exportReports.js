// src/utils/exportReports.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Export report dataset to a stylized PDF file
 * @param {Object} options 
 * @param {string} options.title - Title of the report
 * @param {string} options.subtitle - Subtitle or scope description
 * @param {Array<string>} options.headers - Column titles for PDF table
 * @param {Array<Array<any>>} options.rows - Row data matching headers
 * @param {string} options.filename - File name for PDF download
 * @returns {{ success: boolean, filename: string, error?: any }}
 */
export const exportToPDF = ({ title, subtitle, headers, rows, filename }) => {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Header Background Accent Banner
    doc.setFillColor(0, 62, 131); // #003E83 Primary Blue
    doc.rect(0, 0, 297, 24, 'F');

    // Header Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('SMART TOURISM ADMIN - REPORT', 14, 12);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 200, 12);

    // Section Subtitle / Metadata
    doc.setTextColor(30, 41, 59); // Dark slate
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), 14, 34);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(subtitle || `Report dataset containing ${rows.length} records.`, 14, 40);

    // Data Table
    autoTable(doc, {
      startY: 46,
      head: [headers],
      body: rows,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 62, 131],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [51, 65, 85]
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      margin: { top: 46, left: 14, right: 14, bottom: 20 },
      didDrawPage: (data) => {
        // Footer Page Numbering
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          280,
          200,
          { align: 'right' }
        );
        doc.text(
          'AngkorVerses Management System - Confidential Report',
          14,
          200
        );
      }
    });

    const safeFilename = filename
      ? (filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
      : `Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    
    doc.save(safeFilename);
    return { success: true, filename: safeFilename };
  } catch (error) {
    console.error('Error generating PDF report:', error);
    return { success: false, error };
  }
};

/**
 * Export dataset to Excel file (.xlsx)
 * @param {Object} options
 * @param {Array<Object>} options.data - Flat JSON object array for spreadsheet
 * @param {string} options.sheetName - Sheet tab name
 * @param {string} options.filename - File name for Excel download
 * @returns {{ success: boolean, filename: string, error?: any }}
 */
export const exportToExcel = ({ data, sheetName = 'Report Data', filename }) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Auto-fit column widths
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const colWidths = keys.map(key => {
        const maxLen = Math.max(
          key.length,
          ...data.map(row => (row[key] ? String(row[key]).length : 0))
        );
        return { wch: Math.min(Math.max(maxLen + 3, 10), 40) };
      });
      worksheet['!cols'] = colWidths;
    }

    const safeFilename = filename
      ? (filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`)
      : `Report_${new Date().toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, safeFilename);
    return { success: true, filename: safeFilename };
  } catch (error) {
    console.error('Error exporting Excel file:', error);
    return { success: false, error };
  }
};
