const express = require('express');
const puppeteer = require('puppeteer');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post('/generate-pdf', async (req, res) => {
    try {
        const { cvData, template } = req.body;

       
        console.log("PDF success:", cvData.name);

   

        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();




        await page.setContent(`<h1>${cvData.name}</h1><p>${cvData.title}</p>`);

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF :", error);
        res.status(500).send("PDF .");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
