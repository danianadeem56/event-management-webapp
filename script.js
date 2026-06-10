let events = [
    {
        name: "Tech Seminar",
        date: "2026-07-15",
        description: "Technology seminar for students"
    },
    {
        name: "Sports Gala",
        date: "2025-01-10",
        description: "Annual sports competition"
    }
];

displayEvents();

/* Popup */
function showToast(message, type){

    let toast = document.getElementById("toast");

    if(type === "success"){
        toast.style.background = "#16a34a";
        message = "✔ " + message;
    }
    else if(type === "error"){
        toast.style.background = "#dc2626";
        message = "⚠ " + message;
    }
    else if(type === "delete"){
        toast.style.background = "#1d408a";
        message = "🗑 " + message;
    }

    toast.innerText = message;

    toast.style.top = "5px";

    setTimeout(function(){
        toast.style.top = "-120px";
    }, 2000);
}

/* Display Events */
function displayEvents() {

    let output = "";

    for(let i = 0; i < events.length; i++) {

        output += `
        <div class="event-card">
            <h3>${events[i].name}</h3>
            <p><b>Date:</b> ${events[i].date}</p>
            <p>${events[i].description}</p>

            <button class="delete-btn" onclick="deleteEvent(${i})">
                Delete
            </button>
        </div>
        `;
    }

    document.getElementById("eventList").innerHTML = output;
}

/* Add Event */
function addEvent() {

    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;
    let description = document.getElementById("eventDescription").value;

    if(name === "" || date === "" || description === "") {
        showToast("Please fill all fields!", "error");
        return;
    }

    events.push({
        name: name,
        date: date,
        description: description
    });

    events.sort(function(a, b){
        return new Date(a.date) - new Date(b.date);
    });

    showToast("Event Added Successfully!", "success");

    displayEvents();

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventDescription").value = "";
}

/* Delete Event */
function deleteEvent(index) {

    events.splice(index, 1);

    showToast("Event Deleted Successfully!", "delete");

    displayEvents();
}

/* Search */
document.getElementById("searchInput").addEventListener("keyup", function() {

    let search = this.value.toLowerCase();

    let filteredEvents = events.filter(function(event){

        return event.name.toLowerCase().includes(search) ||
               event.date.includes(search);
    });

    let output = "";

    for(let i = 0; i < filteredEvents.length; i++) {

        let originalIndex = events.indexOf(filteredEvents[i]);

        output += `
        <div class="event-card">
            <h3>${filteredEvents[i].name}</h3>
            <p><b>Date:</b> ${filteredEvents[i].date}</p>
            <p>${filteredEvents[i].description}</p>

            <button class="delete-btn" onclick="deleteEvent(${originalIndex})">
                Delete
            </button>
        </div>
        `;
    }

    document.getElementById("eventList").innerHTML = output;
});
