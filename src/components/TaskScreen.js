import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { List, ListItem } from "react-native-elements";

import Checklist from "../models/Checklist";
import Task from "../models/Task";

type Props = {};
class TaskScreen extends Component<Props> {
  render() {
    // const { navigation: { state: { params: { tasks } } } } = this.props;
    const { tasks } = this.props;
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

const mapStateToProps = ({ resources }) => {
  return {
    tasks: Task.query(resources)
      .whereRelated(Checklist, { name: "Onboarding Rest" })
      .execute()
  };
};

export default connect(mapStateToProps)(TaskScreen);
