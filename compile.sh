
#!/usr/bin/env bash

# Mac OS X
if [ "$(uname)" == "Darwin" ]; then
  cd ./src/c/mac;
  make;
  mv listener ../../../bin/listener;
  make clean;
  cd ../../..;

# GNU/Linux
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  cd ./src/c/linux;
  make;
  mv listener ../../../bin/listener;
  make clean;
  cd ../../..;

# 32 bits Windows NT
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
  echo 'no support for win32';
# 64 bits Windows NT platform
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
  echo 'no support for win64';
fi
