/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
const buildSort = (sort: string, order: number = 1) => {
  const sortBy: any = {};
  sortBy[sort] = order;
  return sortBy;
};

export default buildSort;
