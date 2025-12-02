export function compareImages(canvas1, canvas2) {
  const w = canvas1.width;
  const h = canvas1.height;

  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");

  const data1 = ctx1.getImageData(0, 0, w, h).data;
  const data2 = ctx2.getImageData(0, 0, w, h).data;

  let totalLinePixels = 0;
  let matched = 0;

  // 정답 선 픽셀 기준으로만 검사
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const L1 = data1[i] + data1[i+1] + data1[i+2];

      const isLine1 = L1 < 600; // 정답 선

      if (isLine1) {
        totalLinePixels++;

        // 주변 3px 내에 유저 선이 있는지 체크
        let found = false;
        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;

            const j = (ny * w + nx) * 4;
            const L2 = data2[j] + data2[j+1] + data2[j+2];

            if (L2 < 600) {
              found = true;
              break;
            }
          }
          if (found) break;
        }

        if (found) matched++;
      }
    }
  }

  if (totalLinePixels === 0) return 0;

  return ((matched / totalLinePixels) * 100).toFixed(1);
}
