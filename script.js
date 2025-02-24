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
const error_msg = document.querySelector(".error_msg_add");
const addDesignation = document.querySelector(".add_desig");
// for edit employee screen ----------------
const editEmployeeContainer = document.querySelector(".edit_new_employee");
const eid = document.getElementById("eid");
const ename = document.getElementById("edname");
const eemail = document.getElementById("edmail");
const edesignation = document.getElementById("eddesignation");
const editDesignation = document.querySelector(".edit_desig");
const esalary = document.getElementById("edsalary");
const eaddress = document.getElementById("edaddress");
const error_msg_edit = document.querySelector(".error_msg_edit");
const editEmployeeBtn = document.querySelector(".add_btn_emclass__edit");

let name;
let email;
let designation;
let salary;
let address;
let query;

// array to store employee data with some sample data

let employees = [
  {
    id: 1,
    name: "Sudipto",
    email: "dassudipto200@gmail.com",
    designation: "Developer",
    salary: 80000,
    address: "West Bengal",
  },
  {
    id: 2,
    name: "Jagdish Sau",
    email: "jagdish@gmail.com",
    designation: "tester",
    salary: 60000,
    address: "Kolkata",
  },
  {
    id: 3,
    name: "Rishav Das",
    email: "rishav@gmail.com",
    designation: "Manager",
    salary: 70000,
    address: "Kolkata",
  },
  {
    id: 4,
    name: "Sayantan Karmakar",
    email: "sayan@gmail.com",
    designation: "hr",
    salary: 50000,
    address: "Howrah",
  },
];
// default view
listAll(employees);
// constructor function for employee
function Employee(id, name, email, designation, salary, address) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.designation = designation;

  this.salary = salary;
  this.address = address;
}

// FOR LIST VIEW SCREEN

// function to make all container none except the one which is clicked

function makeAllNoneExcept(element) {
  listPageContainer.style.display = "none";
  addEmployeeContainer.style.display = "none";
  editEmployeeContainer.style.display = "none";
  element.style.display = "block";
}
// function to close modal by id
function closeModal(id) {
  let modal = document.getElementById(id);
  modal.style.display = "none";
}
// function to view modal by id

