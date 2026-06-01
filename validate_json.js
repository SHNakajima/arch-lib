const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/data/architectures');
console.log('Validating JSON files in:', baseDir);

const companies = ['netflix', 'amazon', 'twitter'];
const files = ['meta.json', 'nodes.json', 'edges.json', 'scenarios.json'];

let hasError = false;

companies.forEach(company => {
  files.forEach(file => {
    const filePath = path.join(baseDir, company, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      hasError = true;
      return;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`✅ Valid JSON: ${company}/${file}`);
    } catch (e) {
      console.error(`❌ Syntax Error in ${company}/${file}: ${e.message}`);
      hasError = true;
    }
  });
});

if (hasError) {
  process.exit(1);
} else {
  console.log('🎉 All JSON files are syntactically valid!');
}
