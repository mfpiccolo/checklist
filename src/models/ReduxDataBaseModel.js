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
    this.currentIncludes = [];
    this.currentResources = {};
    this.currentResourcesIds = [];
  }

  all() {
    this._setCurrentResources();
    return this;
  }

  find(id) {
    return (
      this.resources[this.resourceName] && this.resources[this.resourceName][id]
    );
  }

  where(params) {
    this._setCurrentResources();
    this._filterAndSetCurrentResourcesByParams(params);
    this._setCurrentResourcesIds();
    return this;
  }

  includes(relationshipTypes) {
    this._setCurrentResources();
    this.currentIncludes = relationshipTypes; //['tasks']
    return this;
  }

  _flattenRelationships(relationships) {
    // {tasks: {data:[]}}
    return Object.values(
      relationships
    ).reduce((nextRelationships, { data }) => {
      return [...nextRelationships, ...data];
    }, []);
  }

  // convert into nested structure
  // itterate through and convert it into an array with a nested relationships
  execute() {
    const { currentIncludes, currentResources, _flattenRelationships } = this;
    return Object.values(
      this.currentResources
    ).map(({ id, attributes, relationships, types, links }) => {
      const newFormattedResource = { id, ...attributes };
      if (!currentIncludes.length) return newFormattedResource;
      return {
        ...newFormattedResource,
        ..._flattenRelationships(
          relationships
        ).reduce((nextRelationshipObjects, { id, type }) => {
          if (!currentIncludes.includes(type)) return nextRelationshipObjects;
          if (!(type in nextRelationshipObjects)) {
            nextRelationshipObjects[type] = [];
          }

          if (!this.resources[type]) return nextRelationshipObjects;
          const relationData = this.resources[type][id];
          if (!relationData) return nextRelationshipObjects;
          nextRelationshipObjects[type].push({
            type,
            id,
            ...relationData.attributes
          });

          return nextRelationshipObjects;
        }, {})
      };
    });
  }

  // Private

  _setCurrentResources() {
    if (!this.currentResources[0]) {
      this.currentResources = this.resources[this.resourceName];
      this._setCurrentResourcesIds();
    }
  }

  _setCurrentResourcesIds() {
    this.currentResourcesIds = Object.entries(this.currentResources).map(
      ([id]) => id
    );
  }

  _filterAndSetCurrentResourcesByParams(params) {
    const resourcesByID = Object.entries(
      this.currentResources
    ).reduce((newResource, [id, resource]) => {
      this._filterResourceByParams(params, newResource, resource, id);
      return newResource;
    }, {});
    this.currentResources = resourcesByID;
  }

  _filterResourceByParams(params, newResource, resource, id) {
    Object.entries(params).forEach(([key, value]) => {
      if (resource.attributes[key] === value) {
        newResource[id] = { id, ...resource.attributes, type: resource.type };
      }
    });
  }
}
