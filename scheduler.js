class Scheduler {
    static scheduleElevator(request, elevators) {
      let closestElevator = null;
      let minDistance = Infinity;
  
      for (const elevator of elevators) {
        if (elevator.status === 'idle' || elevator.direction === request.direction) {
          const distance = Math.abs(elevator.currentFloor - request.floor);
          if (distance < minDistance) {
            closestElevator = elevator;
            minDistance = distance;
          }
        }
      }
  
      return closestElevator;
    }
  }
  
  module.exports = Scheduler;
  