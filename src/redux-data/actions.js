import normalize from "json-api-normalizer";

const dispatchUpdateResourcesByID = (
  dispatch,
  { jsonApiPayload, graphQlPayload }
) => {
  if (jsonApiPayload) {
    // JsonApi adapter
    const normalizedResources = normalize(jsonApiPayload);
    Object.entries(
      normalizedResources
    ).forEach(([resourceIdentifier, resources]) => {
      Object.entries(
        resources
      ).forEach(([id, { type, attributes, links, relationships }]) => {
        dispatch({
          type: "ADD_OR_REPLACE_RESOURCE_BY_ID",
          spec: "jsonApi",
          resourceType: type,
          id,
          attributes,
          links,
          relationships
        });
      });
    });
  } else if (graphQlPayload) {
    // GraphQL adapter
    // TODO write the code that will normalize the graphql payload into our store
  }
};

export { dispatchUpdateResourcesByID };
