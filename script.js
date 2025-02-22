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
const selectDesignation = document.querySelector(".select_desig");

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
    designation: "Developer",
    salary: 80000,
    address: "123 Main St",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    designation: "tester",
    salary: 60000,
    address: "456 Elm St",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    designation: "Manager",
    salary: 70000,
    address: "789 Oak St",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    designation: "hr",
    salary: 50000,
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
  employeeArray.forEach(({ id, name, designation, email, salary, address }) => {
    containerHTML += `
        <tr>
            <td>${name}</td>
            <td>${designation}</td>
            <td>${email}</td>
            <td>${salary}</td>
            <td>
                <button class="option_btn" onclick="viewDetailModal(${id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="option_btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="option_btn" onclick="deleteEmployee(${id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
        <div class="view_detail_modal" id="${id}" style="display:none;">
            
                <span class="close_btn" onclick="closeModal(${id})">&times;</span>
                <h3>${name}</h3>
                <p>${designation}</p>
                <p>${email}</p>
                <p>${salary}</p>
                <p>${address}</p>
            
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
    errorMessage.innerHTML = `Please enter a valid id`;
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
function selectDesignationChange() {
  if (selectDesignation.value === "all") {
    listAll(employees);
    return;
  }
  let result = employees.filter((employee) =>
    employee.designation.toLocaleLowerCase().includes(selectDesignation.value)
  );
  listAll(result);
}
function increaseSalaryBy10() {
  let result = employees.map((employee) => {
    employee.salary = Math.floor(employee.salary * 1.1);
    return employee;
  });
  listAll(result);
}
selectDesignation.addEventListener("change", selectDesignationChange);
addEmployeeBtn.addEventListener("click", addEmployee);
// keyboard event on enter key
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchEmployee();
  }
});
