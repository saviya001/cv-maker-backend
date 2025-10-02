const express = require('express');
const puppeteer = require('puppeteer');
// const { renderClassicTemplate, renderModernTemplate } = require("./templates"); // templates.js file එකත් මෙතනට copy කරන්න

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// PDF ජනනය කරන ප්‍රධාන endpoint එක
app.post('/generate-pdf', async (req, res) => {
    try {
        const { cvData, template } = req.body;

        // ---- Puppeteer කේතය (Firebase Function එකේ තිබුණු එකමයි) ----
        console.log("PDF නිර්මාණය කිරීම:", cvData.name);

        // const htmlContent = template === "classic" ? renderClassicTemplate(cvData) : renderModernTemplate(cvData);
        // const fullHtml = `<!DOCTYPE html><html>...${htmlContent}</html>`; // සම්පූර්ණ HTML එක මෙතන හදාගන්න

        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        // await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        // Dummy HTML for testing
        await page.setContent(`<h1>${cvData.name}</h1><p>${cvData.title}</p>`);

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF සෑදීමේ දෝෂයක්:", error);
        res.status(500).send("PDF සෑදීම අසාර්ථක විය.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});