import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Header } from "../src/components/Header";
import { PageTitle } from "./components/PageTitle";
import { TaskList } from "./components/TaskList";
import { TaskDetail } from "./components/TaskDetail";
import { Footer } from "./components/Footer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
);

function MainPage() {
  return (
    <div>
      <Header />
      <PageTitle />
      <div style={{ display: "flex", gap: "30px" }}>
        <TaskList />
        <TaskDetail />
      </div>
      <Footer />
    </div>
  );
}