function viewDetailModal(id) {
  let modal = document.getElementById(id);
  modal.style.display = "block";
}
// function to search employee by id or name
function searchEmployee() {
  let result;
  if (searchInput.value === "") {
    errorMessage.innerHTML = `Please enter a valid id`;
    listAll(employees);
    return;
  }

  query = searchInput.value;
  if (!isNaN(parseFloat(query))) {
    // if query is a number then search by id
    result = employees.filter((employee) => employee.id === parseFloat(query));
  } else {
    // if query is a string then search by name
    result = employees.filter((employee) =>
      employee.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }

  if (result.length === 0) {
    errorMessage.innerHTML = "No result found";
    listAll(employees);
    return;
  } else {
    errorMessage.innerHTML = "";
    listAll(result);
  }
}
// function to filter employee by designation
function selectDesignationChange() {
  if (selectDesignation.value === "all") {
    listAll(employees);
    return;
  }
  let result = employees.filter((employee) =>
    employee.designation
      .toLocaleLowerCase()
      .includes(selectDesignation.value.toLocaleLowerCase())
  );
  listAll(result);
}
// function to increase salary by 10% for all employees
const increaseSalaryBy10 = () => {
  let result = employees.map((employee) => {
    employee.salary = Math.floor(employee.salary * 1.1);
    return employee;
  });
  listAll(result);
};
// keyboard event on enter key for search input
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchEmployee();
  }
});
// button click event for search
selectDesignation.addEventListener("change", selectDesignationChange);
// main function to list all employees dynamically in a table
function listAll(employeeArray) {
    document.querySelector(".list_all").style.backgroundColor = '#ffd700'
      document.querySelector(".add_new").style.backgroundColor = 'white'
      document.querySelector(".edit_employee").style.backgroundColor = 'white'
  if (!employeeArray) {
    employeeArray = employees;
  }
  makeAllNoneExcept(listPageContainer);
  let containerHTML;
  containerHTML = `<table class="employee_table">
    <thead>
        <tr>
            <th>Id</th>
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
            <td>${id}</td>
            <td>${name}</td>
            <td>${designation}</td>
            <td>${email}</td>
            <td>${salary}</td>
            <td>
                <button class="option_btn" onclick="viewDetailModal(${id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="option_btn" onclick="viewEditEmployee(${id})">
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

// FOR ADD EMPLOYEE SCREEN
// function to change view to add employee screen
function addNew() {
  document.querySelector(".list_all").style.backgroundColor = 'white'
  document.querySelector(".add_new").style.backgroundColor = '#ffd700'
    document.querySelector(".edit_employee").style.backgroundColor = 'white'
  makeAllNoneExcept(addEmployeeContainer);
  addEmployeeContainer.style.display = "block";
}
// main function to add employee
const addEmployee = (e) => {
  e.preventDefault();
  //get max id value to auto increment id
  let id =
    employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
  // validation for empty fields
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    addDesignation.value === "" ||
    salaryInput.value === "" ||
    addressInput.value === ""
  ) {
    error_msg.innerHTML = "Please fill all fields";
    return;
  }
  error_msg.innerHTML = "";
  // check data types of input fields and show error if not valid
  if (isNaN(Number(salaryInput.value)) || Number(salaryInput.value) < 0) {
    error_msg.innerHTML = "Salary must be a number and greater than 0";
    return;
  }
  error_msg.innerHTML = "";
  console.log(typeof Number(salaryInput.value));
  let newEmployee = new Employee(
    id,
    nameInput.value,
    emailInput.value,
    addDesignation.value,
    parseFloat(salaryInput.value),
    addressInput.value
  );
  // add new employee to the array
  employees = [...employees, newEmployee];
  listAll(employees);
};
// button click event for add employee
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  designationInput.value = "";
  salaryInput.value = "";
  addressInput.value = "";
}
// function to delete employee by id
function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  listAll(employees);
}
addEmployeeBtn.addEventListener("click", addEmployee);

// FOR EDIT EMPLOYEE SCREEN
// function to change view to edit employee screen
function viewEditEmployee(id) {
    document.querySelector(".list_all").style.backgroundColor = 'white'
    document.querySelector(".add_new").style.backgroundColor = 'white'
    document.querySelector(".edit_employee").style.backgroundColor = '#ffd700'
  if (id) {
    eid.value = id;
    getResultValueById(id);
  }
  makeAllNoneExcept(editEmployeeContainer);
}
// function to get employee data by id
function getResultValueById() {
  let result = employees.filter(
    (employee) => employee.id === parseFloat(eid.value)
  );
  if (result.length === 0) {
    error_msg_edit.innerHTML = "No result found";
    return;
  }
  ename.value = result[0].name;
  eemail.value = result[0].email;
  editDesignation.value = result[0].designation;
  esalary.value = result[0].salary;
  eaddress.value = result[0].address;
}
eid.addEventListener("change", () => {
  getResultValueById();
});
// main function to edit employee

const editEmployee = (e) => {
  e.preventDefault();
  // check if employee exists
  let result = employees.find(
    (employee) => employee.id === parseFloat(eid.value)
  );
  if (!result) {
    error_msg_edit.innerHTML = "No result found";
    return;
  }
  error_msg_edit.innerHTML = "";
  // validation for empty fields
  if (
    ename.value === "" ||
    eemail.value === "" ||
      editDesignation.value === "" ||
    esalary.value === "" ||
    eaddress.value === ""
  ) {
    error_msg_edit.innerHTML = "Please fill all fields";
    return;
  }
  error_msg_edit.innerHTML = "";
  // check data types of input fields and show error if not valid
  if (isNaN(Number(esalary.value)) || parseFloat(salaryInput.value) <= 0) {
    error_msg_edit.innerHTML = "Salary must be a number and greater than 0";
    return;
  }
  error_msg_edit.innerHTML = "";
  // edit employee data
  employees = employees.map((employee) => {
    if (employee.id === parseFloat(eid.value)) {
      return {
        ...employee,
        name: ename.value,
        email: eemail.value,
        designation: editDesignation.value,
        salary: parseFloat(esalary.value),
        address: eaddress.value,
      };
    } else {
      return employee;
    }
  });
  console.log(employees);
  listAll(employees);
};
editEmployeeBtn.addEventListener("click", editEmployee);
