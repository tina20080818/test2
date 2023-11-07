const fs = require('fs');
const { JSDOM } = require('jsdom');
const axios = require('axios');
const { PDFDocument, rgb } = require('pdf-lib');
const { createCanvas, Image } = require('canvas');
const { PNG } = require('pngjs');
const sharp=require('sharp');

const filePath = process.argv[2];

async function fetchAndConvertToPng(imageUrl) {
    const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  
    const imageBuffer = Buffer.from(data);
    
    // Use sharp to convert the image to PNG
    const pngData = await sharp(imageBuffer).toFormat('png').toBuffer();
  
    return pngData;
  }

fs.readFile(filePath, 'utf8', async (err, html) => {
  if (err) {
    console.error(`Error reading HTML file: ${err.message}`);
    return;
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const title = document.title;
  console.log(`Title: ${title}`);

  const imgElements = document.querySelectorAll('img');
  console.log(`Found ${imgElements.length} img elements:`);

  const imageUrls = [];

  imgElements.forEach((img, index) => {
    const dataSrcValue = img.getAttribute('data-src');
    if (dataSrcValue !== null) {
      console.log(`Image ${index + 1} data-src: ${dataSrcValue}`);
      imageUrls.push(dataSrcValue);
    }
  });

  const pdfDoc = await PDFDocument.create();
  const pdfImagePromises = imageUrls.map(async (imageUrl) => {
      const page = pdfDoc.addPage([600, 600]);
    const pngData = await fetchAndConvertToPng(imageUrl);
    const image = await pdfDoc.embedPng(pngData);
    const { width, height } = image.scale(0.5);
    page.drawImage(image, {
      x: 50,
      y: 600 - 50 - height,
      width: width,
      height: height,
    });
  });

  await Promise.all(pdfImagePromises);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
  console.log('PDF saved as output.pdf');
});
