import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Button } from './complete/[id]';
import { Title } from './swipe';

const Cart: NextPage = () => {
	return (
		<Wrapper>
			<Title>지금뭐먹니</Title>
			<img className="mb-28" style={{width: '100%'}} src="/static/cartBlock.png"></img>
			<Link href={'/payment'}><Button style={{position: 'fixed', bottom: 0}}><Cycle>3</Cycle>3,2000원 배달 주문하기</Button></Link>
		</Wrapper>
	);
};

export default Cart;

const Wrapper = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Cycle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: #fff;
	margin: 0 8px 0 0;
	color: #2AC1BC;
`;
