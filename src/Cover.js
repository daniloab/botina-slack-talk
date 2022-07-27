import React from "react";
import styled from "styled-components";
import { space, width, fontSize, color } from "styled-system";

import { Root } from "./Intro";

const Img = styled.img`
  ${width}
`;

export const Center = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 50px;
  ${space}
`;

const Subtitle = styled.span`
  font-size: 40px;
  color: #fdaa4c;
  ${space}
`;

const MeName = styled.span`
  font-size: 30px;
  color: #25d7fd;
  ${space}
`;

export const Cover = () => (
  <Root>
    <Center>
      <Img src={"./img/bolt-js-logo.svg"} width={300} />
      <Title mt={20}>Improving Operational Work with a Slack Bot</Title>
      <Subtitle mt={20}>Save time and automate repetitive tasks</Subtitle>
      <MeName mt={100}>Danilo Assis</MeName>
    </Center>
  </Root>
);
