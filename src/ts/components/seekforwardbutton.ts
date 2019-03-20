import {ButtonConfig, Button} from './button';
import {UIInstanceManager} from '../uimanager';

export enum SeekButtonDirection {
    Forward = 1,
    Backward,
}

export interface SeekForwardButtonConfig extends ButtonConfig {
    direction: SeekButtonDirection;
}

/**
 * A button that can be used to skeep +10 sec or -10 sec
 */
export class SeekForwardButton extends Button<SeekForwardButtonConfig> {

  constructor(config: SeekForwardButtonConfig = { direction: SeekButtonDirection.Forward }) {
    super(config);

    let cssClass = (config.direction === SeekButtonDirection.Forward) ? 'ui-seek-forward-button' : 'ui-seek-backward-button';

    this.config = this.mergeConfig(config, {
      cssClass: cssClass,
      text: 'Seek Forward',
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    let config = <SeekForwardButtonConfig>this.getConfig();

    if (config.direction === SeekButtonDirection.Forward) {
      this.onClick.subscribe(() => {
        let seekTime = Math.min(player.getCurrentTime() + 10, player.getDuration());
        player.seek(seekTime);
      });
    } else {
      this.onClick.subscribe(() => {
        let seekTime = Math.max(0, player.getCurrentTime() - 10);
        player.seek(seekTime);
      });
    }
  }
}
