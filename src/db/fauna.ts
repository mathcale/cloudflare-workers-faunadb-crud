import faunadb from 'faunadb';
import { customFetch } from '../utils/customFetch';

const faunaClient = new faunadb.Client({
  // @ts-ignore
  secret: FAUNADB_SECRET,
  // @ts-ignore
  fetch: customFetch,
});

export default faunaClient;
export const { query } = faunadb;
