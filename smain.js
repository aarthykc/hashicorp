const Elevator = require('./elevator');

// Create two elevators
const elevator1 = new Elevator(1);
const elevator2 = new Elevator(2);

// Event listeners for status changes
elevator1.on('statusChange', () => {
  console.log(`Elevator ${elevator1.id} is on floor ${elevator1.currentFloor} and moving ${elevator1.direction}`);
});

elevator2.on('statusChange', () => {
  console.log(`Elevator ${elevator2.id} is on floor ${elevator2.currentFloor} and moving ${elevator2.direction}`);
});

// Event listeners for request additions
elevator1.on('requestAdded', (request) => {
  console.log(`Elevator ${elevator1.id} added ${request.type} request for floor ${request.floor}`);
});

elevator2.on('requestAdded', (request) => {
  console.log(`Elevator ${elevator2.id} added ${request.type} request for floor ${request.floor}`);
});

// Simulate adding requests
elevator1.addInternalRequest(5);
elevator1.addExternalRequest(3, 'up');
elevator2.addInternalRequest(7);
elevator2.addExternalRequest(1, 'down');

// Simulate the movement of elevators every second
setInterval(() => {
  elevator1.move();
  elevator2.move();
}, 1000);
