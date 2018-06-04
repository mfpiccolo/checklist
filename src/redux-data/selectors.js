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

export { selectResources };
