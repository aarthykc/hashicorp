const Elevator = require('./elevator');
const ElevatorController = require('./eventcontroller');

const controller = new ElevatorController();

const elevator1 = new Elevator(1);
const elevator2 = new Elevator(2);
controller.addElevator(elevator1);
controller.addElevator(elevator2);

controller.requestElevator(5, 'up');
controller.requestElevator(3, 'up');
controller.requestElevator(7, 'down');
controller.requestElevator(1, 'down');

setInterval(() => {
  elevator1.move();
  elevator2.move();
}, 1000);
