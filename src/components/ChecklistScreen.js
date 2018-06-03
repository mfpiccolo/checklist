import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { List, ListItem } from "react-native-elements";

type Props = {};
export default class Checklist extends Component<Props> {
  render() {
    const { listItem } = this.props;
    if (!listItem) return null;
    return (
      <List>
        {listItem.map(({ id, name }) => (
          <TouchableOpacity key={id} onPress={() => {}}>
            <ListItem title={name} />
            {/* <ListItem title={name} leftIcon={{ name: "done" }} /> */}
          </TouchableOpacity>
        ))}
      </List>
    );
  }
}
