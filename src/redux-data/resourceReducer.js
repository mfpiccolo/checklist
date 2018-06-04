const initialState = {
  loading: false,
  checklists: {},
  error: null
};

export default function resources(state = initialState, action) {
  switch (action.type) {
    case "ADD_OR_REPLACE_RESOURCE_BY_ID":
      newState = { ...state };
      const {
        type,
        spec,
        resourceType,
        id,
        attributes,
        links,
        relationships
      } = action;

      _initializeResource(newState, resourceType);

      newState[resourceType][id] = { id, attributes, links, relationships };

      return newState;
    case "BULK_REPLACE_RESOURCE":
      return { ...state };
    default:
      return state;
  }
}

const _initializeResource = (newState, resourceType) => {
  if (resourceType in newState) return;
  newState[resourceType] = {};
};
