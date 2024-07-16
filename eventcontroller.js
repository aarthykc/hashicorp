const Scheduler = require('./Scheduler');

class ElevatorController {
  constructor() {
    this.elevators = [];
  }

  addElevator(elevator) {
    this.elevators.push(elevator);
    elevator.on('statusChange', () => {
      this.updateDisplay(elevator);
    });
  }

  removeElevator(elevator) {
    this.elevators = this.elevators.filter(e => e.id !== elevator.id);
  }

  requestElevator(floor, direction) {
    const selectedElevator = Scheduler.scheduleElevator({ floor, direction }, this.elevators);
    if (selectedElevator) {
      selectedElevator.addExternalRequest(floor, direction);
    } else {
      console.log('No available elevator to handle the request');
    }
  }

  updateDisplay(elevator) {
    console.log(`Elevator ${elevator.id} is on floor ${elevator.currentFloor} and moving ${elevator.direction}`);
  }
}

module.exports = ElevatorController;
