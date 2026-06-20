const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create scripts directory if it doesn't exist (handled by write_to_file usually, but safe to check)
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const pdfPath = path.join(publicDir, 'implementation_plan.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

const writeStream = fs.createWriteStream(pdfPath);
doc.pipe(writeStream);

// Colors (Ochre & Ember Palette)
const COLOR_GOLD = '#D4AF37';
const COLOR_CHARCOAL = '#2B2B2B';
const COLOR_LIGHT_CREAM = '#FAF6EE';
const COLOR_SECONDARY = '#555555';

// Title
doc.rect(0, 0, 595.28, 120).fill(COLOR_CHARCOAL);

doc.fillColor(COLOR_GOLD)
   .fontSize(24)
   .font('Helvetica-Bold')
   .text('OCHRE & EMBER', 50, 40, { characterSpacing: 2 });

doc.fillColor('#FFFFFF')
   .fontSize(12)
   .font('Helvetica')
   .text('IMPLEMENTATION PLAN & DESIGN SPECIFICATIONS', 50, 75, { characterSpacing: 1 });

doc.moveDown(4);

// Section Header Helper
function addSectionHeader(title) {
  doc.moveDown(1.5);
  const currentY = doc.y;
  
  // Draw small gold accent block
  doc.rect(50, currentY, 5, 20).fill(COLOR_GOLD);
  
  doc.fillColor(COLOR_CHARCOAL)
     .fontSize(16)
     .font('Helvetica-Bold')
     .text(title, 65, currentY + 2);
     
  doc.moveDown(1);
}

// Add content
addSectionHeader('1. Goal Description');
doc.fillColor(COLOR_CHARCOAL)
   .fontSize(11)
   .font('Helvetica')
   .text(
     'Build a premium, mobile-first menu website for Ochre & Ember. The site features a continuous storefront-to-menu transition scroll animation (rendered via HTML5 canvas for 60fps performance on mobile), a fully-interactive menu matching the final visual assets, search capabilities, category-specific filtering, a contact section, and automated compilation logs.',
     50, doc.y, { align: 'justify', lineGap: 4 }
   );

addSectionHeader('2. Key Design Decisions & Features');

// Bullets
const items = [
  { title: 'Storefront Scroll Sequence', desc: 'Preloads 120 frames (000.webp - 119.webp) and dynamically draws them on a canvas element matching user scroll depth.' },
  { title: 'Interactive Menu UI', desc: 'Replicates the visual layout of frame 119.webp in responsive HTML. Features a real search input and category filter pills.' },
  { title: 'Mobile-First Aesthetics', desc: 'Premium Cormorant Garamond and Inter fonts. Palette composed of light warm cream background, charcoal texts, and gold accenting.' },
  { title: 'Asset Preloading loader', desc: 'Shows a gold spinner and progress percentage of cached images before rendering the page, preventing frame stuttering.' },
  { title: 'Contact Section', desc: 'Contains physical location, phone contacts, and operating hours (9:00 AM to 10:00 PM).' }
];

items.forEach(item => {
  doc.fillColor(COLOR_GOLD).font('Helvetica-Bold').fontSize(11).text('•  ' + item.title + ': ', { continued: true });
  doc.fillColor(COLOR_CHARCOAL).font('Helvetica').fontSize(11).text(item.desc, { lineGap: 3 });
  doc.moveDown(0.5);
});

// New page
doc.addPage();

// Header for Page 2
doc.rect(0, 0, 595.28, 40).fill(COLOR_CHARCOAL);
doc.fillColor(COLOR_GOLD)
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('OCHRE & EMBER  |  PROPOSED ARCHITECTURE', 50, 14, { characterSpacing: 1 });

doc.moveDown(2);

addSectionHeader('3. Proposed Changes (Files List)');

const files = [
  { action: 'MODIFY', file: 'src/app/layout.tsx', desc: 'Imports Google Serif and Sans fonts, configures viewport and meta description.' },
  { action: 'MODIFY', file: 'src/app/globals.css', desc: 'Sets up CSS theme custom properties and utility scroll classes.' },
  { action: 'NEW', file: 'src/components/Preloader.tsx', desc: 'Asynchronously loads and caches sequence images, updates progress, and transitions out.' },
  { action: 'NEW', file: 'src/components/Hero.tsx', desc: 'Displays title text over background_hero.jpeg with a pulsing scroll indicator.' },
  { action: 'NEW', file: 'src/components/ScrollAnimation.tsx', desc: 'Sticky container mapping scroll position to canvas image rendering.' },
  { action: 'NEW', file: 'src/components/InteractiveMenu.tsx', desc: 'Provides the menu items with search and category pills matching frame 119.' },
  { action: 'NEW', file: 'src/components/ContactSection.tsx', desc: 'Renders phone number, operating hours, and location.' },
  { action: 'MODIFY', file: 'src/app/page.tsx', desc: 'Orchestrates loading state, scroll animations, menu view, and footer.' }
];

files.forEach(f => {
  doc.fillColor(f.action === 'NEW' ? '#2e7d32' : '#1565c0')
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('[' + f.action + '] ', { continued: true });
     
  doc.fillColor(COLOR_CHARCOAL)
     .font('Helvetica-Bold')
     .text(f.file + ' : ', { continued: true });
     
  doc.fillColor(COLOR_SECONDARY)
     .font('Helvetica')
     .text(f.desc, { lineGap: 2 });
     
  doc.moveDown(0.5);
});

addSectionHeader('4. Verification Strategy');
doc.fillColor(COLOR_CHARCOAL)
   .font('Helvetica')
   .fontSize(11)
   .text('• Automated checks: Ensure production-level Next.js build compilation parses clean.', { lineGap: 2 })
   .text('• Frame Preloader: Verify canvas sequence loads seamlessly without visual tearing.', { lineGap: 2 })
   .text('• Interactive Matching: Verify the rendered HTML layout overlays the background style from 119.webp correctly and filters items by text search and category select.', { lineGap: 2 })
   .text('• Logging verification: Confirm GEMINI.md tracks all steps accurately.', { lineGap: 2 });

doc.moveDown(3);
doc.rect(50, doc.y, 495.28, 1).fill(COLOR_GOLD);
doc.moveDown(1);
doc.fillColor(COLOR_SECONDARY)
   .fontSize(9)
   .font('Helvetica-Oblique')
   .text('Ochre & Ember Restaurant Group © 2026. All rights reserved.', { align: 'center' });

doc.end();

writeStream.on('finish', () => {
  console.log('PDF successfully generated at public/implementation_plan.pdf');
});
