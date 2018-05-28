/* eslint-disable no-underscore-dangle */
import createApiSpec from '../../../../helpers/apiSpecs';
import churchBlog from '../../../../helpers/faker.blog';
import { Blog } from './blog.model';

const newResource = churchBlog();
newResource._id = 1000;
const params = {
  id: newResource._id,
};
const updateResource = churchBlog();
updateResource._id = 1000;

createApiSpec(Blog, 'blog', newResource, params, updateResource);
