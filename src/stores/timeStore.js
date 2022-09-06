import { observable } from 'mobx';

export const timeStore = observable({
  equipTime: 'daily',
  ProgressTime: 'weekly',

  onChangeEquipTime(e) {
    this.equipTime = e.target.name;
  },

  onChangeProgressTime(e) {
    this.ProgressTime = e.target.name;
  },
});
