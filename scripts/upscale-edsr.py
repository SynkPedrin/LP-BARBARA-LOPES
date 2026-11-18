"""Super-resolução (EDSR ×4) das fotos da Dra. Bárbara usadas no hero, que a cliente enviou em baixa resolução.

Uso (ambiente isolado, OpenCV 4 com o módulo contrib dnn_superres):
    python3 -m venv .venv-sr && .venv-sr/bin/pip install "opencv-contrib-python-headless==4.10.0.84" "numpy<2"
    curl -L -o EDSR_x4.pb https://github.com/Saafke/EDSR_Tensorflow/raw/master/models/EDSR_x4.pb
    .venv-sr/bin/python scripts/upscale-edsr.py EDSR_x4.pb 4 assets/FUNDO-BARBARAA.png hero-4k.png 3840 2161
    .venv-sr/bin/python scripts/upscale-edsr.py EDSR_x4.pb 4 "assets/Dra. barbara, qualidade.png" retrato-4k.png 2560 3840
Depois, converter para JPEG (qualidade 95, 4:4:4) em public/assets/barbara/dra-barbara-lopes[-retrato]-4k.jpg.
Processa em blocos com sobreposição para limitar o uso de memória e evitar emendas.
"""
import sys, time, cv2, numpy as np
model, scale, src, dst, tw, th = sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4], int(sys.argv[5]), int(sys.argv[6])
sr = cv2.dnn_superres.DnnSuperResImpl_create(); sr.readModel(model); sr.setModel("edsr", scale)
img = cv2.imread(src, cv2.IMREAD_COLOR); h, w = img.shape[:2]; T, P, S = 160, 12, scale
out = np.zeros((h*S, w*S, 3), np.uint8); t0 = time.time()
for y in range(0, h, T):
    for x in range(0, w, T):
        y0, x0, y1, x1 = max(y-P, 0), max(x-P, 0), min(y+T+P, h), min(x+T+P, w)
        r = sr.upsample(img[y0:y1, x0:x1])
        hh, ww = min(T, h-y)*S, min(T, w-x)*S
        out[y*S:y*S+hh, x*S:x*S+ww] = r[(y-y0)*S:(y-y0)*S+hh, (x-x0)*S:(x-x0)*S+ww]
    print(f"{y}/{h} {time.time()-t0:.0f}s", flush=True)
res = cv2.resize(out, (tw, th), interpolation=cv2.INTER_AREA)
cv2.imwrite(dst, res); print("ok", res.shape, f"{time.time()-t0:.0f}s")
