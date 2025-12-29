# DOOH Ad Manager

A backend-focused Digital Out-of-Home (DOOH) advertisement management system with campaign scheduling and time-based validation.

This project demonstrates correct data modeling, REST API design, and campaign scheduling logic, with a minimal frontend to verify end-to-end functionality.

---

## Tech Stack

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- Prisma ORM  

### Frontend
- Minimal HTML + JavaScript (Fetch API)

### Documentation
- Swagger / OpenAPI

---

## Features Implemented

### Screen Management
- Create screens  
- Update screens  
- List all screens  

### Ad Management
- Create ads (image/video metadata)  
- List ads  

### Campaign Scheduling (Core Logic)
- Create campaigns with start and end times  
- Assign one or more screens to a campaign  
- Assign ads to campaigns with play order  
- **Prevents overlapping campaigns on the same screen**  
- Enforces relational integrity using foreign keys  

### Campaign Retrieval
- Fetch campaigns with:
  - Linked screens  
  - Linked ads  
  - Ads ordered by play order  

---

## Why the Frontend Is Minimal

The primary focus of this assignment is backend correctness, scheduling logic, and database relationships.

A lightweight HTML + JavaScript frontend is intentionally used to:
- Demonstrate real API consumption  
- Verify backend behavior visually  
- Avoid unnecessary framework complexity  

This satisfies the requirement for a **basic functional web interface** while keeping the solution focused and maintainable.

---

## How to Run the Project

### Prerequisites
- Node.js (v18 or later)
- PostgreSQL running locally
- npm installed

---

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd dooh-ad-manager
