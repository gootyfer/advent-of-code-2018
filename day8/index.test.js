const licenseManager = require('./licenseManager');

describe('license file manager', () => {
  it('parses root from license file', () => {
    const licenseText = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
    const license = licenseText.split(' ').map(n => parseInt(n));
    const root = licenseManager.extractChildren(license);
    expect(root.children).toBe(2);
    expect(root.metadataLength).toBe(3);
    expect(license).toHaveLength(14);
  });

  it('extracts node, if leave returns metadata', () => {
    const licenseText = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
    const license = licenseText.split(' ').map(n => parseInt(n));
    licenseManager.extractChildren(license);
    const child = licenseManager.extractChildren(license);
    expect(child.children).toBe(0);
    expect(child.metadata).toEqual([10, 11, 12]);
    expect(license).toHaveLength(9);
  });
  it('extracts node, if not leave returns the rest', () => {
    const licenseText = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
    const license = licenseText.split(' ').map(n => parseInt(n));
    licenseManager.extractChildren(license);
    licenseManager.extractChildren(license);
    const child2 = licenseManager.extractChildren(license);
    expect(child2.children).toBe(1);
    expect(child2.metadata).toBeUndefined();
    expect(license).toHaveLength(7);
  });
  it('extracts node, if not leave returns the rest', () => {
    const licenseText = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
    const license = licenseText.split(' ').map(n => parseInt(n));
    licenseManager.extractChildren(license);
    licenseManager.extractChildren(license);
    licenseManager.extractChildren(license);
    const child3 = licenseManager.extractChildren(license);
    expect(child3.children).toBe(0);
    expect(child3.metadata).toEqual([99]);
    expect(license).toHaveLength(4);
  });
  it('parses metadata from the complete tree', () => {
    const licenseText = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
    const metadata = licenseManager.parseTree(licenseText);
    expect(metadata).toBe(138);
  });
  it('parses metadata from the complete tree', () => {
    const licenseText = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
    const rootValue = licenseManager.parseTreeWithNodeValue(licenseText);
    expect(rootValue).toBe(66);
  });
});
