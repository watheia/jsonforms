const usedIds: Set<string> = new Set<string>();

export const createId = (proposedId: string) => {
  if (proposedId === undefined) {
    // failsafe to avoid endless loops in error cases
    proposedId = 'undefined';
  }
  let tries = 0;
  while (!isUniqueId(proposedId, tries)) {
    tries++;
  }
  const newID = makeId(proposedId, tries);
  usedIds.add(newID);
  return newID;
};

export const removeId = (id: string) => usedIds.delete(id);

const isUniqueId = (idBase: string, iteration: number) => {
  const newID = makeId(idBase, iteration);
  return !usedIds.has(newID);
};

const makeId = (idBase: string, iteration: number) => iteration <= 1 ? idBase : idBase + iteration;

export const clearAllIds = () => usedIds.clear();
