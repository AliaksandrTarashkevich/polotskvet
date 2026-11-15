#!/bin/zsh
# Colour-match the five doctor photos so they read as one series.
# Writes copies to public/concepts/photos/ — the originals in public/assets/doctor/ are never modified.
# Needs ffmpeg. Run from the repository root:  zsh design-assets/grade-photos.sh
#
# Why these numbers: skin, wall and white patches were measured in CIE Lab on every frame.
# Three frames (portrait, reading, diagnostics) were shot in a pink room with a strong blue/magenta
# cast: skin hue 3–10° instead of the natural ~50°. Two frames (exam-dog, equipment) were shot in a
# grey room and were already natural. After this script skin sits at 52–55° on every frame.

set -e
SRC=public/assets/doctor
OUT=${1:-public/concepts/photos}
mkdir -p "$OUT"

# Pink-room frames: pull the blue channel down, most in the shadows (blue = 0.90 * in^1.149, eased back near white).
PINK="curves=b='0/0 0.05/0.0288 0.1/0.0639 0.2/0.1417 0.35/0.2694 0.5/0.4058 0.65/0.5486 0.8/0.6964 0.9/0.81 1/0.965'"
# Grey-room frames: whites a touch less yellow-green.
GREY="colorchannelmixer=gg=0.995:bb=1.02"

typeset -A F
F[roman-portrait]="$PINK,eq=gamma=1.15:saturation=0.96,curves=all='0/0 0.25/0.225 0.5/0.515 0.75/0.785 1/1'"
F[roman-reading]="$PINK,colorlevels=rimin=0.055:gimin=0.055:bimin=0.055:rimax=0.93:gimax=0.93:bimax=0.93,eq=saturation=0.94"
F[roman-diagnostics]="$PINK,eq=gamma=0.96:saturation=0.95"
F[roman-exam-dog]="$GREY,eq=saturation=0.97"
F[roman-equipment]="$GREY,eq=gamma=1.05:saturation=0.98"

for n in ${(k)F}; do
  ffmpeg -y -loglevel error -i "$SRC/$n.jpg" -vf "format=gbrp,${F[$n]},format=yuvj420p" -q:v 2 "$OUT/$n.jpg"
  echo "graded $n"
done

# Stock photo for the round crops in concepts 3 and 5, chosen by Alex on 14.11.2026:
# Pexels 28644464 by Sueda Güzeldere (Pexels License), source kept in design-assets/stock/.
# Square crop around the puppy, then matched to the doctor photos above: cream whites (Lab b* ≈ +4.5),
# a neutral grey dog, skin hue ≈ 53° and chroma ≈ 24, blacks and highlights in the same range.
# No eq here: it goes through YUV and pushes neutrals toward yellow-green, so gamma and saturation stay in RGB.
STOCK_SRC=design-assets/stock/pexels-28644464.jpg
STOCK_CROP="crop=1080:1080:30:50,scale=900:900:flags=lanczos"
STOCK_GRADE="curves=r='0/0 0.4/0.406 0.5/0.506 0.85/0.882 1/1':g='0/0 0.4/0.396 0.85/0.838 1/0.985':b='0/0 0.4/0.397 0.5/0.492 0.7/0.648 0.85/0.755 1/0.89'"
STOCK_GRADE+=",colorlevels=rimin=0.005:gimin=0.005:bimin=0.005:rimax=0.93:gimax=0.93:bimax=0.93,selectivecolor=yellows='0 0 -0.05 0'"
STOCK_GRADE+=",lutrgb=r='gammaval(1.2)':g='gammaval(1.2)':b='gammaval(1.2)'"
STOCK_GRADE+=",colorchannelmixer=rr=0.76378:rg=0.21456:rb=0.02166:gr=0.06378:gg=0.91456:gb=0.02166:br=0.06378:bg=0.21456:bb=0.72166"
mkdir -p "$OUT/orig"
ffmpeg -y -loglevel error -i "$STOCK_SRC" -vf "$STOCK_CROP" -q:v 3 "$OUT/orig/stock-frenchie.jpg"
ffmpeg -y -loglevel error -i "$STOCK_SRC" -vf "$STOCK_CROP,format=gbrp,$STOCK_GRADE,format=yuvj420p" -q:v 3 "$OUT/stock-frenchie.jpg"
echo "graded stock-frenchie (ungraded crop in $OUT/orig/ for the photo switcher)"

# Generated home-visit photos for 1+, made by Alex in ChatGPT from docs/chatgpt-photo-brief.md on 15.11.2026
# (sources in design-assets/generated/). Illustrations: not Roman and not his patients.
# Measured against the series: the ginger-cat frame was dark and yellow (luma p50 94, forearm skin hue 67°),
# the tabby frame slightly dark with cool whites. A tone curve lifts the midtones to the series (p50 ≈ 150,
# p95 ≈ 220), a luma-weighted matrix takes back the saturation the curve adds, highlights and shadows are
# warmed a touch so whites read cream (b* ≈ +2…+5) and blacks neutral. Exported at q 5 to keep them light.
desat(){ local s=$1 k; k=$((1 - s)); printf 'colorchannelmixer=rr=%.4f:rg=%.4f:rb=%.4f:gr=%.4f:gg=%.4f:gb=%.4f:br=%.4f:bg=%.4f:bb=%.4f' \
  $((0.2126*k+s)) $((0.7152*k)) $((0.0722*k)) $((0.2126*k)) $((0.7152*k+s)) $((0.0722*k)) $((0.2126*k)) $((0.7152*k)) $((0.0722*k+s)); }
typeset -A G
G[gen-cat-ear]="curves=all='0/0 0.1/0.09 0.37/0.6 0.72/0.87 0.85/0.93 1/1',$(desat 0.70),curves=r='0/0 0.8/0.81 1/1':b='0/0 0.8/0.775 1/0.975',colorlevels=bimin=0.012,selectivecolor=reds='0 0.06 -0.04 0':yellows='0 0.10 -0.12 0'"
G[gen-cat-steth]="curves=all='0/0 0.1/0.095 0.54/0.6 0.85/0.88 1/1',$(desat 0.88),curves=r='0/0 0.8/0.812 1/1':b='0/0 0.8/0.78 1/0.975',colorlevels=bimin=0.008"
for n in ${(k)G}; do
  ffmpeg -y -loglevel error -i "design-assets/generated/$n.webp" -q:v 5 "$OUT/orig/$n.jpg"
  ffmpeg -y -loglevel error -i "design-assets/generated/$n.webp" -vf "format=gbrp,${G[$n]},format=yuvj420p" -q:v 5 "$OUT/$n.jpg"
  echo "graded $n (ungraded copy in $OUT/orig/)"
done
