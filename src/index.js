import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { countrie, countries_with_history } from "./lists";
import StaticSearch from "./components/StaticSearch";
import DynamicSearch from "./components/DynamicSearch";
import HistorySearch from "./components/SearchWithHistory";
ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <div>
        <h2>Static Search</h2>
        <StaticSearch
          placeholder="Ex Australia"
          searchTitle="Countries to search through"
          list_of_items={countrie}
        />
      </div>
      <div>
        <h2>Dynamic Search</h2>
        <DynamicSearch
          placeholder="Ex Australia"
          searchTitle="Countries to search through"
          list_of_items={countrie}
        />
      </div>
      <div>
        <h2>Dynamic Search with History</h2>
        <HistorySearch
          placeholder="Ex Australia"
          searchTitle="Countries to search through"
          list_of_items={countrie}
          history={countries_with_history}
        />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
