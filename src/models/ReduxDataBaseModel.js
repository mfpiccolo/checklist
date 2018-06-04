import pluralize from "pluralize";

export default class BaseQuery {
  static setResources(resources) {
    return new QueryObject(pluralize(this.name.toLowerCase()), resources);
  }
}

class QueryObject {
  constructor(resourceName, resources) {
    this.resourceName = resourceName;
    this.resources = resources;
    this.currentResources = [];
    this.currentResourcesIds = [];
  }

  all() {
    this.currentResources = this.resources[this.resourceName];
    if (!this.currentResources) return;
    this.currentResourcesIds = Object.entries(this.currentResources).map(
      ([id]) => id
    );
    return this;
  }

  find() {}

  where(params) {
    // TODO: needs to return a query object
  }

  includes(relations) {
    return Object.entries(this.currentResources).map(([id, resource]) => {
      const newResource = { id, ...resource.attributes };
      if (!relations) return newResource;
      relations.forEach(relationshipType => {
        newResource[relationshipType] = [];
        relationshipData = resource.relationships[relationshipType].data;
        relationshipData.forEach(relation => {
          if (!this.currentResourcesIds.includes(relation.id));

          const relationshipResources = this.resources[relation.type];
          if (!relationshipResources) return;

          const storeRelation = relationshipResources[relation.id];
          if (!storeRelation) return;
          newResource[relationshipType].push({
            id,
            ...storeRelation.attributes
          });
        });
      });
      return newResource;
    });
  }

  execute() {
    // TODO stays lazy until this is called
  }
}
