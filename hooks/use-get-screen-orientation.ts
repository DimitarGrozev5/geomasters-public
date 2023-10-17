import { useEffect, useState } from 'react';

export type DeviceOrientation = 'portrait' | 'landscape';
export type SubSetter = (val: DeviceOrientation) => void;

/**
 * Here I am implementing a pub sub pattern
 * The screen orientaiton will be needed in multiple places,
 * but I don't want to register multiple event listeners
 * Everytime a component needs the screen orientation,
 * it will register a useState setter and the single event
 * listener will call it.
 */

// Array for subscriber setters
let orientationSubs: SubSetter[] = [];

/**
 * State for tracking if the event is set
 * This is needed because this function will run first
 * on the server, where the window object is undefinded
 * Some components will ger registered, but the event won't be set
 */
let eventIsHandled = false;

// The handler is called when the window changes size and it triggers all of the subscribed setters
const windowChangeHandler = () => {
  let orientation: DeviceOrientation;
  if (typeof window === 'undefined') {
    orientation = 'landscape';
  } else {
    orientation =
      window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }
  orientationSubs.forEach((sub) => sub(orientation));
};

// The add subscription function sets the event listener when the first setter is registered
const addSubscription = (setter: SubSetter) => {
  if (
    typeof window !== 'undefined' &&
    (orientationSubs.length === 0 || !eventIsHandled)
  ) {
    window.addEventListener('resize', windowChangeHandler);
    eventIsHandled = true;
  }
  orientationSubs.push(setter);
};

// The remove subscription function clears the event listener when the last setter is removed
const removeSubscription = (setter: SubSetter) => {
  orientationSubs = orientationSubs.filter((sub) => sub !== setter);

  if (typeof window !== 'undefined' && orientationSubs.length === 0) {
    window.removeEventListener('resize', windowChangeHandler);
    eventIsHandled = false;
  }
};

export const useScreenOrientation = () => {
  const [orientation, setOrientation] =
    useState<DeviceOrientation>('landscape');

  useEffect(() => {
    addSubscription(setOrientation);
    return () => {
      removeSubscription(setOrientation);
    };
  }, []);

  return orientation;
};
