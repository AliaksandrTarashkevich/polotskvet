#!/bin/zsh
# Build the two logo options shown on the 1+ page from the house icons Alex supplied on 17.11.2026.
# Each option is the new icon plus the unchanged PolotskVet wordmark, cut from the current web logo.
# Writes public/concepts/icons/logo-N.png (header and footer) and icon-N.png (favicon and the preview-bar button).
# The sources in design-assets/icons/ are never modified.
# Needs ffmpeg. Run from anywhere:  zsh design-assets/build-logo-options.sh
#
# For each icon:
#  1. Alpha clean-up. The files carry a faint haze (alpha 1-31) around the drawing and draw the shapes at
#     alpha 240-254. The haze goes to 0 and the shapes to 255; anti-aliased edges keep their alpha.
#  2. Crop to the drawing: bounding boxes measured at alpha >= 32 on the 1254x1254 sources.
#  3. Scale with premultiplied alpha, so edges do not pick up the colour hidden under transparent pixels.
#  4. Logo: the icon 220 px tall at x 32, centred on the wordmark (y 82-302), followed by the old logo from x 248
#     to 1064: its 35 px gap and the wordmark, without the old transparent right margin. The canvas keeps the old
#     logo's 362 px height, so the page CSS (62 px tall with negative margins) fits without changes, and it is only
#     a few px wider than the old logo, so the phone header (logo, call button, menu) still fits at 375 px.
#  5. Icon: fitted into 116x116 and centred on a transparent 128x128 square.
set -e
cd "${0:A:h}/.."
SRC=design-assets/icons
OUT=public/concepts/icons
WORDMARK=public/assets/brand/polotskvet-logo.png
mkdir -p $OUT

CLEAN="format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(lt(alpha(X,Y),32),0,if(gte(alpha(X,Y),240),255,alpha(X,Y)))'"
PRE="format=gbrap,premultiply=inplace=1"
POST="unpremultiply=inplace=1,format=rgba"
typeset -A CROP
CROP[1]=1025:915:114:172
CROP[2]=1056:904:98:184

for id in 1 2; do
  ffmpeg -v error -y -i $SRC/icon-$id.png -i $WORDMARK -filter_complex \
    "[0]${CLEAN},crop=${CROP[$id]},${PRE},scale=-1:220:flags=lanczos,${POST},pad=w=iw+32:h=362:x=32:y=82:color=black@0[ic];[1]format=rgba,crop=816:362:248:0[wm];[ic][wm]hstack=inputs=2,format=rgba" \
    -frames:v 1 $OUT/logo-$id.png
  ffmpeg -v error -y -i $SRC/icon-$id.png -vf \
    "${CLEAN},crop=${CROP[$id]},${PRE},scale=116:116:force_original_aspect_ratio=decrease:flags=lanczos,${POST},pad=w=128:h=128:x=(ow-iw)/2:y=(oh-ih)/2:color=black@0" \
    -frames:v 1 $OUT/icon-$id.png
done
ls -l $OUT
