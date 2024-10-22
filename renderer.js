const wrapper = document.getElementById('wrapper');

const loadData = async () => {
  const result = await window.api.requestData();
  result.forEach((item) => {
    const hero = document.createElement('p');
    hero.textContent = JSON.stringify(item);
    wrapper.appendChild(hero);
  });
 };

 const btnCreate = document.querySelector('#btnCreate');
 btnCreate.addEventListener('click', () => {
  window.api.openCreateForm();
 })

 window.addEventListener('DOMContentLoaded', loadData);