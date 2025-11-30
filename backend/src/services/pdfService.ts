import PDFDocument from 'pdfkit';
import { IApplication } from '../models/Application';

export const generateApplicationsPDF = async (
  applications: IApplication[]
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc.fontSize(20).text('Job Applications Report', { align: 'center' });
      doc.moveDown();

      // Applications
      applications.forEach((app, index) => {
        if (index > 0) {
          doc.addPage();
        }

        doc.fontSize(16).text(`${app.company} - ${app.position}`, { underline: true });
        doc.moveDown(0.5);

        doc.fontSize(12);
        doc.text(`Status: ${app.status.toUpperCase()}`);
        doc.text(`Applied Date: ${new Date(app.appliedDate).toLocaleDateString()}`);
        
        if (app.location) {
          doc.text(`Location: ${app.location}`);
        }
        if (app.salary) {
          doc.text(`Salary: ${app.salary}`);
        }
        if (app.contactName) {
          doc.text(`Contact: ${app.contactName}`);
        }
        if (app.contactEmail) {
          doc.text(`Email: ${app.contactEmail}`);
        }
        if (app.jobUrl) {
          doc.text(`Job URL: ${app.jobUrl}`);
        }
        if (app.notes) {
          doc.moveDown(0.5);
          doc.text('Notes:', { underline: true });
          doc.text(app.notes);
        }

        doc.moveDown();
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

