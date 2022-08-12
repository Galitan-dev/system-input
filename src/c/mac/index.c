#include <stdio.h>
#include <time.h>
#include <string.h>
#include <ApplicationServices/ApplicationServices.h>
#include <CoreFoundation/CoreFoundation.h>
#include <Carbon/Carbon.h>

bool metaKeyPressed[10] = {0};
enum suit
{
  ready = 0,
  closeEv = 1,
  keydown = 10,
  keyup = 11,
} eventType;

// The following callback method is invoked on every keypress.
CGEventRef CGEventCallback(
    CGEventTapProxy proxy,
    CGEventType type,
    CGEventRef event,
    void *refcon)
{
  if (type != kCGEventKeyDown &&
      type != kCGEventFlagsChanged &&
      type != kCGEventKeyUp)
  {
    return event;
  }

  // Retrieve the incoming keycode.
  CGKeyCode keyCode = (CGKeyCode)CGEventGetIntegerValueField(event, kCGKeyboardEventKeycode);

  if (type != kCGEventFlagsChanged)
  {
    eventType = type;
  }
  else
  {
    bool isPressed = !metaKeyPressed[keyCode - 54];
    eventType = isPressed ? keydown : keyup;
    metaKeyPressed[keyCode - 54] = isPressed;
  }

  printf("%u %d\n", eventType, keyCode);
  fflush(stdout);

  return event;
}

int main(void)
{
  // Create an event tap to retrieve keypresses.
  CGEventMask eventMask = (CGEventMaskBit(kCGEventKeyUp) | CGEventMaskBit(kCGEventKeyDown) | CGEventMaskBit(kCGEventFlagsChanged));

  CFMachPortRef eventTap = CGEventTapCreate(
      kCGSessionEventTap, kCGHeadInsertEventTap, 0, eventMask, CGEventCallback, NULL);

  // Exit the program if unable to create the event tap.
  if (!eventTap)
  {
    fprintf(stderr, "ERROR: Unable to create event tap.\n");
    exit(1);
  }

  // Create a run loop source and add enable the event tap.
  CFRunLoopSourceRef runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0);
  CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, kCFRunLoopCommonModes);
  CGEventTapEnable(eventTap, true);

  printf("%u\n", ready);
  fflush(stdout);

  CFRunLoopRun();
}
