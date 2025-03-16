export const EVENTS = {
  START_TIMER: "start-timer",
  RESET_TIMER: "reset-timer",
  PAUSE_TIMER: "pause-timer",
};

export function dispatchStartTimerEvent(element) {
  const startTimerEvent = new CustomEvent(EVENTS.START_TIMER, {
    bubbles: true,
    composed: true,
  });

  element.dispatchEvent(startTimerEvent);
}

export function dispatchResetTimerEvent(element) {
  const resetTimerEvent = new CustomEvent(EVENTS.RESET_TIMER, {
    bubbles: true,
    composed: true,
  });
  element.dispatchEvent(resetTimerEvent);
}
