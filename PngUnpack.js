Unpack = function (els) {
    var pngs = els;
    var data, data2, strdata="", img, i, c=0, parent, ctx, node, datalen, chunk=10000, bite=0, start, mid, stop, w, h;
    var canvas = document.createElement("canvas");
    var holder = document.createElement("div");
    for (i = 0; i < pngs.length; i++) {
        img = pngs[i];
        w = img.naturalWidth;
        h = img.naturalHeight;
        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = "copy";
        //copy image to canvas, has to be RGB coded or with alpha=255
        ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);
        data2 = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        //IE10 only has Uint8Array and IE9 doesnt even have that.
        if(Uint8ClampedArray) data = new Uint8ClampedArray(data2.length * 0.75);
        else if(Uint8Array) data = new Uint8Array(data2.length * 0.75);
        else data = new Array(data2.length * 0.75);

        var j = 0, k = 0, len = data2.length;
        j = len;
        k = (j >> 2) * 3;
        // strip out Alpha byte
        while (k--,j--) {
            data[k] = data2[--j];
            data[--k] = data2[--j];
            data[--k] = data2[--j];
        }
        datalen = data.length;
        var ckindex;
        // bytearray as utf-8 encoded string with multi byte code point support
        while (datalen > bite) {
            ckindex = bite + chunk;
            if ((data[ckindex] >> 6) & 2) {
                while (([++ckindex] >> 6) === 2) {
                }
            }
            strdata += decodeURIComponent(escape(String.fromCharCode.apply(null, data.subarray(bite, bite = ckindex + 1))));
        }
        //insert into node
        parent = img.parentNode;
        holder.innerHTML = strdata;
        var children = window.toArray(holder.children);
        if (children.length == 0) return console.log("No data in png found.");
        while (node = children[c++]) {
            parent.insertBefore(node, img);
        }
        parent.removeChild(img);
    }
}
