const fs = require('fs');
const https = require('https');
const path = require('path');

const templates = [
  { name: 'home', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhkZDI1OTVmY2RkZTQ0YzBiZTc1OWJiYzk4Nzg2NzM2EgsSBxDnovHx9QIYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTU3NDk2NDcxMTk0NzUxNzYwNw&filename=&opi=89354086' },
  { name: 'search', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNjNWMxMTg4YWRiZTQ4ZDI5NTFmNGQ1NDBmZDNjMjZhEgsSBxDnovHx9QIYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTU3NDk2NDcxMTk0NzUxNzYwNw&filename=&opi=89354086' },
  { name: 'profile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M3MDVlZDU1NTY2MjRjZGI4NDY2OGU5MzQ1OTA5Yjk1EgsSBxDnovHx9QIYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTU3NDk2NDcxMTk0NzUxNzYwNw&filename=&opi=89354086' },
  { name: 'details', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FjZGNjMWJhNjE1NjQwOTg4ZGNlY2MzYzJiMzBmOGQ2EgsSBxDnovHx9QIYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTU3NDk2NDcxMTk0NzUxNzYwNw&filename=&opi=89354086' }
];

const outDir = 'src/app/templates';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function processTemplates() {
  for (const t of templates) {
    const html = await download(t.url);
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    let body = bodyMatch ? bodyMatch[1] : html;
    
    // Fix attributes for React
    body = body.replace(/class=/g, 'className=');
    body = body.replace(/for=/g, 'htmlFor=');
    body = body.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
    body = body.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
    body = body.replace(/<br>/g, '<br />');
    body = body.replace(/<hr([^>]*[^\/])>/g, '<hr$1 />');
    body = body.replace(/<hr>/g, '<hr />');
    body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
    body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
    body = body.replace(/<!--[\s\S]*?-->/g, '');
    // Replace styles for React
    body = body.replace(/style="([^"]*)"/g, (match, styleString) => {
      // Very basic inline style conversion to avoid errors
      // E.g. style="font-variation-settings: 'FILL' 1;"
      let props = styleString.split(';').filter(s => s.trim()).map(s => {
        let [k, v] = s.split(':');
        k = k.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        v = v.trim().replace(/'/g, '"');
        return `${k}: '${v}'`;
      }).join(', ');
      return `style={{${props}}}`;
    });

    const componentCode = `export default function ${t.name.charAt(0).toUpperCase() + t.name.slice(1)}Template() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      ${body}
    </div>
  );
}`;
    
    const dir = path.join(outDir, t.name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), componentCode);
    console.log('Saved ' + t.name);
  }
}
processTemplates().catch(console.error);
