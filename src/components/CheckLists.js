import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { List, ListItem } from "react-native-elements";

type Props = {};
export default class Checklists extends Component<Props> {
  render() {
    const { checklists, navigation } = this.props;
    if (!checklists) return null;
    return (
      <List>
        {checklists.map(({ id, name, tasks }) => (
          <TouchableOpacity
            key={id}
            onPress={() => navigation.navigate("TaskScreen", { tasks })}
          >
            <ListItem title={name} />
          </TouchableOpacity>
        ))}
      </List>
    );
  }
}
