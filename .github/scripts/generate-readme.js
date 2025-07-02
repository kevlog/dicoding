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
        listLinks.push(`${pageTitle} → [${relPath}](${baseUrl}/${relPath.replace(/\\/g, "/")}/)`);
      }

      scanDir(fullPath, relPath);
    }
  }
}

scanDir(".");

const header = `# 📚 Dokumentasi Perjalanan Belajar di Dicoding

Selamat datang di repositori ini!

Repositori ini berisi dokumentasi hasil belajar saya di platform Dicoding Indonesia.
Di dalamnya terdapat berbagai materi, proyek, dan catatan yang saya kumpulkan selama mengikuti kelas-kelas di Dicoding.

---

## 🔗 Tautan Akses Cepat

Berikut adalah beberapa link penting yang dapat diakses langsung:
`;

const content = `
*(Daftar ini akan terus bertambah seiring dengan bertambahnya kelas yang saya ikuti.)*

---

## 🧰 Teknologi & Tools yang Digunakan

- HTML, CSS, JavaScript
- Git & GitHub
- Markdown
- Visual Studio Code
- GitHub Pages

---

## 📝 Tujuan Repositori Ini

- Menyimpan semua hasil belajar saya secara terstruktur.
- Menjadi dokumentasi pribadi yang terbuka untuk publik.
- Sebagai portofolio kecil dari progres pembelajaran saya.

---

## 📌 Catatan

📌 Repositori ini disusun dengan struktur direktori berdasarkan nama kelas Dicoding.  
Setiap folder berisi submission, latihan, serta dokumentasi terkait materi tersebut.

---

## 📫 Kontak

Jika ingin berdiskusi, silakan kunjungi:  
🌐 [hikvn.my.id](https://hikvn.my.id)

---
`;

const footer = `

> _“Konsistensi dalam belajar lebih penting dari kecepatan.”_ 🚀
`;

const readmeContent = `${header}
${listLinks.sort().join("\n")}
${content}
${footer}
`;

fs.writeFileSync("readme.md", readmeContent, "utf-8");