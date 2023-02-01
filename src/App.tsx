import React from 'react';
import RouteProvider from './routes/routes';
import BookFormContextProvider from "./context/BookFormContext";
import DocumentaryFormContextProvider from "./context/DocumentaryFormContext";
import NewspaperFormContextProvider from "./context/NewspaperFormContext";

function App() {
  return (
    <BookFormContextProvider>
      <DocumentaryFormContextProvider>
        <NewspaperFormContextProvider>
          <RouteProvider />
        </NewspaperFormContextProvider>
      </DocumentaryFormContextProvider>
    </BookFormContextProvider>
  );
}

export default App;
