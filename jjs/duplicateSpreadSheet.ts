interface spreadsheet {
  author: string;
  cells: number;
  metadata: {
    title: string;
  };
  hasPendingChanges: boolean;
}

function duplicateSpreadsheet(original: spreadsheet) {
  if (original.hasPendingChanges) {
    throw new Error("You need to save the file before you can duplicate it.");
  }

  const copy = JSON.parse(
    JSON.stringify({
      created: Date.now(),
      ...original,
    })
  );

  copy.metadata.title = "Copy of " + original.metadata.title;
  return copy;
}

const original_obj: spreadsheet = {
  author: "Eduardo",
  cells: 200,
  metadata: {
    title: "Awesome title!",
  },
  hasPendingChanges: false,
};

let copy_obj = duplicateSpreadsheet(original_obj);

console.log("Original -->", original_obj);
console.log("Copy -->", copy_obj);
