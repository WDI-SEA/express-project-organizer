const editProjectLink = document.getElementById('editlink')
const editProjectForm = document.getElementById('edit')

//show/hide edit form on projects/show

editProjectLink.addEventListener('click', ()=> { 
  if(editProjectForm.getAttribute("class") === "hide") {
    editProjectForm.setAttribute("class", "display")
    editProjectLink.textContent = "Hide edit form"
  } else {
    editProjectForm.setAttribute("class", "hide")
    editProjectLink.textContent = "Edit Project Details"
  }
})