import React from "react";
import { Flex, Text } from "rebass";
import { Root } from "./Intro";

export const Roadmap = () => (
  <Root>
    <Flex flexDirection={"column"}>
        <Text>why</Text>
        <Text>slack bolt</Text>
        <Text>libs: js, python, java</Text>
        <Text>how to create a new app</Text>
        <Text>how to create a new app from manifest yml</Text>
        <Text>how to set oauth tokens and permissions</Text>
        <Text>slack bot commands</Text>
        <Text>slack API</Text>
        <Text>slack API sdk methods</Text>
        <Text>timeout</Text>
        <Text>git</Text>
        <Text>cron</Text>
        <Text>what else?</Text>
    </Flex>
  </Root>
);
