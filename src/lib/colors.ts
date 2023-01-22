export function HSVtoRGB(h: number, s: number, v: number): string {
	let [r, g, b] = [0, 0, 0];
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0:
			(r = v), (g = t), (b = p);
			break;
		case 1:
			(r = q), (g = v), (b = p);
			break;
		case 2:
			(r = p), (g = v), (b = t);
			break;
		case 3:
			(r = p), (g = q), (b = v);
			break;
		case 4:
			(r = t), (g = p), (b = v);
			break;
		case 5:
			(r = v), (g = p), (b = q);
			break;
	}
	return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

export function getRandomColors() {
	const hue = Math.random();
	const color = HSVtoRGB(hue, 0.8, 0.99);
	const colorCompliment = HSVtoRGB((hue + 0.1) % 1, 0.8, 0.99);
	return { color, colorCompliment };
}

const icons = ['lobster', 'hat', 'gun'];

export function randomPerson(name: string) {
	const hue = Math.random();
	const icon = icons[Math.floor(Math.random() * icons.length)];
	const color = HSVtoRGB(hue, 0.8, 0.99);
	const colorCompliment = HSVtoRGB((hue + 0.04) % 1, 0.8, 0.99);
	return { name, color, icon, colorCompliment };
}
