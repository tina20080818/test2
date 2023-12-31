# test2
```const fs = require('fs');
const axios = require('axios');

if (process.argv.length < 3) {
  console.error('Usage: node process-html.js <input-html-file>');
  process.exit(1);
}

const inputFile = process.argv[2];

// Read the HTML content from the input file
const htmlContent = fs.readFileSync(inputFile, 'utf8');

// Regular expression to match and extract the href attributes
const regex = /<a class="name" href="(\/school\/intro\/jr\/\d+)">/gm;

let modifiedHtml = htmlContent;
let match;
var matches=[]
// Loop through the matches and replace "intro" with "album" and add the domain name
while ((match = regex.exec(htmlContent)) !== null) {
  const url = match[1];
  const modifiedUrl = `https://uniform.wingzero.tw${url.replace('/intro/', '/album/')}`;
  matches.push(modifiedUrl)
}
if (matches) {
  const downloadPromises = matches.map((match) => {
      const url = match
    return axios.get(url).then((response) => {
      const fileName = url.split('/').pop();
      fs.writeFileSync(fileName, response.data);
      console.log(`Downloaded: ${fileName}`);
    });
  });

  Promise.all(downloadPromises)
    .then(() => console.log('All downloads completed.'))
    .catch((error) => console.error('Error downloading:', error.message));
}
```
<!DOCTYPE html>
<html>
<head>
    <title>HTML to PDF Converter with Image Embedding</title>
</head>
<body>
    <h1>HTML to PDF Converter with Image Embedding</h1>
    <p>This is a Node.js script that reads an HTML file, extracts images specified in the 'data-src' attribute of 'img' elements, and converts them to a PDF document.</p>
    
    <h2>Prerequisites</h2>
    <ul>
        <li>Node.js installed on your system.</li>
        <li>Required Node.js modules: axios, pdf-lib, jsdom, canvas, pngjs, sharp.</li>
    </ul>

    <h2>Usage</h2>
    <p>Execute the script using the following command:</p>
    <pre><code>node script.js &lt;path_to_your_html_file&gt;</code></pre>
    <p>Make sure to replace &lt;path_to_your_html_file&gt; with the path to your HTML file.</p>
    
    <h2>Code Explanation</h2>
    <p>The code performs the following tasks:</p>
    <ol>
        <li>Reads the HTML file specified as a command-line argument.</li>
        <li>Extracts 'img' elements with a 'data-src' attribute.</li>
        <li>Downloads and converts the images to PNG format using the sharp library.</li>
        <li>Embeds the PNG images into a PDF document using the pdf-lib library.</li>
        <li>Saves the PDF document as 'output.pdf'.</li>
    </ol>
    
    <h2>License</h2>
    <p>This code is provided under an open-source license. Feel free to modify and use it for your own projects.</p>
    
    <h2>Author</h2>
    <p>Author: Your Name</p>
    <p>Email: your.email@example.com</p>

    <h2>Contributing</h2>
    <p>If you'd like to contribute to this project, please feel free to create a pull request or open an issue on GitHub.</p>

    <h2>Issues</h2>
    <p>If you encounter any issues or have questions, please open an issue on GitHub.</p>

    <h2>GitHub Repository</h2>
    <p>You can find the source code on <a href="https://github.com/yourusername/your-repository">GitHub</a>.</p>
</body>
</html>
