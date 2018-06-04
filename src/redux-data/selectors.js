const selectResources = ({ resources }, { type, include }) => {
  return Object.entries(resources[type]).map(([id, resource]) => {
    const newResource = { id, ...resource.attributes };
    if (!include) return newResource;
    include.forEach(relationshipType => {
      newResource[relationshipType] = [];
      relationshipData = resource.relationships[relationshipType].data;
      relationshipData.forEach(relation => {
        const relationResources = resources[relation.type];
        if (!relationResources) return;
        const storeRelation = relationResources[relation.id];
        if (!storeRelation) return;
        newResource[relationshipType].push({
          id,
          ...storeRelation.attributes
        });
      });
    });

    return newResource;
  });
};

export { selectResources };
