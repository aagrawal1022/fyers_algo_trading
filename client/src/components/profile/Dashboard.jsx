import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFunds, getProfile } from "../../utils/api-calls";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const AvailableBalance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Amount = styled.p`
  font-size: 16px;
`;

const UserProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const profileDate = await getProfile();
      const fundsData = await getFunds();
      const data = {
        ...profileDate.data.data,
        ...fundsData.data.fund_limit[9],
      };
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return loading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <Container>
      <UserInformation>
        <Info>FY ID: {data.fy_id}</Info>
        <Info>Name: {data.name}</Info>
        <Info>Email ID: {data.email_id}</Info>
        <Info>PAN: {data.PAN}</Info>
        <Info>Mobile Number: {data.mobile_number}</Info>
      </UserInformation>
      <AvailableBalance>
        <Title>{data.title}</Title>
        <Amount>Equity Amount: {data.equityAmount}</Amount>
        <Amount>Commodity Amount: {data.commodityAmount}</Amount>
      </AvailableBalance>
    </Container>
  );
};

export default UserProfile;
