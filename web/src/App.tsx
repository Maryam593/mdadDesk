import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ReportPage } from "@/pages/ReportPage";
import { CoordinatorPage } from "@/pages/CoordinatorPage";
import { AgencyPage } from "@/pages/AgencyPage";
import { LoginPage } from "@/pages/LoginPage";
import { TrackPage } from "@/pages/TrackPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<ReportPage />} />
          <Route path="/coordinator" element={<CoordinatorPage />} />
          <Route path="/agency" element={<AgencyPage />} />
          <Route path="/track/:reportId" element={<TrackPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
