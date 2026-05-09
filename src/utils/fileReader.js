const MAX_CHARS = 8000;

function isText(file) {
  return (
    file.type.startsWith('text/') ||
    /\.(md|txt|csv|json)$/i.test(file.name)
  );
}

export function readFiles(fileList) {
  return Array.from(fileList).map(file => {
    return new Promise(resolve => {
      const base = {
        id: `${file.name}-${Date.now()}`,
        name: file.name,
        type: file.type,
      };

      if (!isText(file)) {
        resolve({ ...base, content: '', truncated: false });
        return;
      }

      const reader = new FileReader();
      reader.onload = ev => {
        const raw = ev.target.result?.toString() || '';
        const truncated = raw.length > MAX_CHARS;
        resolve({ ...base, content: raw.slice(0, MAX_CHARS), truncated });
      };
      reader.onerror = () => resolve({ ...base, content: '', truncated: false });
      reader.readAsText(file);
    });
  });
}
