import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { List, ListItem } from "react-native-elements";

type Props = {};
export default class Checklists extends Component<Props> {
  render() {
    const { checklists, navigation } = this.props;
    console.log(checklists);
    if (!checklists) return null;
    return (
      <List>
        {checklists.map(({ id, name }) => (
          <TouchableOpacity
            key={id}
            onPress={() => navigation.navigate("ChecklistScreen")}
          >
            <ListItem title={name} />
            {/* <ListItem title={name} leftIcon={{ name: "done" }} /> */}
          </TouchableOpacity>
        ))}
      </List>
    );
  }
}
