"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// -------- GPA Helper --------
const gradeToPoint = (grade: string) => {
  switch (grade) {
    case "A+": return 4.0;
    case "A": return 3.6;
    case "B+": return 3.2;
    case "B": return 2.8;
    case "C+": return 2.4;
    case "C": return 2.0;
    case "D": return 1.6;
    default: return 0;
  }
};

// -------- Compact PDF Styles --------
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 2,
  },
  schoolAddress: {
    fontSize: 7,
    color: '#4b5563',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginVertical: 8,
  },
  termBadge: {
    backgroundColor: '#059669',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: 'bold',
  },
  studentInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f0f9ff',
    borderRadius: 4,
  },
  infoColumn: {
    width: '48%',
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 7,
    color: '#6b7280',
    width: 70,
  },
  infoValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  table: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e40af',
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
  },
  tableCell: {
    padding: 4,
    flex: 1,
    fontSize: 8,
    textAlign: 'center',
  },
  tableCellSubject: {
    padding: 4,
    flex: 2,
    fontSize: 8,
    textAlign: 'left',
  },
  gradeCell: {
    fontWeight: 'bold',
  },
  gradeA: { color: '#059669' },
  gradeB: { color: '#2563eb' },
  gradeC: { color: '#d97706' },
  gradeD: { color: '#dc2626' },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: 10,
    backgroundColor: '#ecfdf5',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 7,
    color: '#6b7280',
  },
  performanceRemarks: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
    fontSize: 8,
    color: '#4b5563',
    lineHeight: 1.3,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  signature: {
    alignItems: 'center',
  },
  signatureLine: {
    width: 100,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    marginTop: 15,
  },
  signatureText: {
    fontSize: 7,
    color: '#4b5563',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 6,
    color: '#9ca3af',
  },
});

