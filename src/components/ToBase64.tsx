export default function ToBase64() {
	function ImageToBase64(img: any, mime_type: any) {
		// New Canvas
		var canvas = document.createElement("canvas")
		canvas.width = img.width
		canvas.height = img.height
		// Draw Image
		var ctx = canvas.getContext("2d")
		if (ctx) {
			ctx.drawImage(img, 0, 0)
		}
		// To Base64
		return canvas.toDataURL(mime_type)
	}

	var img = document.getElementById("previewImage")
	return ImageToBase64(img, "image/jpeg")
}
/*importしてidがpreviweImageとなっているimgタグに入ってる画像をbase64に変換した文字列をToBase64()で取ってこれる。
その文字列をそのままsrcに突っ込めばデコードしてくれるはず*/
