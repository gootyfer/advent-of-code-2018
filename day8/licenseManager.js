const extractChildren = rest => {
  const children = rest.splice(0, 1)[0];
  const metadataLength = rest.splice(0, 1)[0];
  let metadata;
  if (children === 0) {
    metadata = rest.splice(0, metadataLength);
  }
  return {
    children,
    metadataLength,
    metadata,
  };
};

const checkParentHasMoreChildren = (level, metadata, license) => {
  const parentLevel = level[level.length - 1];
  parentLevel.children -= 1;
  if (parentLevel.children === 0) {
    metadata.push(license.splice(0, parentLevel.metadataLength));
    level.splice(level.length - 1, 1);
    return true;
  }
  return false;
};

const sum = (a, b) => a + b;

const parseTree = licenseText => {
  const license = licenseText.split(' ').map(n => parseInt(n));
  const level = [];
  const metadata = [];

  while (license.length > 0) {
    const data = extractChildren(license);
    if (data.children === 0) {
      metadata.push(data.metadata);
      while (
        checkParentHasMoreChildren(level, metadata, license) &&
        license.length > 0
      );
    } else {
      level.push(data);
    }
  }
  return metadata.flat().reduce(sum);
};

const calculateNodeValue = (metadata, childrenData) => {
  return metadata.map(i => childrenData[i - 1] || 0).reduce(sum);
};

const updateParentInfo = (level, license, childData) => {
  const parentLevel = level[level.length - 1];
  parentLevel.children -= 1;

  if (!parentLevel.childrenData) parentLevel.childrenData = [childData];
  else parentLevel.childrenData.push(childData);
  if (parentLevel.children === 0) {
    const parentMetadata = license.splice(0, parentLevel.metadataLength);
    const childrenData = parentLevel.childrenData;
    level.splice(level.length - 1, 1);

    return calculateNodeValue(parentMetadata, childrenData);
  }
  return null;
};

const parseTreeWithNodeValue = licenseText => {
  const license = licenseText.split(' ').map(n => parseInt(n));
  const level = [];
  let childData;

  while (license.length > 0) {
    const data = extractChildren(license);
    if (data.children === 0) {
      childData = data.metadata.reduce(sum);
      while (childData !== null && license.length > 0) {
        childData = updateParentInfo(level, license, childData);
      }
    } else {
      level.push(data);
    }
  }
  return childData;
};

module.exports = {
  parseTree,
  extractChildren,
  parseTreeWithNodeValue,
};
