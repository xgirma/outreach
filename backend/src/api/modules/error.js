const resourceNotFound = new Error(`The origin server did not find a current representation
for the target resource or is not willing to disclose that one exists.`);
resourceNotFound.name = 'resourceNotFound';

export { resourceNotFound };
