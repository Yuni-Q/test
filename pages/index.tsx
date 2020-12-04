import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Main: NextPage = () => {
	return (
		<Wrapper>
			<img style={{flexGrow: 2, display: 'block', width: '100vw', height: '80%'}} src="/static/main.png" alt=""/>
			<div style={{position: 'relative'}}>
				<img style={{display: 'block', width: '100vw'}} src="/static/bottom.png" alt="" />
				<Link href={'/swipe'}><Bottom /></Link>
			</div>
		</Wrapper>
	);
};

export default Main;

const Wrapper = styled.div`
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Bottom = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 15%;
	height: 85%;
	background: url('/static/logo.png') center center no-repeat;
	background-size: 100%;
`;
