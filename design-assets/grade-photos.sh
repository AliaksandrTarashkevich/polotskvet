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
