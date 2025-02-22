//getting all html elements
const rightPanel = document.querySelector('.right_panel');
const leftPanel = document.querySelector('.left-panel');


// all employees
let employees = [
    {
        id: 1,
        name: 'John Doe',
        department: 'IT',
        email: 'dh',
        salary: 1000
    },
    {
        id: 2,
        name: 'Jane Doe',
        department: 'HR',
        email: 'jh',
        salary: 2000
    },
    {
        id: 3,
        name: 'Jim Doe',
        department: 'Finance',
        email: 'jh',
        salary: 3000
    },
    {
        id: 4,
        name: 'Jill Doe',
        department: 'IT',
        email: 'jh',
        salary: 4000
    },
    {
        id: 5,
        name: 'Jack Doe',
        department: 'Finance',
        email: 'jh',
        salary: 5000
    }

]

function listAll(){
    console.log('listing all employees');
    rightPanel.innerHTML = '';

let containerHTML = `<div class='container' style="display: flex; flex-direction:column;flex-wrap: wrap; justify-content: space-between; overflow-y: auto;">
<h2>All Employees</h2>
`;

employees.forEach(employee => {
    containerHTML += `
    <div class="employee" style="
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    border-radius: 10px;
    margin: 10px;
    background-color: white;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    ">
        <h3>${employee.name}</h3>
        <p>${employee.department}</p>
        <p>${employee.email}</p>
        <p>${employee.salary}</p>
    </div>
    `;
});
containerHTML += `</div>`;

rightPanel.innerHTML = containerHTML;

}


