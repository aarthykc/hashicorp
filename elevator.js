const EventEmitter = require('events');

class Elevator extends EventEmitter {
  constructor(id, capacity = 10) {
    super();
    this.id = id;
    this.currentFloor = 0;
    this.direction = 'idle';
    this.status = 'idle';
    this.internalRequests = [];
    this.externalRequests = [];
    this.capacity = capacity;
    this.currentLoad = 0;
  }

  move() {
    if (this.internalRequests.length === 0 && this.externalRequests.length === 0) {
      this.status = 'idle';
      return;
    }

    let nextFloor = this.internalRequests[0] || this.externalRequests[0].floor;
    if (this.currentFloor < nextFloor) {
      this.direction = 'up';
      this.currentFloor++;
    } else if (this.currentFloor > nextFloor) {
      this.direction = 'down';
      this.currentFloor--;
    } else {
      this.openDoors();
      this.internalRequests = this.internalRequests.filter(floor => floor !== this.currentFloor);
      this.externalRequests = this.externalRequests.filter(request => request.floor !== this.currentFloor);
      this.closeDoors();
    }

    this.emit('statusChange', this);
  }

  openDoors() {
    this.status = 'open';
    setTimeout(() => {
      this.closeDoors();
    }, 2000);
  }

  closeDoors() {
    this.status = 'closed';
    this.emit('statusChange', this);
  }

  addInternalRequest(floor) {
    if (!this.internalRequests.includes(floor)) {
      this.internalRequests.push(floor);
      this.internalRequests.sort((a, b) => a - b);
      this.emit('requestAdded', { type: 'internal', floor });
    }
  }

  addExternalRequest(floor, direction) {
    if (!this.externalRequests.find(req => req.floor === floor && req.direction === direction)) {
      this.externalRequests.push({ floor, direction });
      this.externalRequests.sort((a, b) => a.floor - b.floor);
      this.emit('requestAdded', { type: 'external', floor, direction });
    }
  }

  isOverloaded() {
    return this.currentLoad > this.capacity;
  }
}

module.exports = Elevator;
