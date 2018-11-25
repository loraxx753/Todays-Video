import { SilenceApi } from './silence/SilenceApi.js'
import { TodaysVideo } from './elements/todays-videos.js'

export const script = document.createElement('script');

(async () => {
    await customElements.define('silence-api', SilenceApi);
    await customElements.define('todays-videos', TodaysVideo);
})();