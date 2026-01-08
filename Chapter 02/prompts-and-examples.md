# Chapter 2: Understanding AI Coding Capabilities - Code Snippets

## Language Translation - Python to JavaScript

```markdown
# Original Python Code

def analyze_grades(student_grades):
    """
    Analyzes a list of student grades to produce summary statistics.
    
    Args:
        student_grades: List of numeric grade values
        
    Returns:
        Dictionary containing grade statistics
    """
    if not student_grades:
        return {"error": "No grades provided"}
        
    total_students = len(student_grades)
    passing_grades = [grade for grade in student_grades if grade >= 60]
    passing_count = len(passing_grades)
    
    return {
        "total": total_students,
        "passing": passing_count,
        "failing": total_students - passing_count,
        "average": sum(student_grades) / total_students if total_students else 0,
        "highest": max(student_grades) if student_grades else 0,
        "lowest": min(student_grades) if student_grades else 0,
        "pass_rate": (passing_count / total_students) * 100 if total_students else 0
    }
```

---

```markdown
# Prompt
Convert this Python function to JavaScript

# Translated JavaScript Code

/**
 * Analyzes an array of student grades to produce summary statistics.
 * 
 * @param {number[]} studentGrades - Array of numeric grade values
 * @returns {Object} Object containing grade statistics
 */
function analyzeGrades(studentGrades) {
  if (!studentGrades || studentGrades.length === 0) {
    return { error: "No grades provided" };
  }
  
  const totalStudents = studentGrades.length;
  const passingGrades = studentGrades.filter(grade => grade >= 60);
  const passingCount = passingGrades.length;
  
  return {
    total: totalStudents,
    passing: passingCount,
    failing: totalStudents - passingCount,
    average: studentGrades.reduce((sum, grade) => sum + grade, 0) / totalStudents,
    highest: Math.max(...studentGrades),
    lowest: Math.min(...studentGrades),
    passRate: (passingCount / totalStudents) * 100
  };
}
```
