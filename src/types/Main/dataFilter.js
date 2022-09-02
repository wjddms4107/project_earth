export class DataFilter {
  data;
  datetime;
  countByType;
  countByState;
  typeByState;

  constructor(data) {
    this.data = data;
    this.datetime = new Date(data.datetime);
    this.countByType = new Map();
    this.countByState = new Map();
    this.typeByState = new Map();
  }

  setCountByType() {
    this.data.type.forEach(item => {
      let current = 0;
      if (!!this.countByType.get(item.detection_info)) {
        current = this.countByType.get(item.detection_info);
      }
      this.countByType.set(item.detection_info, current + 1);
    });
  }

  setCountByState() {
    this.data.type.forEach(item => {
      let current = 0;
      if (!!this.countByState.get(item.state)) {
        current = this.countByState.get(item.state);
      }
      this.countByState.set(item.state, current + 1);
    });
  }

  setTypeByState() {
    this.data.type.forEach(item => {
      let vehicle = item.detection_info;
      let current = 0;
      let countByType = new Map();

      if (this.typeByState.get(item.state)) {
        current = this.typeByState.get(item.state).get(vehicle) || 0;
      }
      countByType.set(vehicle, current + 1);

      if (this.typeByState.get(item.state)) {
        this.typeByState.get(item.state).set(vehicle, current + 1);
      } else {
        this.typeByState.set(item.state, countByType);
      }
    });
  }
}
