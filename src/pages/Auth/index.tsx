import React, { useCallback, useRef } from "react";
import { Dimensions } from "react-native";

import { Container, Scroll, Teste } from "./styles";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
const { width } = Dimensions.get("screen");
const data: number[] = [0, 1, 2];
const Auth: React.FC = () => {
  const scroll = useRef(null);
  const onScroll = useCallback((e) => {}, []);

  const goToSignUp = useCallback(() => {
    scroll.current?.scrollToIndex({ animated: true, index: 2 });
  }, []);
  const goToSignIn = useCallback(() => {
    scroll.current?.scrollToIndex({ animated: true, index: 0 });
  }, []);

  return (
    <Container>
      <Scroll
        ref={scroll}
        data={data}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        initialScrollIndex={1}
        onScroll={(e) => onScroll(e)}
        renderItem={({ item }) => {
          if (parseInt(String(item)) === 0) {
            return <SignIn />;
          } else if (parseInt(String(item)) === 2) {
            return <SignUp />;
          } else {
            return <Welcome goToSignIn={goToSignIn} goToSignUp={goToSignUp} />;
          }
        }}
        keyExtractor={(item) => String(item)}
      />
    </Container>
  );
};

export default Auth;
