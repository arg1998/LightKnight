const timeline = {
  /**
   * Use formatTimeCallback to style the notch labels as you wish, such
   * as with more detail as the number of pixels per second increases.
   *
   * Here we format as M:SS.frac, with M suppressed for times < 1 minute,
   * and frac having 0, 1, or 2 digits as the zoom increases.
   *
   * Note that if you override the default function, you'll almost
   * certainly want to override timeInterval, primaryLabelInterval and/or
   * secondaryLabelInterval so they all work together.
   *
   * @param: seconds
   * @param: pxPerSec
   */
  formatTimeCallback: (seconds, pxPerSec) => {
    pxPerSec = Math.round(pxPerSec);
    seconds = Number(seconds);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    // fill up seconds with zeroes
    var secondsStr = Math.round(seconds).toString();
    if (pxPerSec >= 500) {
      secondsStr = Math.round(seconds);
    } else if (pxPerSec >= 80) {
      secondsStr = Math.round(seconds);
    }

    if (minutes > 0) {
      if (seconds < 10) {
        secondsStr = "0" + secondsStr;
      }
      return `${minutes}:${secondsStr}`;
    }
    return secondsStr;
  },

  /**
   * Use timeInterval to set the period between notches, in seconds,
   * adding notches as the number of pixels per second increases.
   *
   * Note that if you override the default function, you'll almost
   * certainly want to override formatTimeCallback, primaryLabelInterval
   * and/or secondaryLabelInterval so they all work together.
   *
   * @param: pxPerSec
   */
  timeInterval: pxPerSec => {
    pxPerSec = Math.round(pxPerSec);
    // console.log("px: ", pxPerSec);

    var val = 1;
    if (pxPerSec >= 500) {
      val = 0.04;
    } else if (pxPerSec >= 80) {
      val = 0.1;
    }
    return val;
  },

  /**
   * Return the cadence of notches that get labels in the primary color.
   * EG, return 2 if every 2nd notch should be labeled,
   * return 10 if every 10th notch should be labeled, etc.
   *
   * Note that if you override the default function, you'll almost
   * certainly want to override formatTimeCallback, primaryLabelInterval
   * and/or secondaryLabelInterval so they all work together.
   *
   * @param pxPerSec
   */
  primaryLabelInterval: pxPerSec => {
    pxPerSec = Math.round(pxPerSec);
    var val = 5;
    if (pxPerSec >= 500) {
      val = 25;
    } else if (pxPerSec >= 80) {
      val = 10;
    }
    return val;
  },

  /**
   * Return the cadence of notches to get labels in the secondary color.
   * EG, return 2 if every 2nd notch should be labeled,
   * return 10 if every 10th notch should be labeled, etc.
   *
   * Secondary labels are drawn after primary labels, so if
   * you want to have labels every 10 seconds and another color labels
   * every 60 seconds, the 60 second labels should be the secondaries.
   *
   * Note that if you override the default function, you'll almost
   * certainly want to override formatTimeCallback, primaryLabelInterval
   * and/or secondaryLabelInterval so they all work together.
   *
   * @param pxPerSec
   */
  secondaryLabelInterval: pxPerSec => {}
};

export default timeline;
