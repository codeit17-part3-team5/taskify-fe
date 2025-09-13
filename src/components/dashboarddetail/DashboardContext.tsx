import React, { createContext, useContext } from "react";

interface DashboardContextType {
  dashboardId: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{
  dashboardId: number;
  children: React.ReactNode;
}> = ({ dashboardId, children }) => {
  return (
    <DashboardContext.Provider value={{ dashboardId }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard used within a DashboardProvider");
  }
  return context;
};

// 사용 X
