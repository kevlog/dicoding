const fs = require("fs");
const path = require("path");
const baseUrl = "https://hikvn.my.id/dicoding";
const ignoreDirs = [".git", ".github", "node_modules"];
const listLinks = [];

function title(pathStr) {
  return pathStr
    .split("/")                            // pisah berdasarkan folder
    .map(part =>
      part
        .replace(/[-_]/g, " ")             // ganti strip jadi spasi
        .replace(/\b\w/g, l => l.toUpperCase()) // kapitalisasi setiap kata
    )
    .join(", ");
}

function scanDir(dir, relativePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      const pageTitle = title(relPath);

      // Cek apakah folder ini punya index.html
      const indexFile = path.join(fullPath, "index.html");
      if (fs.existsSync(indexFile)) {
        listLinks.push(`- ${pageTitle} → [${relPath}](${baseUrl}/${relPath.replace(/\\/g, "/")}/)`);
      }

      scanDir(fullPath, relPath);
    }
  }
}

scanDir(".");

const header = fs.readFileSync(path.join(__dirname,'..','parts','header.txt'),'utf-8');
const content = fs.readFileSync(path.join(__dirname,'..','parts','content.txt'),'utf-8');
const footer = fs.readFileSync(path.join(__dirname,'..','parts','footer.txt'),'utf-8');

const readmeContent = `${header}
${listLinks.sort().join("\n")}
${content}
${footer}
`;

fs.writeFileSync("readme.md", readmeContent, "utf-8");