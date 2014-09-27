PngUnpack
=========

Javascript mini library to unpack general html code packed into png images.

Requirements:
Requires a png image containing the html encoded as UTF8 packed into the RGB channels. Alpha can not be used in the image since the canvas object uses pre-multiplied alpha which destroys the information in the other channels. When encoding it, make sure you get the right big/small endian and the right stride size.

Usage:
Unpack(imgElement);
