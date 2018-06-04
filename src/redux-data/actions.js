import jsonApiNormalize from "json-api-normalizer";
import { GraphQLNormalizr } from "graphql-normalizr";

const graphQLNormalizr = new GraphQLNormalizr();
const graphQlNormalize = graphQLNormalizr.normalize;

// TODO: needs refactoring
const dispatchUpdateResourcesByID = (
  dispatch,
  { jsonApiPayload, graphQlPayload }
) => {
  if (jsonApiPayload) {
    _dispatchAddOrReplaceAllJsonApiResources(
      dispatch,
      jsonApiNormalize(jsonApiPayload)
    );
  }
  if (graphQlPayload) {
    // GraphQL adapter
    // TODO write the code that will normalize the graphql payload into our store
    _dispatchAddOrReplaceAllGraphQlResources(
      dispatch,
      "checklists",
      graphQlNormalize(graphQlPayload)
    );
  }
};

const _dispatchAddOrReplaceAllJsonApiResources = (
  dispatch,
  normalizedResources
) => {
  Object.entries(normalizedResources).forEach(([resourceType, resources]) => {
    Object.entries(
      resources
    ).forEach(([id, { type, attributes, links, relationships }]) => {
      dispatch({
        type: "ADD_OR_REPLACE_RESOURCE_BY_ID",
        resourceType,
        id,
        attributes,
        links,
        relationships
      });
    });
  });
};

// TODO: this is not quite done parsing the graphql
const _dispatchAddOrReplaceAllGraphQlResources = (
  dispatch,
  type,
  normalizedResources
) => {
  Object.entries(normalizedResources).forEach(([resourceType, resources]) => {
    Object.entries(resources).forEach(([id, resource]) => {
      dispatch({
        type: "ADD_OR_REPLACE_RESOURCE_BY_ID",
        resourceType,
        id,
        attributes: resource,
        links: null,
        relationships: _buildRelationships(resourceType, resource)
      });
    });
  });
};

const _buildRelationships = (type, resource) => {
  return Object.entries(resource).reduce((newObject, [key, value]) => {
    if (value && Array.isArray(value)) {
      if (!newObject[key]) {
        newObject[key] = { data: [] };
      }

      newObject[key].data = value.map(id => ({ type: key, id }));
    }

    if (value && typeof value === "object") {
      // TODO: handle hasOne and belongsTo
    }
    return newObject;
  }, {});
};

export { dispatchUpdateResourcesByID };
