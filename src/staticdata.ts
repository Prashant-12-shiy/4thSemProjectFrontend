export const features = [
  {
    title: "Comprehensive Student Profiles",
    description:
      "Keep track of academic records, personal information, and achievements all in one place.",
    image: "/profile.png",
  },
  {
    title: "Attendance Tracking",
    description:
      "Simplify attendance management with automated tracking and reporting.",
    image: "/attendance.png",
  },
  {
    title: "Grade Management",
    description:
      "Effortlessly manage grades, assignments, and progress reports to provide timely feedback.",
    image: "/grade.png",
  },
  {
    title: "Teacher & Student Portals",
    description:
      "Enhance communication through dedicated portals that keep everyone informed and engaged.",
    image: "/protal.png",
  },
  {
    title: "Class Scheduling",
    description:
      "Create and manage class schedules that work for everyone with our intuitive scheduling tool.",
    image: "/class.png",
  },
  {
    title: "Secure Data Management",
    description:
      "Ensure that all student data is securely stored and easily accessible to authorized users.",
    image: "/secure.png",
  },
];

export const pricings = [
  {
    title: "Basic Plan",
    capacity: "Up to 100 Students",
    subtitle: "Core Features:",
    features: [
      "Student Profiles",
      "Attendance Tracking",
      "Basic Grade Management",
      "Parent & Student Portals",
    ],
    price: "Rs 1500/Month",
  },
  {
    title: "Standard Plan",
    capacity: "Up to 500 Students",
    subtitle: "Everything in Basic Plan, Plus:",
    features: [
      " Advanced Grade Management",
      "Class Scheduling Tools",
      "Performance Analytics",
      "Customizable Reports",
    ],
    price: "Rs 4500/Month",
  },
  {
    title: "Premium Plan",
    capacity: "Unlimited Students",
    subtitle: "Everything in Standard Plan, Plus:",
    features: [
      " Resource Management",
      "Integrated Messaging System",
      " Dedicated Account Manager",
      " 24/7 Phone Support",
    ],
    price: "Rs 10000/Month",
  },
];

//SuperAdmin Teacher datta
export const teachers = [
  {
    name: "John Doe",
    status: "Active",
    subject: "Mathematics",
    classTeacher: "Class 10A",
  },
  {
    name: "Jane Smith",
    status: "Inactive",
    subject: "English",
    classTeacher: "Class 9B",
  },
  {
    name: "Alice Johnson",
    status: "Active",
    subject: "Science",
    classTeacher: "Class 11C",
  },
  {
    name: "Robert Brown",
    status: "Active",
    subject: "History",
    classTeacher: "Class 12A",
  },
  {
    name: "John Doe",
    status: "Active",
    subject: "Mathematics",
    classTeacher: "Class 10A",
  },
  {
    name: "Jane Smith",
    status: "Inactive",
    subject: "English",
    classTeacher: "Class 9B",
  },
  {
    name: "Alice Johnson",
    status: "Active",
    subject: "Science",
    classTeacher: "Class 11C",
  },
  {
    name: "Robert Brown",
    status: "Active",
    subject: "History",
    classTeacher: "Class 12A",
  },
  {
    name: "John Doe",
    status: "Active",
    subject: "Mathematics",
    classTeacher: "Class 10A",
  },
  {
    name: "Jane Smith",
    status: "Inactive",
    subject: "English",
    classTeacher: "Class 9B",
  },
  {
    name: "Alice Johnson",
    status: "Active",
    subject: "Science",
    classTeacher: "Class 11C",
  },
  {
    name: "Robert Brown",
    status: "Active",
    subject: "History",
    classTeacher: "Class 12A",
  },
];

//Course data
export const courses = [
  {
    name: "Mathematics",
    code: "MATH101",
    description:
      "An introductory course on basic mathematical concepts and principles.",
    teacher: "John Doe",
    credits: 3,
    classes: "7",
  },
  {
    name: "Physics",
    code: "PHYS201",
    description:
      "Fundamentals of classical mechanics, thermodynamics, and waves.",
    teacher: "Jane Smith",
    credits: 4,
    classes: "8",
  },
  {
    name: "Chemistry",
    code: "CHEM101",
    description:
      "Basic concepts in chemistry including atomic structure and chemical reactions.",
    teacher: "Alice Johnson",
    credits: 3,
    classes: "9",
  },
  {
    name: "Biology",
    code: "BIO101",
    description:
      "Introduction to biological systems, cellular structures, and genetics.",
    teacher: "Robert Brown",
    credits: 3,
    classes: "9C",
  },
  {
    name: "English Literature",
    code: "ENG101",
    description:
      "A study of English literature, focusing on major works and authors.",
    teacher: "Not Assigned", // No assigned teacher yet
    credits: 2,
    classes: "8B",
  },
];

export const classes = [
  {
    name: 5,
  },
  {
    name: 6,
  },
  {
    name: 7,
  },
  {
    name: 8,
  },
  {
    name: 9,
  },
  {
    name: 10,
  },
];

//Teacher Dashboard
export const scheduleData = [
  {
    sn: 1,
    class: "Grade 5",
    time: "9:00 - 9:40",
    task: "Math worksheet on fractions",
  },
  {
    sn: 2,
    class: "Grade 6",
    time: "9:45 - 10:25",
    task: "Read chapter 3 of English textbook",
  },
  {
    sn: 3,
    class: "Grade 7",
    time: "10:30 - 11:10",
    task: "Science experiment preparation",
  },
  { sn: 4, class: "Break", time: "11:10 - 11:30", task: "" },
  {
    sn: 5,
    class: "Grade 8",
    time: "11:30 - 12:10",
    task: "History essay on ancient civilizations",
  },
  { sn: 6, class: "Leisure", time: "12:15 - 12:45", task: "" },
  {
    sn: 7,
    class: "Grade 9",
    time: "12:50 - 1:30",
    task: "Geography map exercise",
  },
  {
    sn: 8,
    class: "Grade 10",
    time: "1:35 - 2:15",
    task: "Physical Education fitness journal",
  },
];

//Classes

export const classes2 = [
  {
    name: "1",
    teacherInCharge: {
      name: "Teacher A",
    },
  },
  {
    name: "2",
    teacherInCharge: {
      name: "Teacher B",
    },
  },
  {
    name: "3",
    teacherInCharge: {
      name: "Teacher C",
    },
  },
  {
    name: "4",
    teacherInCharge: {
      name: "Teacher D",
    },
  },
  {
    name: "5",
    teacherInCharge: {
      name: "Teacher E",
    },
  },
  {
    name: "6",
    teacherInCharge: {
      name: "Teacher F",
    },
  },
  {
    name: "7",
    teacherInCharge: null,
  },
  {
    name: "8",
    teacherInCharge: {
      name: "Teacher G",
    },
  },
  {
    name: "9",
    teacherInCharge: {
      name: "Teacher H",
    },
  },
  {
    name: "10",
    teacherInCharge: {
      name: "Teacher I",
    },
  },
];
