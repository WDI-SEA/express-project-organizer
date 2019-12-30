const editProjectLink = document.getElementById('editlink')
const editProjectForm = document.getElementById('edit')

//ON LOAD


editProjectLink.addEventListener('click', ()=> { 
  if(editProjectForm.style.display === "none") {
    editProjectForm.style.display = "block"
    editProjectLink.textContent = "Hide edit form"
  } else {
    editProjectForm.style.display="none"
    editProjectLink.textContent = "Edit Project Details"
  }
})