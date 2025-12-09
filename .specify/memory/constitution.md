# TextBook Constitution

## Project: Textbook on "Physical AI & Humanoid Robotics"

**Primary Tools:** Docusaurus, GitHub Pages, Spec-Kit Plus, Claude Code  
**Author:** Muhib Anwar  
**Target Audience:** Undergraduate/Graduate Engineering Students  
**License:** MA GIAIC-PK 1.0

## CONSTITUTION RULES

### 1. Content Standards
- All technical content must be peer-review quality with proper citations
- Use IEEE citation format throughout
- Maintain academic rigor while being accessible to students
- Each chapter must include learning objectives, key terms, exercises, and references

### 2. Technical Implementation
- Book structure follows Docusaurus best practices
- All code examples in Python with ROS2 integration
- Simulations use Gazebo/Isaac Sim where applicable
- Mathematical notation with LaTeX in Markdown
- All diagrams as SVG with textual descriptions

### 3. Collaboration Rules
- AI generates content, human validates accuracy
- Human provides domain expertise, AI handles formatting/structure
- All generated code must be tested in simulation environment
- Regular commits with meaningful messages
- PR reviews for major content additions

### 4. Quality Gates
- Each chapter reviewed for technical accuracy
- All external references verified and accessible
- Exercises must have solution guides (separate instructor manual)
- Accessibility: All images have alt text, proper heading hierarchy

### 5. Style Guidelines
- Tone: Professional academic, but engaging for students
- Use active voice where possible
- American English spelling
- Code snippets include explanatory comments
- Complex concepts include analogies and real-world examples

### 6. Tech Stack & Rules
1. **Framework:** Docusaurus 3.x (Latest Stable).
2. **Language:** TypeScript (for configuration), MDX (for content).
3. **Styling:** Custom CSS for a clean, academic, "textbook" aesthetic.
4. **Math Support:** MUST configure `remark-math` and `rehype-katex` to render LaTeX equations (essential for robotics kinematics/dynamics).
5. **Diagrams:** MUST configure `@docusaurus/theme-mermaid` for system architecture diagrams.
6. **Deployment:** GitHub Actions for automated deployment to GitHub Pages.

### 7. Coding & Writing Standards
- **Atomic Changes:** Make small, testable changes.
- **Documentation:** Every code block in the book must be commented.
- **Tone:** Academic yet accessible. Use "we" for guided learning.
- **Structure:** Use "Admonitions" (Notes, Tips, Dangers) frequently to highlight key robotics concepts.