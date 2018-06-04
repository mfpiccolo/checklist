import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text } from "react-native";

import { selectResources } from "../redux-data";
import { fetchChecklists } from "../actions/checklists";
import Checklists from "./CheckLists";

type Props = {};
class ChecklistsScreen extends Component<Props> {
  componentWillMount() {
    this.props.fetchChecklists();
  }

  render() {
    return (
      <Checklists
        navigation={this.props.navigation}
        checklists={this.props.checklists}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    checklists: selectResources(state, {
      type: "checklists",
      include: ["tasks"]
    })
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchChecklists }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistsScreen);
