#!/bin/bash
# This script helps you install Kscope on Ubuntu 9.04.
# You can also use it to fix "Kscope doesn't run in KDE4" bug.

echo "Determining machine hardware name... "
MACHINE=`uname -m`
case "$MACHINE" in
  i386 | i586 | i686)
    ARCH="i386"
    ;;
  x86_64)
    ARCH="amd64"
    ;;
  *)
    ARCH="i386"
    ;;
esac

# If Kscope is not installed, install it.
which kscope &> /dev/null
if [ $? -ne 0 ]; then
  echo "Installing kscope..."
  sudo apt-get install kscope || \
  wget http://archive.ubuntu.com/ubuntu/pool/universe/k/kscope/kscope_1.6.0-1_${ARCH}.deb && \
  sudo dpkg -i kscope_*.deb || \
  sudo apt-get -fy install || \
  echo "Oops, some error happens..."
fi

kscope -v &> /dev/null
if [ $? -eq 0 ]; then 
  echo "Kscope works fine."
  exit
fi

echo "Downloading KDE3 libraries needed by kscope..."
wget http://ftp.debian.org/debian/pool/main/k/kdebase/kate_3.5.9.dfsg.1-6_${ARCH}.deb
dpkg -x kate_3*.deb kate

echo "Installing KDE3 libraries..."
sudo cp kate/usr/lib/libkateinterfaces.so.0.0.0 /usr/local/lib/
sudo cp kate/usr/lib/libkateutils.so.0.0.0 /usr/local/lib
sudo ln -s /usr/local/lib/libkateinterfaces.so.0.0.0 /usr/local/lib/libkateinterfaces.so.0
sudo ln -s /usr/local/lib/libkateutils.so.0.0.0 /usr/local/lib/libkateutils.so.0
sudo ldconfig

echo "Finished."
