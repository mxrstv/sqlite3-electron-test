const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  window.api.insertHero([...formData.values()]);
  //window.api.closeMe();

};

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);