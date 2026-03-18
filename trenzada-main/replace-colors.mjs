import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content
      .replace(/#00ff7f/gi, '#ffffff')
      .replace(/#00cc66/gi, '#ffffff')
      .replace(/0,255,127/g, '255,255,255')
      .replace(/text-green-500/g, 'text-white')
      .replace(/text-green-400/g, 'text-white')
      .replace(/bg-green-500/g, 'bg-white')
      .replace(/bg-green-500\/10/g, 'bg-white/10')
      .replace(/border-green-500\/20/g, 'border-white/20')
      .replace(/border-green-500\/30/g, 'border-white/30');
      
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log('Updated', filePath);
    }
  }
});
