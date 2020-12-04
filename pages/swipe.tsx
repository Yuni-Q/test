import Axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import SwipeComponent from '../components/SwipeComponent';
import star from '../static/star.svg';
import { DetailText } from './complete/[id]';
import { Bottom } from './index';

const Swipe: NextPage<{ initData: any }> = ({ initData }) => {
	const [data, setData] = useState(initData);
	const router = useRouter();
	const [index, setIndex] = useState(0)
	const onRight = () => {
		document.getElementById(index.toString())?.classList.add('right');
		// setIndex((index) => index + 1)
		router.push(`/complete/${data[index].id}`)
	}
	const onLeft = () => {
		document.getElementById(index.toString())?.classList.add('left');
		setIndex((index) => index + 1)
	}
	return (
		<Wrapper>
			{/* <Link href="/detail"><CycleTemp style={{ position: 'absolute', top: 0, right: 0, zIndex: 200 }} >상세로</CycleTemp></Link> */}
			<Title>지금뭐먹니</Title>
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 2, position: 'relative' }}>
				{data.length === index && <TungWrapper>
					<Tung />
					<DetailText>
						<div>
							더이상 불러올 카드가 없습니다.<br />
						다시 시도하시겠어요?
				</div>
					</DetailText>
					<Reload onClick={ async () => {
						try {
							const newData = await Axios.get('http://yh-toy-lb-310524064.ap-northeast-2.elb.amazonaws.com/api/orders/v2/page', { withCredentials: true, headers: {
                Cookie: `woowatonV=${data[0].woowatonV};`
							} });
							setData([...newData.data]);
							setIndex(0);	
						} catch(e) {
							console.log(e)
						}
					}}>다시 시도하기</Reload>
				</TungWrapper>}
				<SwipeComponent
					delta={50}
					detectTouch={true}
					detectMouse={true}
					onSwipeEnd={() => console.log('end')}
					onSwipedLeft={onLeft}
					onSwipedRight={onRight}
					onSwipedUp={() => console.log('up')}
					onSwipedDown={() => console.log('down')}
				>
					<SwipeWrapper>
						{data.map((d: any, idx: number) => {
							return (
								<Card key={d.id + idx} id={idx.toString()} idx={idx}>
									<CardImgWrapper >
										<CardImg url={d.imageUrl} />
										<Box />
										<CardInfo>
											<Time><img className="mr-1" width="16px" src={star} alt="별점" />{d.storeDto.rating}</Time>
											<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'bottom' }}>
												<StoreName>{d.storeDto.name}</StoreName>
												<Time>{d.id.toString()[d.id.toString().length - 1]}분 전</Time>
											</div>
										</CardInfo>
									</CardImgWrapper>
									<CardDetail>
										<div className="menu-name">{d.menusDto.reduce((total: string, item: any) => {
											return total + item.name
										}, '')}</div>
										<div>
											{d.menusDto.length}메뉴, {d.menusDto.reduce((total: number, item: any) => {
												return total + item.amount
											}, 0)}
										</div>
									</CardDetail>
								</Card>
							)
						})}
					</SwipeWrapper>
				</SwipeComponent>
				<CycleWreapper>
					<NoText>안땡겨요</NoText>
					<Left onClick={onLeft}>
						<img src="/static/left.svg" alt="" width="25px" height="26.23px" />
					</Left>
					<Right onClick={onRight}>
						<img src="/static/right.svg" alt="" width="32px" height="30.77px" />
					</Right>
					<YesText>먹을래요</YesText>
				</CycleWreapper>
			</div>
			<div style={{ position: 'relative' }}>
				<img style={{ display: 'block', width: '100vw' }} src="/static/bottom.png" alt="" />
				<a href={'/swipe'}><Bottom /></a>
			</div>
		</Wrapper>
	);
};

interface ServerSideProps {
	props: {
		initData: any;
	}
}

