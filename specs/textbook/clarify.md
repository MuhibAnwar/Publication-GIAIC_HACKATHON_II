# Clarifications for Physical AI & Humanoid Robotics Textbook

## IDENTIFIED GAPS & CLARIFICATIONS NEEDED

### 1. Content Scope Questions

- **What prerequisite knowledge should we assume?** (Linear algebra, Python, basic robotics?)
  - Students are expected to have completed Calculus, Linear Algebra, and introductory programming courses
  - Basic Python programming skills are required (functions, classes, modules)
  - Some familiarity with robotics concepts is helpful but not required

- **Should we include hardware build instructions or focus on simulation?**
  - Primary focus should be on simulation environments (Gazebo, Isaac Sim)
  - Include guidance on hardware integration for those with access to physical robots
  - Provide clear pathways for both simulation-only and simulation+hardware experiences

- **Depth of AI coverage: Traditional control vs. learning-based approaches?**
  - Balanced approach: Traditional control methods for fundamental understanding and stability
  - Emphasis on learning-based approaches in later modules for modern robotics
  - Cover both classical robotics and modern AI techniques in parallel

- **Balance between theory and hands-on implementation?**
  - 40% theory and foundational concepts
  - 60% hands-on implementation and practical exercises
  - Each theoretical concept should include practical examples and exercises

### 2. Technical Infrastructure

- **Hosting for compute-intensive simulations?**
  - Primarily local development for student workstations meeting requirements
  - Cloud computing options for students without required hardware (AWS G5 instances)
  - GitHub Codespaces as lightweight alternative for code exploration

- **Student authentication system for exercise submission?**
  - Integration with existing learning management systems (LMS) like Canvas or Moodle
  - GitHub Classroom integration for assignment distribution and collection
  - Optional: Custom authentication system for additional features

- **Integration with learning management systems (Canvas, Moodle)?**
  - Export functionality for common LMS formats (Common Cartridge)
  - API endpoints for gradebook synchronization
  - Assignment and quiz import capabilities

- **Offline access capabilities?**
  - PDF export for offline reading
  - Downloadable code examples that work offline
  - Optional: Progressive Web App features for offline content access

### 3. Pedagogical Approach

- **Project-based learning structure?**
  - Module-specific projects building toward a final capstone
  - Incremental development with each module adding capabilities
  - Individual and team project options

- **Team collaboration features?**
  - Version control best practices using Git
  - Guidelines for collaborative development
  - Integration with GitHub for team project management

- **Instructor resources separate from student materials?**
  - Separate instructor manual with solutions and teaching notes
  - Additional assessment materials for educators
  - Slide decks and presentation materials

- **Accessibility requirements (screen readers, keyboard navigation)?**
  - WCAG 2.1 AA compliance for web content
  - Alt text for all images and diagrams
  - Keyboard navigation support for all interactive elements
  - Screen reader compatibility for mathematical notation

### 4. Validation & Accuracy

- **Peer review process for technical content?**
  - Internal review by technical team
  - External review by domain experts in robotics and AI
  - Student beta-testing phase with feedback collection

- **Industry expert review cycle?**
  - Review by professionals working in humanoid robotics
  - Feedback from NVIDIA Isaac team members
  - Contributions from ROS community experts

- **Student beta-testing phase?**
  - Pilot course with a small group of students
  - Feedback collection via surveys and discussion
  - Iterative improvements based on student experience

- **Versioning and update strategy?**
  - GitHub-based version control with clear release notes
  - Regular updates aligned with ROS 2 and Isaac SDK releases
  - Clear communication of changes to users

### 5. Licensing & Distribution

- **Open-source vs. commercial licensing for content?**
  - Educational content under Creative Commons license (CC BY-NC-SA 4.0)
  - Code examples under MIT license for reuse
  - Commercial use requires permission

- **Third-party assets (images, videos) licensing?**
  - All assets must have appropriate licenses for educational use
  - Attribution provided for all third-party content
  - Original content created to minimize licensing issues

- **Translation and localization strategy?**
  - Initially English-only with internationalization framework
  - Community translation initiatives for future languages
  - Consider cultural and technical terminology differences

- **Print-on-demand options?**
  - PDF generation optimized for printing
  - Print-on-demand service integration
  - Consider physical textbook distribution