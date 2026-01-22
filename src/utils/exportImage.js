export const exportCompositeImage = (videoElement, canvasElement) => {
	if (!videoElement || !canvasElement) return;

	const width = videoElement.videoWidth;
	const height = videoElement.videoHeight;

	// Create a virtual canvas to merge them
	const tempCanvas = document.createElement('canvas');
	tempCanvas.width = width;
	tempCanvas.height = height;
	const ctx = tempCanvas.getContext('2d');

	// Draw the Video Frame
	try {
		ctx.drawImage(videoElement, 0, 0, width, height);
	} catch (err) {
		console.error('Video capture failed:', err);
		// Even if video fails, we continue so we at least save the drawings
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);
	}

	// Draw the Annotations
	ctx.drawImage(canvasElement, 0, 0, width, height);

	// Trigger Download
	const link = document.createElement('a');
	link.download = `genea-screen-share-${Date.now()}.png`;
	link.href = tempCanvas.toDataURL('image/png');
	link.click();
};
