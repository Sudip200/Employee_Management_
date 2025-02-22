const rightPanel = document.querySelector(".right_panel");
const leftPanel = document.querySelector(".left-panel");
//for list view screen  ------------------
const listPageContainer = document.querySelector(".list_employee");
const listContainer = document.querySelector(".list_container");
const searchInput = document.getElementById("search");
const errorMessage = document.querySelector(".error_msg");
// for add employee screen ----------------
const addEmployeeContainer = document.querySelector(".add_new_employee");
const nameInput = document.getElementById("ename");
const emailInput = document.getElementById("email");
const designationInput = document.getElementById("designation");
const salaryInput = document.getElementById("salary");
const addressInput = document.getElementById("address");
const addEmployeeBtn = document.querySelector(".add_btn_emclass");
const listAllBtn = document.getElementById("clear_btn");

let name;
let email;
let designation;
let salary;
let address;
let query;
let employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    designation: "Software Engineer",
    salary: "50000",
    address: "123 Main St",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    designation: "Project Manager",
    salary: "60000",
    address: "456 Elm St",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    designation: "UX Designer",
    salary: "55000",
    address: "789 Oak St",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    designation: "DevOps Engineer",
    salary: "58000",
    address: "321 Pine St",
  },
];
listAll(employees);
function Employee(id, name, email, designation, salary, address) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.designation = designation;
  this.salary = salary;
  this.address = address;
  this.employeeArray = [];
}

function closeModal(id) {
  //  document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  let modal = document.getElementById(id);
  modal.style.display = "none";
}
function viewDetailModal(id) {
  let modal = document.getElementById(id);
  modal.style.display = "block";
  // document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function listAll(employeeArray) {
  makeAllNoneExcept(listPageContainer);
  let containerHTML;
  containerHTML = `<table class="employee_table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody>`;
  employeeArray.forEach((employee) => {
    containerHTML += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
            <td>${employee.email}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="option_btn" onclick="viewDetailModal(${employee.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="option_btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="option_btn" onclick="deleteEmployee(${employee.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
        <div class="view_detail_modal" id="${employee.id}" style="display:none;">
            
                <span class="close_btn" onclick="closeModal(${employee.id})">&times;</span>
                <h3>${employee.name}</h3>
                <p>${employee.designation}</p>
                <p>${employee.email}</p>
                <p>${employee.salary}</p>
                <p>${employee.address}</p>
            
        </div>
    `;
  });
  containerHTML += `</tbody></table>`;
  listContainer.innerHTML = containerHTML;
  listPageContainer.style.display = "block";
}

function addNew() {
  makeAllNoneExcept(addEmployeeContainer);
  addEmployeeContainer.style.display = "block";
}
function makeAllNoneExcept(element) {
  listPageContainer.style.display = "none";
  addEmployeeContainer.style.display = "none";
  element.style.display = "block";
}

function addEmployee(e) {
  console.log("event", e);
  e.preventDefault();
  let id = employees.length + 1;
  let newEmployee = new Employee(
    id,
    nameInput.value,
    emailInput.value,
    designationInput.value,
    salaryInput.value,
    addressInput.value
  );
  employees.push(newEmployee);
  listAll(employees);
}
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  designationInput.value = "";
  salaryInput.value = "";
  addressInput.value = "";
}
function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  listAll(employees);
}
function searchEmployee() {
  if (searchInput.value === "") {
    errorMessage.innerHTML = "Please enter a valid search query";
    listAll(employees);
    return;
  }
  query = searchInput.value;
  let result = employees.filter(
    (employee) => employee.id === parseFloat(query)
  );

  if (result.length === 0) {
    errorMessage.innerHTML = "No result found";
    listAll(employees);
    return;
  } else {
    errorMessage.innerHTML = "";
    listAll(result);
  }
}

addEmployeeBtn.addEventListener("click", addEmployee);
// keyboard event on enter key
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchEmployee();
  }
});