// -------- Dynamic PDF Document --------
const TermReport = ({ studentData, filteredGrades, selectedTerm, classTeacherName }: any) => {
  let totalPoints = 0;
  let subjectCount = 0;
  let totalMarks = 0;
  let highestGrade = '';
  let highestSubject = '';
  let passedSubjects = 0;

  const termData = filteredGrades?.map((grade: any) => {
    const term = grade.termGrades?.find((t: any) => t.term === selectedTerm);

    if (!term) return null;

    const point = gradeToPoint(term.grade);
    totalPoints += point;
    totalMarks += term.mark || 0;
    subjectCount++;
    
    if (['A+', 'A', 'B+', 'B', 'C+', 'C'].includes(term.grade)) {
      passedSubjects++;
    }

    if (!highestGrade || gradeToPoint(term.grade) > gradeToPoint(highestGrade)) {
      highestGrade = term.grade;
      highestSubject = grade.course.name;
    }

    return {
      subject: grade.course.name,
      mark: term.mark || 'N/A',
      grade: term.grade,
      remarks: term.remarks || 'N/A',
    };
  }).filter(Boolean);

  const cgpa = subjectCount > 0 ? (totalPoints / subjectCount).toFixed(2) : "0.00";
  const averageMarks = subjectCount > 0 ? (totalMarks / subjectCount).toFixed(1) : "0.0";
  const passPercentage = subjectCount > 0 ? ((passedSubjects / subjectCount) * 100).toFixed(0) : "0";

  const getGradeStyle = (grade: string) => {
    if (grade.startsWith('A')) return styles.gradeA;
    if (grade.startsWith('B')) return styles.gradeB;
    if (grade.startsWith('C')) return styles.gradeC;
    if (grade.startsWith('D')) return styles.gradeD;
    return {};
  };

  const getPerformanceRemarks = (cgpa: string) => {
    const numCgpa = parseFloat(cgpa);
    if (numCgpa >= 3.5) return "Excellent performance! Consistently outstanding work.";
    if (numCgpa >= 3.0) return "Very good performance. Maintain consistent effort.";
    if (numCgpa >= 2.5) return "Good performance. Focus on improvement areas.";
    if (numCgpa >= 2.0) return "Satisfactory. Need to work harder.";
    return "Needs improvement. Seek teacher guidance.";
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const termDisplay = selectedTerm === "First" ? "First" : 
                     selectedTerm === "Second" ? "Second" : 
                     selectedTerm === "Third" ? "Third" : 
                     selectedTerm;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>LUMBINI SECONDARY SCHOOL</Text>
            <Text style={styles.schoolAddress}>Chabahil, Kathmandu, Nepal</Text>
            <Text style={styles.schoolAddress}>Phone: 01-1234567 | Email: lumbini@school.edu.np</Text>
          </View>
          <View style={styles.termBadge}>
            <Text>{termDisplay} TERM REPORT</Text>
          </View>
        </View>

        {/* Report Title */}
        <Text style={styles.reportTitle}>ACADEMIC REPORT CARD</Text>

        {/* Compact Student Information */}
        <View style={styles.studentInfoSection}>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{studentData.student.name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Roll No:</Text>
              <Text style={styles.infoValue}>{studentData.student.rollNumber}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Class:</Text>
              <Text style={styles.infoValue}>{studentData.courses[0].classes.name || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Term:</Text>
              <Text style={styles.infoValue}>{termDisplay} Term</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date:</Text>
              <Text style={styles.infoValue}>{currentDate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Year:</Text>
              <Text style={styles.infoValue}>{new Date().getFullYear()}</Text>
            </View>
          </View>
        </View>

        {/* Academic Performance Table */}
        <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 4, color: '#1e40af' }}>
          SUBJECT PERFORMANCE
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellSubject}>Subject</Text>
            <Text style={styles.tableCell}>Marks</Text>
            <Text style={styles.tableCell}>Grade</Text>
            <Text style={styles.tableCell}>Remarks</Text>
          </View>
          
          {termData.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellSubject}>{item.subject}</Text>
              <Text style={styles.tableCell}>{item.mark}</Text>
              <Text style={[styles.tableCell, styles.gradeCell, getGradeStyle(item.grade)]}>
                {item.grade}
              </Text>
              <Text style={[styles.tableCell, { fontSize: 7 }]}>{item.remarks}</Text>
            </View>
          ))}
        </View>

        {/* Compact Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{cgpa}</Text>
            <Text style={styles.summaryLabel}>CGPA</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{subjectCount}</Text>
            <Text style={styles.summaryLabel}>Subjects</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{averageMarks}</Text>
            <Text style={styles.summaryLabel}>Avg Marks</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>{passPercentage}%</Text>
            <Text style={styles.summaryLabel}>Pass Rate</Text>
          </View>
        </View>

        {/* Compact Performance Remarks */}
        <Text style={styles.performanceRemarks}>
          <Text style={{ fontWeight: 'bold' }}>Remarks: </Text>
          {getPerformanceRemarks(cgpa)} Best performance in {highestSubject} ({highestGrade}).
        </Text>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text style={styles.signatureText}>Class Teacher</Text>
            <View style={styles.signatureLine} />
            <Text style={[styles.signatureText, { fontWeight: 'bold', marginTop: 2 }]}>
              {classTeacherName || "Not Assigned"}
            </Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.signatureText}>Principal</Text>
            <View style={styles.signatureLine} />
            <Text style={[styles.signatureText, { fontWeight: 'bold', marginTop: 2 }]}>
              Prash Lama
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Official Document - Lumbini Secondary School, Chabahil
          </Text>
          <Text style={styles.footerText}>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  );
};

// -------- Main Component with Term Selection --------
const TermReportPDF = ({ studentData, filteredGrades, classTeacherName }: any) => {
  const [selectedTerm, setSelectedTerm] = useState("First");
  
  // Extract available terms from data
  const availableTerms = filteredGrades?.reduce((terms: string[], grade: any) => {
    grade.termGrades?.forEach((term: any) => {
      if (!terms.includes(term.term)) {
        terms.push(term.term);
      }
    });
    return terms;
  }, []) || ["First", "Second", "Third"];

  return (
    <div className="space-y-4">
      {/* Term Selection */}
      <div className="flex items-center gap-4">
        <div className="w-48">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              {availableTerms.map((term: string) => (
                <SelectItem key={term} value={term}>
                  {term} Term Report
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Download Button */}
        <PDFDownloadLink
          document={
            <TermReport
              studentData={studentData}
              filteredGrades={filteredGrades}
              selectedTerm={selectedTerm}
              classTeacherName={classTeacherName}
            />
          }
          fileName={`${studentData?.student?.name}_${selectedTerm}_Term_${new Date().getFullYear()}.pdf`}
        >
          {({ loading, error }) => (
            <Button 
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-md"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : error ? (
                'Error'
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download {selectedTerm} Term Report
                </span>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Preview Info */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
        <p>Generating <span className="font-semibold text-blue-700">{selectedTerm} Term</span> report for:</p>
        <p className="font-medium">{studentData?.student?.name} (Roll No: {studentData?.student?.rollNumber})</p>
        {classTeacherName && (
          <p className="text-xs mt-1">Class Teacher: <span className="font-medium">{classTeacherName}</span></p>
        )}
      </div>
    </div>
  );
};

export default TermReportPDF;