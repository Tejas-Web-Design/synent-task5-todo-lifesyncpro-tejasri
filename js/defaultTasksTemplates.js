// ======================================
// LifeSync Pro - Default Profession Tasks
// ======================================

export const templates = {

  Student: [
    "Wake Up",
    "Morning Exercise",
    "Breakfast",
    "Attend College Classes",
    "Study Java",
    "Practice DSA",
    "Work On Project",
    "Complete Assignment",
    "Read Notes",
    "Revision",
    "Dinner",
    "Sleep"
  ],

  Developer: [
    "Check Emails",
    "Daily Standup Meeting",
    "Requirement Analysis",
    "Design Wireframes",
    "Frontend Development",
    "Backend Development",
    "API Integration",
    "Code Review",
    "Testing & Debugging",
    "Update Documentation",
    "Learn New Technology",
    "Plan Tomorrow Tasks"
  ],

  Homemaker: [
    "Prepare Breakfast",
    "Clean House",
    "Laundry",
    "Water Plants",
    "Prepare Lunch",
    "Grocery Shopping",
    "Family Time",
    "Cooking Dinner",
    "Organize Home",
    "Personal Relaxation"
  ],

  "Bank Employee": [
    "Morning Reports",
    "Customer Queries",
    "Account Verification",
    "Loan Documentation",
    "Cash Counter Review",
    "Team Meeting",
    "Update Records",
    "Compliance Check",
    "End Of Day Report"
  ],

  Vendor: [
    "Check Inventory",
    "Purchase Stock",
    "Open Shop",
    "Customer Orders",
    "Supplier Follow Up",
    "Update Prices",
    "Sales Tracking",
    "Expense Recording",
    "Close Shop"
  ],

  Teacher: [
    "Prepare Lesson Plan",
    "Conduct Classes",
    "Attendance Tracking",
    "Assignment Review",
    "Student Doubts",
    "Parent Communication",
    "Prepare Notes",
    "Evaluate Tests"
  ],

  Freelancer: [
    "Check Client Messages",
    "Project Planning",
    "Design Work",
    "Development Work",
    "Client Meeting",
    "Submit Deliverables",
    "Invoice Update",
    "Skill Improvement",
    "Portfolio Update"
  ],

  Manager: [
    "Review Team Progress",
    "Daily Standup",
    "Client Meeting",
    "Resource Planning",
    "Project Tracking",
    "Budget Review",
    "Performance Monitoring",
    "Documentation",
    "Strategic Planning"
  ]

};


// ======================================
// Generate Default Tasks
// ======================================

export function generateDefaultTasks(profession) {

    const professionTasks =
        templates[profession] || [];

    return professionTasks.map((task, index) => ({

        id: Date.now() + index,

        title: task,

        priority: "Medium",

        status: "pending",

        completed: false,

        createdAt:
            new Date().toISOString()

    }));

}

// ======================================
// Supported Professions
// ======================================

export const professions = Object.keys(
  templates
);