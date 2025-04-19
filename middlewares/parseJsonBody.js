const MAX_BODY_SIZE = 1e6; // 1 MB

async function parseJsonBody(req, maxSize = MAX_BODY_SIZE) {
  const chunks = [];
  let totalSize = 0;

  // 用 for-await-of 讀取 stream
  for await (const chunk of req) {
    totalSize += chunk.length;
    if (totalSize > maxSize) {
      // 過大就丟錯並終止連線
      throw new Error('Payload too large');
    }
    chunks.push(chunk);
  }

  // 組合完整字串
  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error('Invalid JSON');
  }
}

module.exports = { parseJsonBody };
