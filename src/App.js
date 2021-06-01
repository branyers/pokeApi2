import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideTypes } from "./Contexts/TypesContext";
import { AuthProvider } from "./Contexts/AuthContext";
import PokemonInfo from "./components/PokemonInfo";
import Login from "./components/Login";
import TypesContainer from "./components/TypesContainer";
import NameOrIdContainer from "./components/NameOrIdContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchBox from "./components/SearchBox";
import RandomButton from "./components/RandomButton";
import "./App.css";
import Encounters from "./components/Encounters";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProvideTypes>
          <Router>
            <Switch>
              <ProtectedRoute path="/pokedex/pokemon/:id/encounters">
                <Encounters />
              </ProtectedRoute>
              <ProtectedRoute path="/pokedex/pokemon/:id">
                <PokemonInfo />
              </ProtectedRoute>
              <Route path="/pokedex/search-pokemon/:pokemon">
                <NameOrIdContainer />
              </Route>
              <Route exact path="/pokedex/search-types/:types">
                <TypesContainer />
              </Route>
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/">
                <SearchBox />
              </ProtectedRoute>
            </Switch>
          </Router>
        </ProvideTypes>
      </AuthProvider>
    </div>
  );
}

export default App;
