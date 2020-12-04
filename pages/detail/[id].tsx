import Axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cart from '../../static/cart.png';

const Detail: NextPage = () => {
	return (
		<Wrapper>
			<Link href={'/cart'}><Button>바로 먹으러가기<img className="ml-2" width="23px" src={cart} alt="카트" /></Button></Link>
		</Wrapper>
	);
};

interface ServerSideProps {
	props: {
    data: any;
    id: string;
	}
}

export const getServerSideProps = async ({params}: any): Promise<ServerSideProps | void> => {
	const data = await (await Axios.get(`http://localhost:8080/api/orders/v2/page/${params.id}`)).data;  
	return {
		props: {
      data,
      id: params.id,
		}
	}
};

export default Detail;

const Wrapper = styled.div`
	overflow: hidden;
	width: 100vw;
	height: 300vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Button = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
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
