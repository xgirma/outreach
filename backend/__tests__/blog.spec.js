import churchBlog from '../helpers/faker/blog';
import crud from '../helpers/crud';

crud('blog', churchBlog(), churchBlog());
