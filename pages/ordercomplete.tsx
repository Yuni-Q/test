import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Button, MoreButton } from './complete/[id]';
import { Title } from './swipe';

const Ordercomplete: NextPage = () => {
	return (
		<Wrapper>
			<Title>지금뭐먹니</Title>
			<Img />
			<Link href={'/'}><Button>주문내역 보기</Button></Link>
			<Link href={'/'}><MoreButton>홈으로 돌아가기</MoreButton></Link>
		</Wrapper>
	);
};

export default Ordercomplete;

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Img = styled.div`
	width: 100%;
	height: 100%;
	margin: 40px 60px 0;
	background: url('/static/ordercomplete.png') center center no-repeat;
	background-size: contain;
	flex-grow: 2;
`;
