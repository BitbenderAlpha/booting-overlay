import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	padding: '40px',
	fontSize: '160px',
	fontFamily: "'Ubuntu Mono', monospace",
	backgroundColor: '#022',
	color: '#0f0',
};

const maxDots = 3;
const numberOfAnimationSteps = 6;
const animationStepDurationMilliseconds = 250;
const nbsp = '\xa0';

function BootingOverlay() {

	const [animatedText, setAnimatedText] = React.useState('...');

	React.useEffect(() => {

		let animationFrameRequestId =
			window.requestAnimationFrame(function loop(t: number) {
				const dotCount =
					Math.min(
						maxDots,
						Math.floor(t / animationStepDurationMilliseconds) % numberOfAnimationSteps,
					);

				setAnimatedText(
					Array.from({ length: dotCount }).map(() => '.').join('') +
					Array.from({ length: maxDots - dotCount }).map(() => nbsp).join('')
				)

				window.requestAnimationFrame(loop);
			})

		return function cleanUp() {
			window.cancelAnimationFrame(animationFrameRequestId);
		}
	}, [setAnimatedText])

	return (
		<span style={style}>
			booting{animatedText}
		</span>
	);
}


ReactDOM.render(
	<React.StrictMode>
		<BootingOverlay />
	</React.StrictMode>,
	document.getElementById('root')
);

