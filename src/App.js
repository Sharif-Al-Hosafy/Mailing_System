import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import LoginScreen from "./pages/LoginScreen";
import DailyScreen from "./pages/DailyScreen";
import AddScreen from "./pages/AddScreen";
import RegisterScreen from "./pages/RegisterScreen";
import DocViewerScreen from "./pages/DocViewerScreen";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import AuditLogScreen from "./pages/AuditLogScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const weeklyTruncate = async () => {
    await axios.get("api/v1/files/truncate");
    console.log("emptied");
  };

  useEffect(() => {
    weeklyTruncate();
  }, []);
  return (
    <Router>
      {userInfo ? <Header /> : <></>}
      <main>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/daily" element={<DailyScreen />} />
          <Route path="/doc" element={<DocViewerScreen />} />
          <Route path="/add" element={<AddScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/log" element={<AuditLogScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
