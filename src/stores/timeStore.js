import { observable } from 'mobx';

export const timeStore = observable({
  equipTime: 'daily',
  ProgressTime: 'weekly',

  onChangeTime(e) {
    this.ProgressTime = e.target.name;
    this.equipTime = e.target.name;
  },
});
