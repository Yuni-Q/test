import Axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Bottom } from '..';
import cart from '../../static/cart.png';
import { Title } from '../swipe';
import go from '../../static/go.png'

const Detail: NextPage = ({ data }: any) => {
	return (
		<Wrapper>
			<Title>지금뭐먹니</Title>
			<img style={{ display: 'block', width: 'calc(100% - 104px)', margin: '0 auto' }} src={go} alt="바로 먹으러 가기" />
			<Img url={data.imageUrl} />
			<DetailText>
				<div className="menu-name">{data.menusDto.reduce((total: string, item: any) => {
					return total + item.name
				}, '')}</div>
				<div>
					{data.menusDto.length}메뉴, {data.menusDto.reduce((total: number, item: any) => {
						return total + item.amount
					}, 0)}
				</div>
			</DetailText>
			<Link href={'/cart'}><Button>장바구니로 이동<img className="ml-2" width="23px" src={cart} alt="카트" /></Button></Link>
			<Link href={'/swipe'}><MoreButton>더 고르기</MoreButton></Link>
			<div style={{ position: 'relative' }}>
				<img style={{ display: 'block', width: '100vw' }} src="/static/bottom.png" alt="" />
				<Link href={'/swipe'}><Bottom /></Link>
			</div>
		</Wrapper>
	);
};

interface ServerSideProps {
	props: {
		data: any;
		id: string;
	}
}

export const getServerSideProps = async ({ params }: any): Promise<ServerSideProps | void> => {
	const data = await Axios.get(`http://yh-toy-lb-310524064.ap-northeast-2.elb.amazonaws.com/api/orders/v2/page/${params.id}`);

	return {
		props: {
			data: data.data,
			id: params.id,
		}
	}
};

export default Detail;

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: calc(100vw - 32px);
	height: 56px;
  margin: 16px;
  background: #2AC1BC;
  border-radius: 8px;
  font-family: Apple SD Gothic Neo;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
`;

export const MoreButton = styled.button`
	width: calc(100vw - 32px);
	height: 56px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Apple SD Gothic Neo;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: #2AC1BC;
	margin: 0 16px 16px;
`;

export const DetailText = styled.div`
	width: 100vw;
	text-align: center;
	div {
		font-family: Apple SD Gothic Neo;
		font-size: 16px;
		line-height: 24px;	
		color: #212329;
	}
	.menu-name {
		white-space: normal;
		line-height: 1.4;
		height: 1.4em;
		text-align: center;
		word-wrap: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
	}
`;

const Img = styled.div<{ url: string }>`
	width: calc(100% - 160px);
	margin: 24px 80px 16px;
	background: url(${({ url }) => url}) top center no-repeat;
	background-size: cover;
	flex-grow: 2;
`;