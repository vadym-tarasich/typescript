import "./styles.css";
import { Filters } from "./filters/Filters";
import { List } from "./list/List";
import { ListFilters, ListRecord } from "./types";
import * as React from "react";

/**
 * Bob loves to travel around the world and eat local food.
 * He also has a passion to make short notes and grades
 * for every city he has visited and food he tried there.
 *
 * Usually, he makes a note with a city *name*,
 * the *date* when he's been there last time,
 * his *favourite dish* he ate there,
 * and the list of *grades*: simple marks 1-10 for every dish he ate in that city.
 *
 * Help Bob to implement an app to display the list of the Cities,
 * fauvorite dish there and the *average grade* for food in the city.
 * The app needs to have a filter by city name
 * and the possibility to change the display order by the average grade.
 * Sometimes Bob visits the city multiple times, so keep your list updated ;)
 *
 * All data is stored in the window.NotesStorage.ts
 * You can subscribe to the updates using NotesStorage.subscribe() method (example below)
 * it returns the function that need to be called to unsubscribe from the updates.
 *
 * Beware, that Bob loves to enjoy his food so much,
 * that sometimes makes his notes in hurry to come to the airport in time.
 * That's why some data about the city may be incorrect.
 *
 * PS. Please keep all pre-set data-attributes on components, so tests can pass
 */

const getAvg = (arr: number[]) => {
  return arr.length ? arr.reduce((a, e) => (a += e), 0) / arr.length : 0;
};

export const App: React.FC = () => {
  const [notes, setNotes] = React.useState<ListRecord[]>([]);
  const [filters, setFilters] = React.useState<ListFilters>({
    order: "asc",
    keyword: ""
  });

  React.useEffect(() => {
    return window.NotesStorage?.subscribe((data) => {
      setNotes(data);
      console.log(">>>", data);
    });
  }, []);

  const filteredData = notes
    .sort((a, b) => {
      const diff = getAvg(a.grades) - getAvg(b.grades);

      return filters.order === "asc" ? diff : -diff;
    })
    .filter((data) => data.name.toLowerCase().includes(filters.keyword.toLowerCase()));

  return (
    <div className="App">
      <h1>Bob's list</h1>
      <Filters onChange={setFilters} />
      <List data={filteredData} filters={filters} />
    </div>
  );
};
