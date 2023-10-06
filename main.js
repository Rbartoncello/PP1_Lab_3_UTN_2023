const jsonArray = JSON.parse(jsonString);

let people = jsonArray.map((item) => {
  return "altMax" in item && "autonomia" in item
    ? new Aereo(
        item.id,
        item.modelo,
        item.anoFab,
        item.velMax,
        item.altMax,
        item.autonomia
      )
    : new Terrestre(
        item.id,
        item.modelo,
        item.anoFab,
        item.velMax,
        item.cantPue,
        item.cantRue
      );
});

const $ = (id) => document.getElementById(id);

const getAgeAverage = () => {
  const btnCalculateAgeAverage = $("btn-calculate-age-average");

  btnCalculateAgeAverage.addEventListener("click", (e) => {
    e.preventDefault();
    const inputCalculateAgeAverage = $("num-calculate-age-average");
    const typeFilter = $("ddl-type-filter");
    inputCalculateAgeAverage.value = calculateKeyAverage(
      typeFilter.value.toString(),
      "velMax"
    );
  });
};

const createInputField = (name, type) => {
  const inputField = document.createElement("div");
  inputField.id = "input-field";

  const label = document.createElement("label");
  label.textContent = `${name}:`;
  label.setAttribute("for", `input-${name}`);

  const input = document.createElement("input");
  input.placeholder = `Ingrese ${name}`;
  input.type = type;
  input.id = `input-${name}`;
  input.required = true;

  inputField.appendChild(label);
  inputField.appendChild(input);

  return inputField;
};

const createCheckboxField = (input) => {
  const checkboxContainer = createInputField(input.name, "checkbox");
  checkboxContainer.id = `chk-container-${input.id}`;
  checkboxContainer.className = "chk-container";

  const inputElement = checkboxContainer.querySelector("input");
  const labelElement = checkboxContainer.querySelector("label");

  inputElement.removeAttribute("required");
  inputElement.setAttribute("checked", "true");
  inputElement.id = `chk-${input.id}`;
  labelElement.setAttribute("for", inputElement.id);

  return checkboxContainer;
};

const addCheckboxs = () => {
  const checkboxFields = $("ckl-colums-to-show");
  checkboxFields.innerHTML = "";

  const typeField = $("ddl-type-filter");
  const selectedValue = typeField.value;

  const selectedInputs =
    selectedValue === "vehiculo"
      ? [...inputsDefault, ...inputsAir, ...inputsLand]
      : selectedValue === "aereo"
      ? [...inputsDefault, ...inputsAir]
      : [...inputsDefault, ...inputsLand];

  selectedInputs.forEach((input) => {
    const checkboxContainer = createCheckboxField(input);
    checkboxFields.appendChild(checkboxContainer);
  });
};

const onChangeCheckbox = () => {
  const checkboxesContainer = $("ckl-colums-to-show");

  const checkboxDivs = checkboxesContainer.querySelectorAll(
    "div[id^='chk-container']"
  );

  checkboxDivs.forEach((checkboxDiv) => {
    const inputElement = checkboxDiv.querySelector("input");
    const id = inputElement.id;
    const cellClass = `cell-${id.replace("chk-", "")}`;
    const headerId = `header-${id.replace("chk-", "")}`;

    const checkbox = $(id);

    checkbox.addEventListener("change", () => {
      const cellElements = document.querySelectorAll(`#${cellClass}`);
      cellElements.forEach((element) => {
        element.style.display = checkbox.checked ? "table-cell" : "none";
      });

      const header = document.getElementById(headerId);
      header.style.display = checkbox.checked ? "table-cell" : "none";
    });
  });
};

const hideCheckboxsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToHide =
    value === "terrestre"
      ? [...inputsAir]
      : value === "aereo"
      ? [...inputsLand]
      : [];

  const idsToHide = columnsToHide.map((column) => `chk-container-${column.id}`);
  changeDisplayElements(idsToHide, "none");
};

const changeDisplayElements = (element, display) => {
  element.forEach((id) => {
    const elements = document.querySelectorAll(`#${id}`);
    elements.forEach((element) => {
      element.style.display = display;
    });
  });
};

const showCheckboxsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToShow =
    value === "terrestre"
      ? inputsLand
      : value === "aereo"
      ? inputsAir
      : [...inputsLand, ...inputsAir];

  const idsToShow = columnsToShow.map((column) => `chk-container-${column.id}`);
  changeDisplayElements(idsToShow, "flex");
};

const hideColumnsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;

  const columnsToHide =
    value === "terrestre"
      ? [...inputsAir]
      : value === "aereo"
      ? [...inputsLand]
      : [];

  const idsToHide = [
    ...columnsToHide.map((column) => `cell-${column.id}`),
    ...columnsToHide.map((column) => `header-${column.id}`),
  ];
  changeDisplayElements(idsToHide, "none");
};

const showColumnsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToShow =
    value === "terrestre"
      ? [...inputsLand]
      : value === "aereo"
      ? [...inputsAir]
      : [...inputsLand, ...inputsAir];

  const idsToHide = [
    ...columnsToShow.map((column) => `cell-${column.id}`),
    ...columnsToShow.map((column) => `header-${column.id}`),
  ];
  changeDisplayElements(idsToHide, "table-cell");
};

const onChangeFilterType = (value) => {
  hideCheckboxsByType();
  showCheckboxsByType();

  hideColumnsByType();
  showColumnsByType();

  const inputCalculateAgeAverage = $("num-calculate-age-average");
  inputCalculateAgeAverage.value = "";

  uploadDataTable(filterByTypePerson(value));
  onClickHeader(filterByTypePerson(value));
};

const heardersToShow = () => {
  const checkboxesContainer = $("ckl-colums-to-show");
  const checkboxInfoArray = [];

  const checkboxDivs = checkboxesContainer.querySelectorAll(
    "div[id^='chk-container']"
  );

  checkboxDivs.forEach((checkboxDiv) => {
    const inputElement = checkboxDiv.querySelector("input");
    const labelElement = checkboxDiv.querySelector("label");

    const id = inputElement.id.replace("chk-", "");
    const name = labelElement.textContent.replace(":", "");
    checkboxInfoArray.push({ id, name });
  });

  return checkboxInfoArray;
};

const addTable = () => {
  const headers = $("header");
  headers.innerHTML = "";

  const selectedInputs = heardersToShow();

  selectedInputs.forEach((hearder) => {
    const th = document.createElement("th");
    th.id = `header-${hearder.id}`;
    th.textContent = hearder.name;
    headers.appendChild(th);
  });
};

const createRow = (item) => {
  const tr = document.createElement("tr");
  const selectedInputs = [...inputsDefault, ...inputsAir, ...inputsLand];

  selectedInputs.forEach((header) => {
    const td = document.createElement("td");
    td.id = `cell-${header.id}`;
    td.textContent = item[header.id];
    tr.appendChild(td);
  });
  return tr;
};

const uploadDataTable = (data) => {
  const tbody = $("table-body");
  tbody.innerHTML = "";
  data.forEach((item) => {
    tbody.appendChild(createRow(item));
  });
  hideColumnsByType();
  showColumnsByType();
};

const onClickHeader = (rows) => {
  const hearders = document.querySelectorAll("th");

  hearders.forEach((header) => {
    header.addEventListener("click", (e) => {
      e.preventDefault();
      const orderKey = e.target.id.replace("header-", "");

      uploadDataTable(orderByKey(orderKey, rows));
      const checkboxDivs = document.querySelectorAll("input[type='checkbox']");

      const filter = Array.from(checkboxDivs)
        .flatMap((value) => {
          return (
            !value.checked && [
              value.id.replace("chk-", "header-"),
              value.id.replace("chk-", "cell-"),
            ]
          );
        })
        .filter((value) => value);

      changeDisplayElements(filter, "none");
    });
  });
};

const activateAbmForm = (editMode) => {
  const dataForm = $("form-data-container");
  const ambForm = $("form-amb-container");
  dataForm.style.display = "none";
  ambForm.style.display = "flex";

  const editButtons = $("btns-container-edit-delete");
  const addButtons = $("btns-container-add");

  if (editMode) {
    editButtons.style.display = "flex";
    addButtons.style.display = "none";
  } else {
    addButtons.style.display = "flex";
    editButtons.style.display = "none";
  }
};

const onDoubleClickOnTable = () => {
  const table = $("data-table");

  table.addEventListener("dblclick", (e) => {
    const row = e.target.closest("tr");
    if (row) {
      e.preventDefault();
      const cellIdElement = row.querySelector("td[id='cell-id']");

      if (cellIdElement) {
        const id = cellIdElement.textContent;
        const personToEdit = people.find(
          (person) => person.id.toString() === id
        );
        activateAbmForm(true);
        createFormAbm(personToEdit);
      }
    }
  });
};

