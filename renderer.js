const tbody = document.querySelector('tbody');

const reloadData = async () => {
  const fragment = document.createDocumentFragment()
  const result = await window.api.requestData();
  result.forEach((item) => {
    const tr = document.createElement('tr')
    Object.values(item).forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  tbody.replaceChildren(fragment);
 };

const btnCreate = document.querySelector('#btnCreate');
btnCreate.addEventListener('click', () => {
window.api.openCreateForm();
})

const sum = () => 1;

window.addEventListener('DOMContentLoaded', reloadData);
window.api.onReloadData(reloadData);
