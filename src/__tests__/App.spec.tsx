import * as React from "react";
import { App } from "../App";
import { render, fireEvent, act } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { createDumbStorage } from "../notesStorage";

const testData = [
  {
    id: "thisIsKyiv",
    name: "Kyiv",
    date: "15.08.2002",
    favouriteDish: { name: "Borshch" },
    grades: [9.8, 9.1, 6.5]
  },
  {
    id: "riga",
    name: "Riga",
    date: "01.02.2012",
    favouriteDish: { name: "Auksta supa" },
    grades: [8.8, 9.0, 7.1, 5.5]
  }
];

describe("App", () => {
  const storage = createDumbStorage([]);

  const getApp = () => {
    const { container } = render(<App />);

    return {
      getContainer: () => container,
      getKeyWordFilter: () =>
        container.querySelector('[data-test="keyword-input"]'),
      getOrderSelector: () =>
        container.querySelector('[data-test="order-selector"]'),
      getItemsList: () => container.querySelectorAll('[data-test="list-item"]')
    };
  };

  beforeAll(() => {
    window.NotesStorage = storage;
  });

  beforeEach(() => {
    storage.__modifyStorage([]);
  });

  describe("Base elements", () => {
    it("should render list container and filters", () => {
      const app = getApp();
      const list = app.getContainer().querySelector('[data-test="notes-list"]');
      const keywordFilter = app.getKeyWordFilter();
      const orderSelector = app.getOrderSelector();

      expect(list).toBeTruthy();
      expect(keywordFilter).toBeTruthy();
      expect(orderSelector).toBeTruthy();
    });

    it("should render list items", () => {
      storage.__modifyStorage(testData);
      const app = getApp();

      expect(app.getItemsList()).toHaveLength(testData.length);
    });

    it("should update list items with the new element", () => {
      storage.__modifyStorage(testData);
      const app = getApp();

      const storageData = storage.__getData();
      act(() => {
        storage.__modifyStorage([
          ...storageData,
          {
            id: "newVegas",
            name: "New Vegas",
            date: "01.02.2281",
            favouriteDish: { name: "Roasted Radroach" },
            grades: [3, 1, 2.5, 3.5]
          }
        ]);
      });

      expect(app.getItemsList()).toHaveLength(testData.length + 1);
    });

    it("should modify list items on storage update", () => {
      storage.__modifyStorage(testData);
      getApp();

      const storageData = storage.__getData();
      const cityToModify = storageData[0];
      act(() => {
        storageData[0] = {
          ...cityToModify,
          date: "01.01.2022",
          favouriteDish: {
            name: "Chicken Kyiv"
          }
        };
        storage.__modifyStorage(storageData);
      });

      const modifiedRow = screen.getByText(cityToModify.name).parentElement;
      expect(modifiedRow?.innerHTML).toContain("Chicken Kyiv");
      expect(modifiedRow?.innerHTML).toContain("01.01.2022");
    });

    it("should render rounded to two decimals average", () => {
      storage.__modifyStorage([
        {
          id: "hoho",
          name: "NorthPole",
          date: "01.01.0000",
          favouriteDish: { name: "Snow" },
          grades: [10, 8, 8, 6]
        }
      ]);
      const app = getApp();

      expect(
        (app.getItemsList()[0].lastChild as HTMLDivElement).innerHTML
      ).toEqual("8.00");
    });
  });

  describe("Error boundary", () => {
    it("should display wrong data placeholder if list item failed to render", () => {
      storage.__modifyStorage([
        {
          id: "1",
          date: "11/11/1111",
          name: "Lutsk",
          favouriteDish: {
            name: "Potato"
          },
          grades: () => {}
        } as any
      ]);

      const app = getApp();
      const wrongItems = app
        .getContainer()
        .querySelectorAll('[data-test="wrong-item"]');

      expect(wrongItems).toHaveLength(1);
    });
  });

  describe("Keyword filter", () => {
    it("should filter by keyword", () => {
      storage.__modifyStorage([
        ...testData,
        {
          id: "rio",
          name: "Rio",
          date: "11.03.2222",
          favouriteDish: { name: "Coconut" },
          grades: [10]
        }
      ]);
      const app = getApp();
      const filterValue = "Ri";

      const keywordFilter = app.getKeyWordFilter();

      fireEvent.change(keywordFilter as HTMLInputElement, {
        target: { value: filterValue }
      });

      const listItems = app.getItemsList();

      expect(listItems).toHaveLength(2);
      listItems.forEach((item) => {
        expect(item.innerHTML).toContain(filterValue);
      });
    });

    it("should ignore case for keyword filter", () => {
      storage.__modifyStorage(testData);
      const app = getApp();

      const keywordFilter = app.getKeyWordFilter();

      fireEvent.change(keywordFilter as HTMLInputElement, {
        target: { value: "ri" }
      });

      const listItems = app.getItemsList();

      expect(listItems).toHaveLength(1);
      expect(listItems[0].innerHTML).toContain("Riga");
    });

    it("should filter out all values", () => {
      storage.__modifyStorage(testData);
      const app = getApp();

      const keywordFilter = app.getKeyWordFilter();

      fireEvent.change(keywordFilter as HTMLInputElement, {
        target: { value: "xxxx" }
      });

      expect(app.getItemsList()).toHaveLength(0);
    });
  });

  describe("Order select", () => {
    const gradesTestData = [
      {
        id: "paris",
        name: "Paris",
        date: "01.01.1999",
        favouriteDish: { name: "Baguet" },
        grades: [8, 8, 8]
      },
      {
        id: "rome",
        name: "Rome",
        date: "01.01.1999",
        favouriteDish: { name: "Pasta" },
        grades: [10, 9, 8, 10]
      },
      {
        id: "reykjavik",
        name: "Reykjavik",
        date: "01.01.1999",
        favouriteDish: { name: "Surstromming" },
        grades: [1, 2]
      }
    ];

    it("should reorder list by ascending average grade", () => {
      storage.__modifyStorage(gradesTestData);
      const app = getApp();
      const orderSelector = app.getOrderSelector();

      fireEvent.change(orderSelector as HTMLSelectElement, {
        target: { value: "asc" }
      });

      const listItems = app.getItemsList();
      const cities = Array.from(listItems).map(
        (element) => (element.firstChild as HTMLDivElement).innerHTML
      );

      expect(cities).toEqual(["Reykjavik", "Paris", "Rome"]);
    });

    it("should reorder list by descending average grade", () => {
      storage.__modifyStorage(gradesTestData);
      const app = getApp();
      const orderSelector = app.getOrderSelector();

      fireEvent.change(orderSelector as HTMLSelectElement, {
        target: { value: "desc" }
      });
      fireEvent.change(orderSelector as HTMLSelectElement, {
        target: { value: "asc" }
      });
      fireEvent.change(orderSelector as HTMLSelectElement, {
        target: { value: "desc" }
      });

      const listItems = app.getItemsList();
      const cities = Array.from(listItems).map(
        (element) => (element.firstChild as HTMLDivElement).innerHTML
      );

      expect(cities).toEqual(["Rome", "Paris", "Reykjavik"]);
    });
  });
});
