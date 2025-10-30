import EventEmitter from 'eventemitter3';

class EventBus extends EventEmitter {
  constructor() {
    super();
    console.log('🚌 EventBus initialized for micro-frontend communication');
  }

  // Emit event with logging
  emit(event, data = {}) {
    console.log(`📡 EventBus: Broadcasting '${event}' event`, data);
    return super.emit(event, data);
  }

  // Listen to events with logging
  on(event, listener) {
    console.log(`👂 EventBus: Listening to '${event}' event`);
    return super.on(event, listener);
  }

  // Remove event listener
  off(event, listener) {
    console.log(`🔇 EventBus: Removing listener for '${event}' event`);
    return super.off(event, listener);
  }

  // One-time event listener
  once(event, listener) {
    console.log(`🎯 EventBus: One-time listener for '${event}' event`);
    return super.once(event, listener);
  }

  // Get all registered events (for debugging)
  getEvents() {
    return Object.keys(this._events || {});
  }

  // Clear all listeners (for cleanup)
  removeAllListeners() {
    console.log('🧹 EventBus: Clearing all event listeners');
    return super.removeAllListeners();
  }
}

// Create singleton instance
const eventBus = new EventBus();

// Common event types for micro-frontend communication
export const EVENT_TYPES = {
  NAVIGATION: 'navigation',
  USER_ACTION: 'userAction',
  DATA_UPDATE: 'dataUpdate',
  NOTIFICATION: 'notification',
  THEME_CHANGE: 'themeChange',
};

export default eventBus;