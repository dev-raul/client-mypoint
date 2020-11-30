import React, { useCallback, useRef } from "react";
import { Dimensions } from "react-native";

import { Container, Scroll, Backgroung } from "./styles";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
const { width, height } = Dimensions.get("screen");
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
    <Backgroung
      source={require("../../../assets/images/background.jpg")}
      imageStyle={{ resizeMode: "cover" }}
    >
      <Container>
        <Scroll
          ref={scroll}
          data={data}
          horizontal
          snapToInterval={width < height ? width : height}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          initialScrollIndex={1}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 200));
            wait.then(() => {
              scroll.current?.scrollToIndex({ index: info.index, animated: false });
            });
          }}
          onScroll={(e) => onScroll(e)}
          renderItem={({ item }) => {
            if (parseInt(String(item)) === 0) {
              return <SignIn goToSignUp={goToSignUp} />;
            } else if (parseInt(String(item)) === 2) {
              return <SignUp goToSignIn={goToSignIn} />;
            } else {
              return <Welcome goToSignIn={goToSignIn} goToSignUp={goToSignUp} />;
            }
          }}
          keyExtractor={(item) => String(item)}
        />
      </Container>
    </Backgroung>
  );
};

export default Auth;
