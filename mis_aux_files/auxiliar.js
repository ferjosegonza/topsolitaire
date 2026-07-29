#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const outputFile = 'prompt_precargado.txt';
const baseDir = process.cwd();

// ✅ EXTENSIONES ACTUALIZADAS
const EXTENSIONES_VALIDAS = [
  '.js', '.ts', '.php', '.html', '.css', '.json',
  '.md', '.txt', '.blade.php', '.gs',
  '.jsx', '.tsx', '.jsonc', '.xml', '.yml', '.yaml'
];

// carpetas a ignorar
const IGNORAR = ['node_modules', '.git', 'vendor', 'dist', 'build', 'logs', 'tmp'];

// mapear extensión → lenguaje markdown
function obtenerLenguaje(file) {
  if (file.endsWith('.blade.php')) return 'php';
  if (file.endsWith('.jsonc')) return 'jsonc';
  
  const ext = path.extname(file);

  const map = {
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.php': 'php',
    '.html': 'html',
    '.css': 'css',
    '.json': 'json',
    '.md': 'markdown',
    '.txt': 'text',
    '.xml': 'xml',
    '.yml': 'yaml',
    '.yaml': 'yaml'
  };

  return map[ext] || '';
}

function esValido(file) {
  return EXTENSIONES_VALIDAS.some(ext => file.endsWith(ext));
}

function recorrerDir(dir) {
  let resultados = [];

  const archivos = fs.readdirSync(dir);

  archivos.forEach(file => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(baseDir, fullPath);

    const partesRuta = relativePath.split(path.sep);

    if (partesRuta.some(parte => IGNORAR.includes(parte))) return;

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      resultados = resultados.concat(recorrerDir(fullPath));
    } else if (esValido(file)) {
      resultados.push(relativePath || file);
    }
  });

  return resultados;
}

//////////////////////////////////////////////////////////
// 🔥 LIMPIEZA DE CÓDIGO
//////////////////////////////////////////////////////////

function limpiarComentarios(codigo, lenguaje, filePath = '') {
  try {
    const esBlade = filePath.endsWith('.blade.php');

    if (esBlade) {
      return codigo
        .replace(/{{--[\s\S]*?--}}/g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
    }

    switch (lenguaje) {
      case 'javascript':
      case 'typescript':
      case 'jsx':
      case 'tsx':
      case 'php':
      case 'css':
        return codigo
          .replace(/\/\/.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '');

      case 'html':
        return codigo.replace(/<!--[\s\S]*?-->/g, '');

      case 'json':
      case 'jsonc':
        // No se pueden eliminar comentarios fácilmente en JSON
        return codigo;

      default:
        return codigo;
    }
  } catch {
    return codigo;
  }
}

function limpiarEspacios(codigo) {
  return codigo
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

//////////////////////////////////////////////////////////
// 🚀 EJECUCIÓN
//////////////////////////////////////////////////////////

const archivos = recorrerDir(baseDir);

let contenido = '';

contenido += `# 📦 Contexto del proyecto\n\n`;

contenido += `## 📁 Archivos incluidos\n\n`;
archivos.forEach(a => {
  contenido += `- ${a}\n`;
});

contenido += `\n---\n`;
contenido += `## 🎯 Objetivo\n`;
contenido += `Quiero que:\n`
contenido += `1. Tengas en cuenta todos los cambios necesarios en todos los archivos del proyecto y no me des ejemplos sino todo el código completo que necesito modificar, no es necesario que me devuelvas todos los códigos completos pero sí el código completo de lo que es nuevo y me especifiqués bien a qué archivo copiarselo, qué parte reemplaza, qué código borrar, no dejes cabos sueltos. Tu explicación debe ser detallada y permitir la implementación completa de todo lo que te pido.\n`;
contenido += `2. \n`;

contenido += `---\n`;
contenido += `## 🧠 Código fuente de los archivos mencionados\n\n`;

archivos.forEach(a => {
  const ruta = path.join(baseDir, a);
  const lenguaje = obtenerLenguaje(a);

  contenido += `### 📄 ${a}\n\n`;

  try {
    let code = fs.readFileSync(ruta, 'utf8');

    code = limpiarComentarios(code, lenguaje, a);
    code = limpiarEspacios(code);

    contenido += `\`\`\`${lenguaje}\n${code}\n\`\`\`\n\n`;
  } catch (err) {
    contenido += `[ERROR AL LEER ARCHIVO]\n\n`;
  }
});

fs.writeFileSync(outputFile, contenido, 'utf8');

console.log(`✅ Prompt generado: ${outputFile}`);