export const loadJournal = () => {
  const json = window.localStorage.getItem("ICHING_USER_JOURNAL");
  const journal = JSON.parse(json || '{ "entries": [] }');
  return journal;
};

export const saveJournal = (journal) => {
  const json = JSON.stringify(journal);
  window.localStorage.setItem("ICHING_USER_JOURNAL", json);
};

export const saveEntry = (entry) => {
  const journal = loadJournal();
  journal.entries = [entry, ...journal.entries];
  saveJournal(journal);
};

export const findEntry = (sessionTimestamp, journal) => {
  return journal.entries.find(
    (entry) => entry.sessionTimestamp === sessionTimestamp
  );
};

export const updateEntry = (entry) => {
  const journal = loadJournal();
  const index = journal.entries.findIndex(
    (item) => item.sessionTimestamp === entry.sessionTimestamp
  );
  journal.entries = [
    ...journal.entries.slice(0, index),
    entry,
    ...journal.entries.slice(index + 1),
  ];
  saveJournal(journal);
};
