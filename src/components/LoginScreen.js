import React, { Component } from "react";
import { View, Button } from "react-native";

type Props = {};
export default class LoginScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate("ChecklistsScreen")}
          title="Log In"
          color="#841584"
        />
      </View>
    );
  }
}

styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
