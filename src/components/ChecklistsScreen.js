import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text } from "react-native";

import { fetchChecklists } from "../actions/checklists";
import Checklists from "./CheckLists";
import Checklist from "../models/Checklist";

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

const mapStateToProps = ({ resources }) => {
  // console.log(
  //   Object.values(
  //     Checklist.setResources(resources)
  //       .where({ name: "Onboarding Rest" })
  //       .execute()
  //   )
  // );

  console.log(Checklist.setResources(resources).includes(["tasks"]).execute());

  return {
    // checklists: Checklist.setResources(resources)
    //   .all()
    //   .includes(["tasks"])
    //   .execute()
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchChecklists }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistsScreen);