const generateIdAndDisableField = () => {
  const idField = document.querySelector("#input-id");
  idField.value = new Date().getTime();
  idField.disabled = true;
};

const addInputByDefault = (initialValues) => {
  const inputsContainer = $("default-inputs-container");
  inputsContainer.innerHTML = "";

  inputsDefault.forEach((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    inputElement.value = initialValues ? initialValues[input.id] : "";

    if (input.id === "id") {
      inputElement.disabled = true;
    }

    if (input.type === "number") {
      inputElement.setAttribute("min", input.min);
    }

    inputsContainer.appendChild(inputContainer);
  });

  if (initialValues !== undefined) {
    const selectTypeOfPerson = $("dll-type-person");
    selectTypeOfPerson.value =
      initialValues instanceof Aereo ? "aereo" : "terrestre";
    selectTypeOfPerson.disabled = true;
  } else {
    generateIdAndDisableField();
  }
};

const addInputByTypePerson = (initialValues) => {
  const inputsContainer = $("dynamic-inputs-container");
  inputsContainer.innerHTML = "";

  const typeField = $("dll-type-person");
  const selectedInputs = typeField.value === "aereo" ? inputsAir : inputsLand;

  selectedInputs.map((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    inputElement.value = initialValues ? initialValues[input.id] : "";
    if (input.type === "number") {
      inputElement.setAttribute("min", input.min);
    }
    inputsContainer.appendChild(inputContainer);
  });
};

const createFormAbm = (initialValues) => {
  addInputByDefault(initialValues);
  addInputByTypePerson(initialValues);
};

const getFormDataAsObject = (formData) => {
  const data = formData.querySelectorAll("input");
  const dataArray = Array.from(data).map((value) => ({
    [value.id.replace("input-", "")]: value.value,
  }));

  return dataArray.reduce((acc, value) => ({ ...acc, ...value }), {});
};

const editPerson = (formData) => {
  const personEdited = getFormDataAsObject(formData);

  const personId = parseInt(personEdited.id);
  const personToUpdate = people.find(
    (person) => person.id.toString() === personId.toString()
  );

  if (personToUpdate) {
    personToUpdate.update(personEdited);
    uploadDataTable(people);
  }
};

const deletePerson = (formData) => {
  const personEdited = getFormDataAsObject(formData);

  const personId = parseInt(personEdited.id);
  people = people.filter((person) => person.id !== personId);

  if (people) {
    uploadDataTable(people);
  }
};

const addPerson = (formData) => {
  const item = getFormDataAsObject(formData);

  const personObject =
    "altMax" in item && "autonomia" in item
      ? new Aereo(
          item.id,
          item.modelo,
          item.anoFab,
          item.velMax,
          item.altMax,
          item.autonomia
        )
      : new Terrestre(
          item.id,
          item.modelo,
          item.anoFab,
          item.velMax,
          item.cantPue,
          item.cantRue
        );

  people.push(personObject);
  uploadDataTable(people);
};

const handleAbmFormSubmit = (e) => {
  e.preventDefault();
  const clickedButton = document.querySelector('button[type="submit"]:focus');
  const buttonId = clickedButton.id;

  switch (buttonId) {
    case "btn-add":
      addPerson(e.target);
      break;
    case "btn-edit":
      editPerson(e.target);
      break;
    case "btn-delete":
      deletePerson(e.target);
      break;
  }

  hideAbmForm();
  e.stopPropagation();
};

const hideAbmForm = () => {
  const abmForm = $("form-amb-container");
  const dataForm = $("form-data-container");

  abmForm.style.display = "none";
  dataForm.style.display = "flex";
};

const handleDataFormSubmit = (e) => {
  e.preventDefault();

  activateAbmForm(false);
  createFormAbm();
};

const initializeDocument = () => {
  getAgeAverage();
  addCheckboxs();
  addTable();
  uploadDataTable(people);
  onClickHeader(people);
  onDoubleClickOnTable();

  const typeField = $("ddl-type-filter");
  typeField.addEventListener("click", (e) =>
    onChangeFilterType(e.target.value)
  );

  const abmForm = $("form-amb-container");
  abmForm.addEventListener("submit", (e) => handleAbmFormSubmit(e));

  const formData = $("form-data-container");
  formData.addEventListener("submit", (e) => handleDataFormSubmit(e));

  const btnCancel = $("btn-cancel");
  btnCancel.addEventListener("click", () => hideAbmForm());

  onChangeCheckbox();
};

document.addEventListener("DOMContentLoaded", initializeDocument);
