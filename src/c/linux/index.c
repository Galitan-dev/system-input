#include <stdio.h>
#include <fcntl.h> // open
#include <stdlib.h>
#include <string.h> // strerror
#include <errno.h>
#include <stdint.h>
#include <assert.h>
#include <unistd.h> // daemon, close
#include <linux/input.h>

#define KEY_RELEASE 0
#define KEY_PRESS 1

typedef struct input_event input_event;

static void rootCheck();
static int openKeyboardDeviceFile(char *deviceFile);

/**
 * Exit with return code -1 if user does not have root privileges
 */
static void rootCheck()
{
   if (geteuid() != 0)
   {
      printf("Must run as root\n");
      exit(-1);
   }
}

/**
 * Opens the keyboard device file
 *
 * @param  deviceFile   the path to the keyboard device file
 * @return              the file descriptor on success, error code on failure
 */
static int openKeyboardDeviceFile(char *deviceFile)
{
   int kbd_fd = open(deviceFile, O_RDONLY);
   if (kbd_fd == -1)
   {
      printf("%s\n", strerror(errno));
      exit(-1);
   }

   return kbd_fd;
}

static char *getKeyboardDeviceFileName()
{
   static const char *command =
       "grep -E 'Handlers|EV' /proc/bus/input/devices |"
       "grep -B1 120013 |"
       "grep -Eo event[0-9]+ |"
       "tr '\\n' '\\0'";

   FILE *pipe = popen(command, "r");
   if (pipe == NULL)
   {
      printf("Could not determine keyboard device file\n");
      fflush(stdout);
   }

   char result[20] = "/dev/input/";
   char temp[9];
   fgets(temp, 9, pipe);

   pclose(pipe);
   return strdup(strcat(result, temp));
}

int main(int argc, char **argv)
{
   rootCheck();

   char *deviceFile = getKeyboardDeviceFileName();
   int kbd_fd = openKeyboardDeviceFile(deviceFile);
   assert(kbd_fd > 0);

   input_event event;
   enum suit
   {
      keydown = 10,
      keyup = 11,
   } eventType;

   while (read(kbd_fd, &event, sizeof(input_event)) > 0)
   {
      if (event.type == EV_KEY)
      {
         if (event.value == KEY_PRESS)
            eventType = 10;
         else if (event.value == KEY_RELEASE)
            eventType = 11;
         else
            continue;

         int keyCode = event.code;

         printf("%u %d\n", eventType, keyCode);
         fflush(stdout);
      }
   }

   close(kbd_fd);
   return 0;
}
