import React from 'react';

interface Props {
	nodeName?: string;
	node?: React.ReactNode;
	className?: string;

	detectTouch?: boolean;
	detectMouse?: boolean;

	delta: number;
	preventDefault?: boolean;
	stopPropagation?: boolean;

	children?: React.ReactNode;

	onSwipe?: (p: Position) => void;
	onSwipingLeft?: (x: number) => void;
	onSwipingRight?: (x: number) => void;
	onSwipedLeft?: () => void;
	onSwipedRight?: () => void;
	onSwipingUp?: (y: number) => void;
	onSwipingDown?: (y: number) => void;
	onSwipedUp?: () => void;
	onSwipedDown?: () => void;
	onSwipeEnd: () => void;
}

interface Store {
	x: number;
	y: number;
	status: boolean;
	detected: boolean;
	delta: number;
}

export interface Position {
	x: number;
	y: number;
}

const isTouchEvent = (event: MouseEvent | TouchEvent): boolean => {
	if (event instanceof MouseEvent) {
		return false;
	}

	return event instanceof TouchEvent;
};

class SwipeComponent extends React.Component<Props> {
	private store: Store = {
		x: 0,
		y: 0,
		status: false,
		detected: false,
		delta: 50,
	};

	static readonly defaultProps = {
		delta: 50,

		detectMouse: true,
		detectTouch: false,

		preventDefault: false,
		stopPropagation: false,
	};

	private prepare = (e: React.MouseEvent | React.TouchEvent): MouseEvent | TouchEvent => {
		if (this.props.preventDefault) e.preventDefault();
		if (this.props.stopPropagation) e.stopPropagation();
		return e.nativeEvent;
	};

	private moveStart = (e: MouseEvent | TouchEvent) => {
		let x = 0;
		let y = 0;
		const touches: TouchList = (e as TouchEvent).touches;

		if (e instanceof MouseEvent) {
			x = e.clientX;
			y = e.clientY;
		}
		if (isTouchEvent(e) && touches) {
			if (!touches[0]) {
				throw new Error('touch is not find');
			}
			x = touches[0].clientX;
			y = touches[0].clientY;
		}

		this.store.x = parseFloat(x.toFixed(2));
		this.store.y = parseFloat(y.toFixed(2));
		this.store.status = true;
		this.store.detected = false;
	};

	private move = (e: MouseEvent | TouchEvent) => {
		const { delta, onSwipe, onSwipingLeft, onSwipingRight, onSwipedLeft, onSwipedRight, onSwipingUp, onSwipingDown, onSwipedUp, onSwipedDown } = this.props;
		if (!this.store.status) return;

		let x = 0;
		let y = 0;
		const touches: TouchList = (e as TouchEvent).touches;

		if (e instanceof MouseEvent) {
			x = e.clientX;
			y = e.clientY;
		}
		if (isTouchEvent(e) && touches) {
			if (!touches[0]) {
				throw new Error('touch is not find');
			}
			x = touches[0].clientX;
			y = touches[0].clientY;
		}

		x = parseFloat(x.toFixed(2));
		y = parseFloat(y.toFixed(2));
		const tX = parseFloat((x - this.store.x).toFixed(2));
		const tY = parseFloat((y - this.store.y).toFixed(2));

		if (onSwipe) {
			onSwipe({ x: tX, y: tY });
		}

		if (Math.abs(tX) >= delta) {
			if (onSwipingRight && tX > delta) {
				onSwipingRight(tX);
			} else if (onSwipingLeft && tX < -delta) {
				onSwipingLeft(tX);
			}
		}
		if(Math.abs(tY) >= delta) {
			if(onSwipingDown && tY < -delta) {
				onSwipingDown(tY);
			}
			if(onSwipingUp && tY > delta) {
				onSwipingUp(tY);
			}
		}

		if (!this.store.detected && Math.abs(tX) >= delta) {
			if (onSwipedRight && tX > delta) {
				onSwipedRight();
				this.store.detected = true;
			} else if (onSwipedLeft && tX < -delta) {
				onSwipedLeft();
				this.store.detected = true;
			}
		}

		if (!this.store.detected && Math.abs(tY) >= delta) {
			if (onSwipedDown && tY > delta) {
				onSwipedDown();
				this.store.detected = true;
			} else if (onSwipedUp && tY < -delta) {
				onSwipedUp();
				this.store.detected = true;
			}
		}
	};

	private moveEnd = () => {
		const { onSwipeEnd } = this.props;
		this.store.x = 0;
		this.store.y = 0;
		this.store.status = false;
		this.store.detected = false;
		if (onSwipeEnd) onSwipeEnd();
	};

	public render() {
		const start = (e: React.MouseEvent | React.TouchEvent) => {
			const event: MouseEvent | TouchEvent = this.prepare(e);
			this.moveStart(event);
		};
		const move = (e: React.MouseEvent | React.TouchEvent) => {
			const event: MouseEvent | TouchEvent = this.prepare(e);
			this.move(event);
		};
		const end = (e: React.MouseEvent | React.TouchEvent) => {
			this.prepare(e);
			this.moveEnd();
		};

		const newProps: React.HTMLAttributes<any> = {
			className: this.props.className || undefined,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onTouchStart: this.props.detectTouch ? start : (): void => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onTouchMove: this.props.detectTouch ? move : (): void => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onTouchEnd: this.props.detectTouch ? end : (): void => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onMouseDown: this.props.detectMouse ? start : (): void => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onMouseMove: this.props.detectMouse ? move : (): void => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onMouseUp: this.props.detectMouse ? end : (): void => {},
			style: { touchAction: 'none', flexGrow: 2, display: 'flex' },
		};

		const elementType = this.props.nodeName || 'div';
		return React.createElement(elementType, newProps, this.props.children);
	}
}

export default SwipeComponent;