export const getServerSideProps = async (): Promise<ServerSideProps | void> => {
	try {
		const data = await Axios.get('http:/localhost:8080/api/orders/v2/page', { withCredentials: true });
		return {
			props: {
				initData: data.data,
			}
		}
	} catch(e) {
		return;
	}	
};

export default Swipe;



const Wrapper = styled.div`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const SwipeWrapper = styled.div`
	margin: 8px 16px 24px;
	position: relative;
	width: calc(100vw - 32px);
	height: auto;
	flex-grow: 2;
	background: #FFFFFF;
	box-shadow: 0px 24px 32px rgba(149, 157, 174, 0.2);
	border-radius: 8px;
`;

const Card = styled.div<{ idx: number }>`
@keyframes left {
  		0% {
				transform-origin: bottom center;
				transform: rotate(0);
				visibility: visible;
  		}
  		100% {
				transform: rotate(-45deg) translateX(-100%) translateY(-50%);
				visibility: hidden;
			}
		}
		@keyframes right {
  		0% {
				transform-origin: center center;
				transform: rotate(0);
				visibility: visible;
  		}
  		100% {
				transform: rotate(45deg) translateX(100%) translateY(-50%);
				visibility: hidden;
			}
		}
		&.left {
			animation: linear 0.5s forwards left;
		}
		&.right {
			animation: linear 0.5s forwards right;
		}
	position: absolute;
	z-index: ${({ idx }) => 100 - idx};
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	background: #fff;
`;

const CycleWreapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 0 24px;
`;

const Left = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 64px;
	height: 64px;
	border-radius: 50%;
	background-color: #F5442C;
	margin: 0 12px;
`;

const Right = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 64px;
	height: 64px;
	border-radius: 50%;
	background-color: #2AC1BC;
	margin: 0 12px;
`;

export const Title = styled.h1`
	width: 100vw;
	height: 48px;
	font-family: Apple SD Gothic Neo;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	color: #000000;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CardDetail = styled.div`
	position: absolute;
	bottom:0;
	left: 0;
	width: calc(100% - 36px);
	margin: 20px;
	background: #fff;
	height: 48px;
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
		text-align: left;
		word-wrap: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
	}
`;

const CardImg = styled.div<{ url: string }>`
	width: 100%;
	height: calc(100% - 88px);
	background: url(${({ url }) => url}) top center no-repeat;
	background-size: cover;
`;

const Box = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(100% - 88px);
	background: linear-gradient(180deg, rgba(33, 35, 41, 0) 65.62%, rgba(33, 35, 41, 0.6) 93.75%);
`;


const CardImgWrapper = styled.div`
	position: relative;
	height: 100%;
`;

const CardInfo = styled.div`
	width: calc(100% - 36px);
	height: 52px;
	position: absolute;
	left: 0;
	bottom: 88px;
	margin: 0 16px 16px;
`;

const StoreName = styled.div`
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: bold;
	font-size: 22px;
	line-height: 32px;
	color: #FFFFFF;
`;

const Time = styled.div`
	font-family: Apple SD Gothic Neo;
	font-size: 14px;
	line-height: 20px;
	color: #FFFFFF;
`;

const NoText = styled.div`
	font-family: Apple SD Gothic Neo;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: #F5442C;
	margin: 0 4px 0;
`;

const YesText = styled.div`
	font-family: Apple SD Gothic Neo;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: #2AC1BC;
	margin: 0 0 0 4px;
`;

const Tung = styled.div`
	flex-grow: 2;
	margin: 16px 108px;
	width: 100px;
	height: 100px;
	background: url('/static/tung.png') center center no-repeat;
	background-size: contain;
`;

const TungWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	z-index: 10000;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #fff;
`;

const Reload = styled.button`
	width: 128px;
	height: 48px;
	background: #FFFFFF;
	border: 1px solid #E0E3EB;
	box-sizing: border-box;
	border-radius: 24px;
	font-family: Apple SD Gothic Neo;
	font-weight: 800;
	font-size: 16px;
	line-height: 24px;
	color: #212329;
	margin: 24px 0 98px;
`