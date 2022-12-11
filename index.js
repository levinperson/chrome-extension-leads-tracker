let myLeads = []; 
const inputEl = document.getElementById("input-el"); 
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");  
const ulEl = document.getElementById("ul-el"); 

//first, I need to render the stored array in local storage
const storedLeads = JSON.parse(localStorage.getItem("myLeads")); 
if (storedLeads) {
  myLeads = storedLeads; 
  renderLeads(myLeads);  
}

function renderLeads(leads) {
   
  let listedItems = "";
  for (let i = 0; i < leads.length; i++) {
  // listedItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"; 
  //Template strings 
  listedItems += `
    <li>
      <a href="${leads[i]}" target="_blank">${leads[i]}</a>
    </li>
  `;  
  }
  ulEl.innerHTML = listedItems; 
  //An alternative way for .innerHTML
  // const li = document.createElement("li"); 
  // li.textContent = myLeads[i]; 
  // ulEl.append(li); 
}

inputBtn.addEventListener("click", function() {

  myLeads.push(inputEl.value);  
  renderLeads(myLeads); 
  inputEl.value = ""; // Clear out the input field.

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

}); 

tabBtn.addEventListener("click", function() {
  //Grab the URL of the current tab: 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

    myLeads.push(tabs[0].url); 
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); 

    renderLeads(myLeads); 
  });   
});

deleteBtn.addEventListener("click", function() {
  myLeads = [];
  renderLeads(myLeads); 
  localStorage.clear(); 

}); 