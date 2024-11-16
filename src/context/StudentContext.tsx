// context/StudentContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface StudentContextType {
  studentId: string | null;
  setStudentId: (id: string | null) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [studentId, setStudentId] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
          return localStorage.getItem('studentId') || null; // Get from localStorage
        }
        return null;
      });

      useEffect(() => {
        if (studentId) {
          localStorage.setItem('studentId', studentId); // Store in localStorage
        } else {
          localStorage.removeItem('studentId'); // Remove if studentId is null
        }
      }, [studentId]);
      
  return (
    <StudentContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
