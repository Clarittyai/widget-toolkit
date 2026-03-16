/**
 * Widget Interaction Utilities
 *
 * Helper functions for deep linking, actions, and widget interactions
 */

/**
 * Deep link to app view
 */
export function createDeepLink(appId: string, view?: string): string {
  return view ? `/apps/${appId}/${view}` : `/apps/${appId}`;
}

/**
 * Trigger app action/workflow
 */
export function triggerAction(actionId: string, params?: Record<string, any>): void {
  // Emit custom event for parent app to handle
  window.parent.postMessage(
    {
      type: 'WIDGET_ACTION',
      actionId,
      params,
      timestamp: Date.now(),
    },
    '*' // In production, specify exact origin
  );
}

/**
 * Open app in fullscreen mode
 */
export function openApp(appId: string): void {
  window.parent.postMessage(
    {
      type: 'OPEN_APP',
      appId,
      timestamp: Date.now(),
    },
    '*'
  );
}

/**
 * Request data refresh
 */
export function refreshWidget(): void {
  window.parent.postMessage(
    {
      type: 'REFRESH_WIDGET',
      timestamp: Date.now(),
    },
    '*'
  );
}

/**
 * Track widget click/interaction
 */
export function trackWidgetEvent(eventName: string, properties?: Record<string, any>): void {
  window.parent.postMessage(
    {
      type: 'WIDGET_EVENT',
      eventName,
      properties,
      timestamp: Date.now(),
    },
    '*'
  );
}

/**
 * Update widget state (for toggles, etc.)
 */
export function updateWidgetState(state: Record<string, any>): void {
  window.parent.postMessage(
    {
      type: 'UPDATE_WIDGET_STATE',
      state,
      timestamp: Date.now(),
    },
    '*'
  );
}
