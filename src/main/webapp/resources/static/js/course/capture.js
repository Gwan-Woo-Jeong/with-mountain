export function captureHTML(element, html2canvasOption) {
    const isImported = () => typeof window.html2canvas !== "undefined" && typeof window.canvg !== "undefined";

    const makeSvgList = () => $("svg").filter((_, svg) => $(svg).closest(element).length > 0).toArray();

    const normalCapture = () =>
        html2canvas(element, html2canvasOption).then(canvas => {
            return canvas.toDataURL('image/png'); // URL 반환
        });

    const svgCapture = async (svgList) => {
        for (const svgEle of svgList) {
            const canvas = $('<canvas></canvas>')[0];
            $(canvas).attr("style", $(svgEle).attr("style")).addClass("canvgTemp");
            await canvg.Canvg.from(canvas.getContext("2d"), svgEle.outerHTML).then(v => {
                v.start();
                $(svgEle).parent().append(canvas);
                $(svgEle).hide();
            });
        }

        const targetCanvas = await html2canvas(element, html2canvasOption);
        $(".canvgTemp").remove();
        svgList.forEach(el => $(el).show());
        return targetCanvas.toDataURL('image/png'); // URL 반환
    };

    if (!isImported()) {
        console.error("html2canvas 또는 canvg 불러오기 실패");
        return Promise.reject(new Error("Dependencies not loaded"));
    }

    const svgList = makeSvgList();
    if (svgList.length > 0) {
        return svgCapture(svgList);
    } else {
        return normalCapture();
    }
}