const form = document.getElementById("trip-form");
const tripsContainer = document.getElementById("trips-list");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

function displayTrips() {
  tripsContainer.textContent = "";

  trips.forEach((trip, index) => {
    const tripCard = document.createElement("div");
    tripCard.className = "trip-card";

    const destination = document.createElement("h3");
    destination.textContent = trip.destination;
    tripCard.append(destination);

    const startDate = document.createElement("p");
    startDate.textContent = `Start: ${trip.startDate}`;
    tripCard.append(startDate);

    const endDate = document.createElement("p");
    endDate.textContent = `End: ${trip.endDate}`;
    tripCard.append(endDate);

    const notes = document.createElement("p");
    notes.textContent = trip.notes;
    tripCard.append(notes);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTrip(index));
    tripCard.append(deleteButton);

    tripsContainer.append(tripCard);
  });
}

function saveTrips() {
  localStorage.setItem("trips", JSON.stringify(trips));
}

function deleteTrip(index) {
  trips.splice(index, 1);
  saveTrips();
  displayTrips();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const notes = document.getElementById("notes").value;

  const trip = { destination, startDate, endDate, notes };

  trips.push(trip);

  saveTrips();

  displayTrips();

  form.reset();
});

displayTrips();
