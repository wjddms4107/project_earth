import { observable } from 'mobx';

const timeStore = observable({
  equipTime: 'daily',
  ProgressTime: 'weekly',

  onChangeTime(e) {
    this.ProgressTime = e.target.name;
  },
});

export default timeStore;
