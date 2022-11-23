import React from "react";
import { useAppSelector } from "./hooks/redux-hooks";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { ChoisePage } from "./components/ChoisePage/ChoisePage";
import { Cloud } from "./components/Cloud/Cloud";
import { GamePage } from "./components/GamePage/GamePage";

function App() {
  const { status } = useAppSelector((state) => state.start);
  const { currentQuestion } = useAppSelector((state) => state.question);
  return (
    <div className="App">
      {status === "welcome" && <WelcomePage />}
      {status === "choice" && <ChoisePage />}
      {(status === "welcome" || status === "choice") && <Cloud />}
      {status === "game" && <GamePage />}
    </div>
  );
}

export default App;
