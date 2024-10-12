document.addEventListener('DOMContentLoaded', () => {
    displayStudents();
});

function addStudent() {
    let studentName = document.getElementById('studentName').value;
    if (studentName) {
        let students = getStudents();
        students.push(studentName);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        document.getElementById('studentName').value = ''; // Clear input field
    }
}

function getStudents() {
    let storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        return JSON.parse(storedStudents);
    } else {
        return [];
    }
}

function displayStudents() {
    let students = getStudents();
    let studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing list
    students.forEach((student) => {
        let li = document.createElement('li');
        li.textContent = student;
        // Add a delete button to each list item
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteStudent(student); // Pass the student's name to the delete function
        li.appendChild(deleteButton);
        studentList.appendChild(li);
    });
}

function deleteStudent(studentName) {
    let students = getStudents();
    students = students.filter(name => name!== studentName); // Remove the student from the array
    localStorage.setItem('students', JSON.stringify(students)); // Update localStorage
    displayStudents(); // Refresh the list
}
