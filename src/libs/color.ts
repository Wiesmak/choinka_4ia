import {Modes} from './modes';

export default class Color {
  public color: string | undefined;
  public colorA: string | undefined;
  public colorB: string | undefined;
  public mode: string = 'off';
  constructor (mode: {value: string, label: string}) {
    switch (mode.value) {
      case 'static':
        this.mode = 'static';
        this.color = '#61dafb';
        break;
      case 'dual':
        this.mode = 'dual';
        this.colorA = 'red';
        this.colorB = 'green';
        break;
      case 'rainbow':
        this.mode = 'rainbow';
        break;
      case 'off':
        this.mode = 'off';
        break;
    }
  }
}
