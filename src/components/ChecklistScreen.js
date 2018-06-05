import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { List, ListItem } from "react-native-elements";

type Props = {};
export default class ChecklistScreen extends Component<Props> {
  render() {
    const { navigation: { state: { params: { tasks } } } } = this.props;
    if (!tasks) return null;
    return (
      <List>
        {tasks.map(({ id, description }) => (
          <TouchableOpacity key={id} onPress={() => {}}>
            <ListItem title={description} leftIcon={{ name: "done" }} />
          </TouchableOpacity>
        ))}
      </List>
    );
  }
}

// TODO: try to connect this with
