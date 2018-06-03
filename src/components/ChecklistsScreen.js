import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text } from "react-native";

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

// TODO: Framework Code
const selectResources = ({ resources }, { type, include }) => {
  return Object.entries(resources[type]).map(([id, resource]) => {
    const newResource = { id, ...resource.attributes };
    include.forEach(relationshipIdentifier => {
      newResource[relationshipIdentifier] = [];
      relationshipData = resource.relationships[relationshipIdentifier].data;
      relationshipData.forEach(relation => {
        const relationResources = resources[relation.type];
        if (!relationResources) return;
        const storeRelation = relationResources[relation.id];
        if (!storeRelation) return;
        newResource[relationshipIdentifier].push({
          id,
          ...storeRelation.attributes
        });
      });
    });

    return newResource;
  });
};
