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
  return {
    // checklists: Checklist.query(resources)
    //   .all()
    //   .includes(["tasks"])
    //   .execute()
    //
    // checklists: Checklist.query(resources).all().execute()
    //
    checklists: Checklist.query(resources)
      .where({ name: "Onboarding Rest" })
      .includes(["tasks"])
      .execute()
    //
    // checklists: Checklist.query(resources).includes(["tasks"]).execute()
    //
    // checklists: Checklist.query(resources)
    //   .find(1)
    //   .includes(["tasks"])
    //   .execute()
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchChecklists }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistsScreen);
