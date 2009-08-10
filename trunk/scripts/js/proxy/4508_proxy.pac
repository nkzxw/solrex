function isLocalHost(host)
{
  if( dnsDomainIs(host, "localhost") )
    return true;
  else
    return false;
}

function isFreeHost(host)
{
  return false;
}

function isBlockedHost(host)
{
  if(
      dnsDomainIs(host, "2mdn.net") ||
      dnsDomainIs(host, "amazon.com") ||
      dnsDomainIs(host, "android.com") ||
      dnsDomainIs(host, "blogger.com") ||
      dnsDomainIs(host, "blogspot.com") ||
      dnsDomainIs(host, "blogsearch.google.com") ||
      dnsDomainIs(host, "depositfiles.com") ||
      dnsDomainIs(host, "edgefcs.net") ||
      dnsDomainIs(host, "ebookee.com.cn") ||
      dnsDomainIs(host, "facebook.com") ||
      dnsDomainIs(host, "fbcdn.net") ||
      dnsDomainIs(host, "ff.im") ||
      dnsDomainIs(host, "flickr.com") ||
      dnsDomainIs(host, "friendfeed.com") ||
      dnsDomainIs(host, "ggpht.com") ||
      dnsDomainIs(host, "mail-archive.com") ||
      dnsDomainIs(host, "markmail.org") ||
      dnsDomainIs(host, "nlanr.net") ||
      dnsDomainIs(host, "osdir.com") ||
      dnsDomainIs(host, "picasaweb.google.com") ||
      dnsDomainIs(host, "realrumors.net") ||
      dnsDomainIs(host, "samba.org") ||
      dnsDomainIs(host, "technorati.com") ||
      dnsDomainIs(host, "torproject.org") ||
      dnsDomainIs(host, "twitter.com") ||
      dnsDomainIs(host, "wordpress.com") ||
      dnsDomainIs(host, "yeeyan.com") ||
      dnsDomainIs(host, "ytimg.com") ||
      dnsDomainIs(host, "youtube.com") ||
      dnsDomainIs(host, "zh.wikipedia.org")
    )
    return true;
  else
    return false;
}

function isBlockedURL(url, host)
{
  if( dnsDomainIs(host, "www.google.com") ) {
    if (
         shExpMatch(url, "*android.com*") ||
         shExpMatch(url, "*blogger.com*") ||
         shExpMatch(url, "*blogspot.com*") ||
         shExpMatch(url, "*friendfeed.com*") ||
         shExpMatch(url, "*flickr.com*") ||
         shExpMatch(url, "*mail-archive.com*") ||
         shExpMatch(url, "*markmail.com*") ||
         shExpMatch(url, "*osdir.com*") ||
         shExpMatch(url, "*samba.org*") ||
         shExpMatch(url, "*security*") ||
         shExpMatch(url, "*technorati.com*") ||
         shExpMatch(url, "*wordpress.com*") ||
         shExpMatch(url, "*youtube.com*") ||
         shExpMatch(url, "*zh.wikipedia.org*")
      )
      return true;
  }
  return false;
}

function isLocalIP(addr)
{
  if( isInNet(addr,"127.0.0.0","255.0.0.0") ||
      isInNet(addr,"10.0.0.0","255.0.0.0") ||
      isInNet(addr,"192.168.0.0","255.255.0.0") ||
      isInNet(addr,"172.16.0.0","255.255.0.0") )
    return true;
  else
    return false;
}

function isFreeIP(addr)
{
  if( isInNet(addr,"12.18.186.192","255.255.255.224") ||
      isInNet(addr,"12.154.67.128","255.255.255.128") ||
      isInNet(addr,"58.17.0.0","255.255.0.0") ||
      isInNet(addr,"58.18.0.0","255.254.0.0") ||
      isInNet(addr,"58.20.0.0","255.255.0.0") ||
      isInNet(addr,"58.24.0.0","255.254.0.0") ||
      isInNet(addr,"58.32.232.0","255.255.252.0") ||
      isInNet(addr,"58.53.208.0","255.255.240.0") ||
      isInNet(addr,"58.59.1.16","255.255.255.254") ||
      isInNet(addr,"58.59.128.0","255.255.128.0") ||
      isInNet(addr,"58.60.8.0","255.255.248.0") ||
      isInNet(addr,"58.61.32.0","255.255.255.128") ||
      isInNet(addr,"58.61.224.0","255.255.224.0") ||
      isInNet(addr,"58.83.128.0","255.255.128.0") ||
      isInNet(addr,"58.100.0.0","255.254.0.0") ||
      isInNet(addr,"58.116.0.0","255.252.0.0") ||
      isInNet(addr,"58.128.0.0","255.248.0.0") ||
      isInNet(addr,"58.154.0.0","255.254.0.0") ||
      isInNet(addr,"58.192.0.0","255.240.0.0") ||
      isInNet(addr,"58.211.7.0","255.255.255.128") ||
      isInNet(addr,"58.211.15.0","255.255.255.0") ||
      isInNet(addr,"58.211.72.0","255.255.255.0") ||
      isInNet(addr,"58.211.80.0","255.255.255.0") ||
      isInNet(addr,"58.211.137.0","255.255.255.192") ||
      isInNet(addr,"58.211.141.0","255.255.255.0") ||
      isInNet(addr,"58.212.0.0","255.254.0.0") ||
      isInNet(addr,"58.217.128.0","255.255.128.0") ||
      isInNet(addr,"58.240.0.0","255.254.0.0") ||
      isInNet(addr,"58.248.0.0","255.248.0.0") ||
      isInNet(addr,"59.32.0.0","255.240.0.0") ||
      isInNet(addr,"59.49.128.0","255.255.128.0") ||
      isInNet(addr,"59.50.0.0","255.255.0.0") ||
      isInNet(addr,"59.54.0.0","255.255.0.0") ||
      isInNet(addr,"59.61.128.0","255.255.224.0") ||
      isInNet(addr,"59.63.128.0","255.255.248.0") ||
      isInNet(addr,"59.64.0.0","255.240.0.0") ||
      isInNet(addr,"59.151.0.0","255.255.128.0") ||
      isInNet(addr,"59.175.128.0","255.255.240.0") ||
      isInNet(addr,"59.175.228.0","255.255.252.0") ||
      isInNet(addr,"60.0.0.0","255.224.0.0") ||
      isInNet(addr,"60.63.0.0","255.255.0.0") ||
      isInNet(addr,"60.166.0.0","255.255.0.0") ||
      isInNet(addr,"60.168.0.0","255.255.0.0") ||
      isInNet(addr,"60.190.28.0","255.255.255.240") ||
      isInNet(addr,"60.190.28.96","255.255.255.224") ||
      isInNet(addr,"60.190.28.128","255.255.255.240") ||
      isInNet(addr,"60.190.28.144","255.255.255.252") ||
      isInNet(addr,"60.190.31.0","255.255.255.128") ||
      isInNet(addr,"60.190.38.128","255.255.255.128") ||
      isInNet(addr,"60.190.39.0","255.255.255.128") ||
      isInNet(addr,"60.190.39.128","255.255.255.192") ||
      isInNet(addr,"60.190.39.192","255.255.255.224") ||
      isInNet(addr,"60.190.39.224","255.255.255.240") ||
      isInNet(addr,"60.190.39.240","255.255.255.254") ||
      isInNet(addr,"60.190.232.0","255.255.255.0") ||
      isInNet(addr,"60.190.241.0","255.255.255.0") ||
      isInNet(addr,"60.191.2.224","255.255.255.240") ||
      isInNet(addr,"60.208.0.0","255.248.0.0") ||
      isInNet(addr,"60.217.240.0","255.255.240.0") ||
      isInNet(addr,"60.247.104.0","255.255.255.0") ||
      isInNet(addr,"61.28.0.0","255.255.240.0") ||
      isInNet(addr,"61.48.0.0","255.248.0.0") ||
      isInNet(addr,"61.128.0.0","255.192.0.0") ||
      isInNet(addr,"61.232.0.0","255.252.0.0") ||
      isInNet(addr,"61.236.0.0","255.254.0.0") ||
      isInNet(addr,"61.240.0.0","255.252.0.0") ||
      isInNet(addr,"62.4.69.0","255.255.255.0") ||
      isInNet(addr,"62.50.45.40","255.255.255.254") ||
      isInNet(addr,"62.159.60.208","255.255.255.254") ||
      isInNet(addr,"63.73.227.0","255.255.255.0") ||
      isInNet(addr,"63.84.162.0","255.255.255.0") ||
      isInNet(addr,"63.86.118.0","255.255.254.0") ||
      isInNet(addr,"63.86.141.0","255.255.255.0") ||
      isInNet(addr,"63.89.64.0","255.255.255.0") ||
      isInNet(addr,"63.123.194.0","255.255.255.0") ||
      isInNet(addr,"63.123.251.0","255.255.255.0") ||
      isInNet(addr,"63.125.146.0","255.255.255.0") ||
      isInNet(addr,"63.164.11.0","255.255.255.0") ||
      isInNet(addr,"63.209.48.0","255.255.255.0") ||
      isInNet(addr,"63.210.142.0","255.255.255.0") ||
      isInNet(addr,"63.211.66.0","255.255.255.0") ||
      isInNet(addr,"63.215.124.0","255.255.255.0") ||
      isInNet(addr,"64.4.0.0","255.255.192.0") ||
      isInNet(addr,"64.14.57.184","255.255.255.254") ||
      isInNet(addr,"64.124.183.0","255.255.255.0") ||
      isInNet(addr,"64.215.172.0","255.255.255.0") ||
      isInNet(addr,"64.233.160.0","255.255.224.0") ||
      isInNet(addr,"65.54.0.0","255.254.0.0") ||
      isInNet(addr,"65.215.128.0","255.255.255.0") ||
      isInNet(addr,"65.246.184.0","255.255.254.0") ||
      isInNet(addr,"65.249.64.96","255.255.255.224") ||
      isInNet(addr,"66.94.228.0","255.255.255.0") ||
      isInNet(addr,"66.98.205.0","255.255.255.0") ||
      isInNet(addr,"66.102.0.0","255.255.240.0") ||
      isInNet(addr,"66.117.176.0","255.255.254.0") ||
      isInNet(addr,"66.133.171.0","255.255.255.0") ||
      isInNet(addr,"66.179.148.0","255.255.255.0") ||
      isInNet(addr,"66.179.235.32","255.255.255.224") ||
      isInNet(addr,"66.218.72.0","255.255.255.0") ||
      isInNet(addr,"66.249.64.0","255.255.224.0") ||
      isInNet(addr,"67.72.105.0","255.255.255.0") ||
      isInNet(addr,"69.32.132.0","255.255.255.0") ||
      isInNet(addr,"69.32.182.0","255.255.254.0") ||
      isInNet(addr,"69.147.112.0","255.255.255.0") ||
      isInNet(addr,"72.14.192.0","255.255.192.0") ||
      isInNet(addr,"72.164.152.0","255.255.255.0") ||
      isInNet(addr,"74.43.216.244","255.255.255.254") ||
      isInNet(addr,"74.43.219.0","255.255.255.0") ||
      isInNet(addr,"74.125.0.0","255.255.0.0") ||
      isInNet(addr,"82.150.20.0","255.255.252.0") ||
      isInNet(addr,"83.70.140.0","255.255.252.0") ||
      isInNet(addr,"83.138.175.80","255.255.255.254") ||
      isInNet(addr,"83.231.175.18","255.255.255.254") ||
      isInNet(addr,"84.18.160.0","255.255.224.0") ||
      isInNet(addr,"114.212.0.0","255.254.0.0") ||
      isInNet(addr,"114.214.0.0","255.255.0.0") ||
      isInNet(addr,"114.240.0.0","255.240.0.0") ||
      isInNet(addr,"115.24.0.0","255.252.0.0") ||
      isInNet(addr,"115.44.0.0","255.254.0.0") ||
      isInNet(addr,"115.48.0.0","255.240.0.0") ||
      isInNet(addr,"115.154.0.0","255.254.0.0") ||
      isInNet(addr,"115.156.0.0","255.254.0.0") ||
      isInNet(addr,"115.158.0.0","255.255.0.0") ||
      isInNet(addr,"115.252.186.0","255.255.254.0") ||
      isInNet(addr,"116.13.0.0","255.255.0.0") ||
      isInNet(addr,"116.56.0.0","255.254.0.0") ||
      isInNet(addr,"116.58.208.0","255.255.240.0") ||
      isInNet(addr,"116.70.0.0","255.255.240.0") ||
      isInNet(addr,"116.76.0.0","255.255.255.0") ||
      isInNet(addr,"116.77.0.0","255.255.255.0") ||
      isInNet(addr,"116.213.64.0","255.255.192.0") ||
      isInNet(addr,"116.213.128.0","255.255.128.0") ||
      isInNet(addr,"116.226.0.0","255.255.0.0") ||
      isInNet(addr,"116.252.183.0","255.255.255.0") ||
      isInNet(addr,"116.252.184.0","255.255.255.0") ||
      isInNet(addr,"117.8.0.0","255.248.0.0") ||
      isInNet(addr,"117.128.0.0","255.192.0.0") ||
      isInNet(addr,"118.67.112.0","255.255.240.0") ||
      isInNet(addr,"118.102.16.0","255.255.240.0") ||
      isInNet(addr,"118.132.0.0","255.255.0.0") ||
      isInNet(addr,"118.202.0.0","255.254.0.0") ||
      isInNet(addr,"118.228.0.0","255.254.0.0") ||
      isInNet(addr,"118.230.0.0","255.255.0.0") ||
      isInNet(addr,"119.36.124.0","255.255.255.0") ||
      isInNet(addr,"119.42.224.0","255.255.224.0") ||
      isInNet(addr,"119.75.208.0","255.255.240.0") ||
      isInNet(addr,"119.78.0.0","255.254.0.0") ||
      isInNet(addr,"119.97.130.0","255.255.255.0") ||
      isInNet(addr,"119.147.96.0","255.255.252.0") ||
      isInNet(addr,"120.94.0.0","255.254.0.0") ||
      isInNet(addr,"121.0.16.0","255.255.240.0") ||
      isInNet(addr,"121.9.192.0","255.255.240.0") ||
      isInNet(addr,"121.9.208.0","255.255.255.0") ||
      isInNet(addr,"121.9.228.0","255.255.254.0") ||
      isInNet(addr,"121.9.234.0","255.255.254.0") ||
      isInNet(addr,"121.9.241.0","255.255.255.0") ||
      isInNet(addr,"121.10.104.0","255.255.248.0") ||
      isInNet(addr,"121.10.112.0","255.255.240.0") ||
      isInNet(addr,"121.14.73.0","255.255.255.0") ||
      isInNet(addr,"121.14.74.0","255.255.254.0") ||
      isInNet(addr,"121.14.76.0","255.255.254.0") ||
      isInNet(addr,"121.14.78.0","255.255.255.0") ||
      isInNet(addr,"121.14.128.0","255.255.224.0") ||
      isInNet(addr,"121.16.0.0","255.240.0.0") ||
      isInNet(addr,"121.33.96.0","255.255.224.0") ||
      isInNet(addr,"121.36.4.0","255.255.252.0") ||
      isInNet(addr,"121.36.8.0","255.255.248.0") ||
      isInNet(addr,"121.36.16.0","255.255.248.0") ||
      isInNet(addr,"121.37.0.0","255.255.128.0") ||
      isInNet(addr,"121.48.0.0","255.254.0.0") ||
      isInNet(addr,"121.52.160.0","255.255.224.0") ||
      isInNet(addr,"121.52.208.0","255.255.240.0") ||
      isInNet(addr,"121.58.0.0","255.255.128.0") ||
      isInNet(addr,"121.192.0.0","255.252.0.0") ||
      isInNet(addr,"121.248.0.0","255.252.0.0") ||
      isInNet(addr,"122.11.32.0","255.255.224.0") ||
      isInNet(addr,"122.70.128.0","255.255.248.0") ||
      isInNet(addr,"122.70.138.0","255.255.255.0") ||
      isInNet(addr,"122.96.0.0","255.254.0.0") ||
      isInNet(addr,"122.136.0.0","255.248.0.0") ||
      isInNet(addr,"122.156.0.0","255.252.0.0") ||
      isInNet(addr,"122.192.0.0","255.252.0.0") ||
      isInNet(addr,"122.204.0.0","255.252.0.0") ||
      isInNet(addr,"122.224.126.0","255.255.255.0") ||
      isInNet(addr,"122.225.117.0","255.255.255.0") ||
      isInNet(addr,"123.4.0.0","255.252.0.0") ||
      isInNet(addr,"123.8.0.0","255.248.0.0") ||
      isInNet(addr,"123.49.160.0","255.255.255.0") ||
      isInNet(addr,"123.99.228.144","255.255.255.254") ||
      isInNet(addr,"123.99.228.148","255.255.255.254") ||
      isInNet(addr,"123.99.228.252","255.255.255.254") ||
      isInNet(addr,"123.100.0.0","255.255.224.0") ||
      isInNet(addr,"123.112.0.0","255.248.0.0") ||
      isInNet(addr,"123.128.0.0","255.248.0.0") ||
      isInNet(addr,"123.138.0.0","255.254.0.0") ||
      isInNet(addr,"123.144.0.0","255.252.0.0") ||
      isInNet(addr,"123.148.0.0","255.255.0.0") ||
      isInNet(addr,"123.152.0.0","255.248.0.0") ||
      isInNet(addr,"123.234.0.0","255.255.254.0") ||
      isInNet(addr,"123.234.2.0","255.255.255.0") ||
      isInNet(addr,"124.14.0.0","255.254.0.0") ||
      isInNet(addr,"124.16.0.0","255.254.0.0") ||
      isInNet(addr,"124.40.41.0","255.255.255.0") ||
      isInNet(addr,"124.42.0.0","255.255.128.0") ||
      isInNet(addr,"124.64.0.0","255.254.0.0") ||
      isInNet(addr,"124.66.0.0","255.255.128.0") ||
      isInNet(addr,"124.67.0.0","255.255.0.0") ||
      isInNet(addr,"124.73.0.0","255.255.0.0") ||
      isInNet(addr,"124.77.0.0","255.255.128.0") ||
      isInNet(addr,"124.88.0.0","255.252.0.0") ||
      isInNet(addr,"124.115.0.0","255.255.248.0") ||
      isInNet(addr,"124.115.28.0","255.255.252.0") ||
      isInNet(addr,"124.128.0.0","255.248.0.0") ||
      isInNet(addr,"124.161.0.0","255.255.0.0") ||
      isInNet(addr,"124.162.0.0","255.254.0.0") ||
      isInNet(addr,"124.164.0.0","255.252.0.0") ||
      isInNet(addr,"124.207.240.0","255.255.255.192") ||
      isInNet(addr,"124.225.0.0","255.255.0.0") ||
      isInNet(addr,"124.250.0.0","255.254.0.0") ||
      isInNet(addr,"125.32.0.0","255.240.0.0") ||
      isInNet(addr,"125.64.6.0","255.255.255.0") ||
      isInNet(addr,"125.73.0.0","255.255.0.0") ||
      isInNet(addr,"125.76.224.0","255.255.224.0") ||
      isInNet(addr,"125.80.0.0","255.248.0.0") ||
      isInNet(addr,"125.88.0.0","255.255.0.0") ||
      isInNet(addr,"125.90.64.0","255.255.252.0") ||
      isInNet(addr,"125.96.0.0","255.254.0.0") ||
      isInNet(addr,"125.98.0.0","255.255.0.0") ||
      isInNet(addr,"125.171.0.0","255.255.128.0") ||
      isInNet(addr,"125.208.0.0","255.255.240.0") ||
      isInNet(addr,"125.211.0.0","255.255.0.0") ||
      isInNet(addr,"125.216.0.0","255.248.0.0") ||
      isInNet(addr,"128.84.158.0","255.255.255.0") ||
      isInNet(addr,"128.107.229.0","255.255.255.0") ||
      isInNet(addr,"128.232.233.0","255.255.255.192") ||
      isInNet(addr,"129.35.76.0","255.255.255.0") ||
      isInNet(addr,"129.41.4.144","255.255.255.252") ||
      isInNet(addr,"132.174.0.0","255.255.0.0") ||
      isInNet(addr,"137.189.0.0","255.255.0.0") ||
      isInNet(addr,"138.12.0.0","255.255.0.0") ||
      isInNet(addr,"140.98.193.0","255.255.255.0") ||
      isInNet(addr,"140.98.194.0","255.255.255.0") ||
      isInNet(addr,"140.113.0.0","255.255.0.0") ||
      isInNet(addr,"140.234.29.0","255.255.255.0") ||
      isInNet(addr,"143.89.0.0","255.255.0.0") ||
      isInNet(addr,"144.81.82.0","255.255.255.0") ||
      isInNet(addr,"144.81.87.0","255.255.255.0") ||
      isInNet(addr,"144.81.88.0","255.255.254.0") ||
      isInNet(addr,"144.214.0.0","255.255.0.0") ||
      isInNet(addr,"147.8.0.0","255.255.0.0") ||
      isInNet(addr,"149.28.1.0","255.255.255.0") ||
      isInNet(addr,"152.101.0.0","255.255.0.0") ||
      isInNet(addr,"152.104.0.0","255.255.0.0") ||
      isInNet(addr,"158.132.0.0","255.255.0.0") ||
      isInNet(addr,"158.182.0.0","255.255.0.0") ||
      isInNet(addr,"159.226.0.0","255.255.0.0") ||
      isInNet(addr,"160.109.98.0","255.255.255.0") ||
      isInNet(addr,"160.109.106.0","255.255.254.0") ||
      isInNet(addr,"160.109.108.0","255.255.254.0") ||
      isInNet(addr,"160.109.112.0","255.255.254.0") ||
      isInNet(addr,"160.109.114.0","255.255.255.0") ||
      isInNet(addr,"161.207.0.0","255.255.0.0") ||
      isInNet(addr,"162.105.0.0","255.255.0.0") ||
      isInNet(addr,"165.193.106.0","255.255.254.0") ||
      isInNet(addr,"165.193.159.0","255.255.255.0") ||
      isInNet(addr,"165.215.0.0","255.255.0.0") ||
      isInNet(addr,"166.111.0.0","255.255.0.0") ||
      isInNet(addr,"167.68.6.0","255.255.254.0") ||
      isInNet(addr,"167.139.0.0","255.255.0.0") ||
      isInNet(addr,"167.216.166.0","255.255.255.0") ||
      isInNet(addr,"168.160.0.0","255.255.0.0") ||
      isInNet(addr,"170.107.185.0","255.255.255.0") ||
      isInNet(addr,"170.107.188.0","255.255.252.0") ||
      isInNet(addr,"171.66.120.0","255.255.248.0") ||
      isInNet(addr,"172.27.166.62","255.255.255.254") ||
      isInNet(addr,"172.27.166.64","255.255.255.192") ||
      isInNet(addr,"172.27.166.128","255.255.255.224") ||
      isInNet(addr,"172.27.166.160","255.255.255.252") ||
      isInNet(addr,"192.58.150.0","255.255.255.0") ||
      isInNet(addr,"192.73.216.0","255.255.255.0") ||
      isInNet(addr,"192.80.71.0","255.255.255.0") ||
      isInNet(addr,"192.84.75.0","255.255.255.0") ||
      isInNet(addr,"192.86.104.0","255.255.255.0") ||
      isInNet(addr,"192.195.245.0","255.255.255.0") ||
      isInNet(addr,"192.207.91.0","255.255.255.0") ||
      isInNet(addr,"192.245.208.0","255.255.255.0") ||
      isInNet(addr,"193.128.223.0","255.255.255.0") ||
      isInNet(addr,"193.131.119.0","255.255.255.0") ||
      isInNet(addr,"193.194.158.0","255.255.255.0") ||
      isInNet(addr,"194.130.252.0","255.255.255.0") ||
      isInNet(addr,"194.209.48.0","255.255.255.0") ||
      isInNet(addr,"195.22.150.0","255.255.254.0") ||
      isInNet(addr,"195.27.60.0","255.255.255.0") ||
      isInNet(addr,"195.27.123.0","255.255.255.0") ||
      isInNet(addr,"195.27.130.0","255.255.255.0") ||
      isInNet(addr,"195.144.0.50","255.255.255.254") ||
      isInNet(addr,"195.144.69.0","255.255.255.0") ||
      isInNet(addr,"198.81.200.0","255.255.255.0") ||
      isInNet(addr,"198.137.148.0","255.255.254.0") ||
      isInNet(addr,"198.137.150.0","255.255.255.0") ||
      isInNet(addr,"198.185.16.0","255.255.248.0") ||
      isInNet(addr,"198.185.24.0","255.255.254.0") ||
      isInNet(addr,"199.4.154.0","255.255.254.0") ||
      isInNet(addr,"199.98.88.0","255.255.255.0") ||
      isInNet(addr,"199.164.217.0","255.255.255.0") ||
      isInNet(addr,"202.4.128.0","255.255.224.0") ||
      isInNet(addr,"202.14.80.0","255.255.255.0") ||
      isInNet(addr,"202.38.0.0","255.255.0.0") ||
      isInNet(addr,"202.40.138.0","255.255.254.0") ||
      isInNet(addr,"202.40.157.0","255.255.255.0") ||
      isInNet(addr,"202.40.192.0","255.255.224.0") ||
      isInNet(addr,"202.43.216.0","255.255.254.0") ||
      isInNet(addr,"202.45.32.0","255.255.224.0") ||
      isInNet(addr,"202.45.176.0","255.255.240.0") ||
      isInNet(addr,"202.75.64.0","255.255.224.0") ||
      isInNet(addr,"202.84.16.0","255.255.254.0") ||
      isInNet(addr,"202.89.238.248","255.255.255.252") ||
      isInNet(addr,"202.91.176.0","255.255.240.0") ||
      isInNet(addr,"202.93.252.0","255.255.252.0") ||
      isInNet(addr,"202.95.0.0","255.255.224.0") ||
      isInNet(addr,"202.96.0.0","255.240.0.0") ||
      isInNet(addr,"202.112.0.0","255.248.0.0") ||
      isInNet(addr,"202.120.0.0","255.254.0.0") ||
      isInNet(addr,"202.122.32.0","255.255.240.0") ||
      isInNet(addr,"202.123.110.0","255.255.255.0") ||
      isInNet(addr,"202.125.192.0","255.255.192.0") ||
      isInNet(addr,"202.127.0.0","255.255.192.0") ||
      isInNet(addr,"202.127.128.0","255.255.128.0") ||
      isInNet(addr,"202.130.0.0","255.255.224.0") ||
      isInNet(addr,"202.130.224.0","255.255.224.0") ||
      isInNet(addr,"202.131.208.0","255.255.240.0") ||
      isInNet(addr,"202.152.176.0","255.255.240.0") ||
      isInNet(addr,"202.160.176.0","255.255.240.0") ||
      isInNet(addr,"202.165.96.0","255.255.248.0") ||
      isInNet(addr,"202.165.104.0","255.255.252.0") ||
      isInNet(addr,"202.179.240.0","255.255.240.0") ||
      isInNet(addr,"202.189.96.0","255.255.224.0") ||
      isInNet(addr,"202.192.0.0","255.240.0.0") ||
      isInNet(addr,"203.81.16.0","255.255.240.0") ||
      isInNet(addr,"203.81.38.66","255.255.255.254") ||
      isInNet(addr,"203.83.56.0","255.255.248.0") ||
      isInNet(addr,"203.86.0.0","255.255.224.0") ||
      isInNet(addr,"203.86.64.0","255.255.224.0") ||
      isInNet(addr,"203.87.224.0","255.255.224.0") ||
      isInNet(addr,"203.88.32.0","255.255.224.0") ||
      isInNet(addr,"203.91.120.0","255.255.248.0") ||
      isInNet(addr,"203.93.0.0","255.255.0.0") ||
      isInNet(addr,"203.95.0.0","255.255.248.0") ||
      isInNet(addr,"203.98.210.56","255.255.255.248") ||
      isInNet(addr,"203.98.210.64","255.255.255.224") ||
      isInNet(addr,"203.100.92.0","255.255.252.0") ||
      isInNet(addr,"203.100.192.0","255.255.240.0") ||
      isInNet(addr,"203.119.24.0","255.255.248.0") ||
      isInNet(addr,"203.128.128.0","255.255.224.0") ||
      isInNet(addr,"203.134.240.0","255.255.252.0") ||
      isInNet(addr,"203.134.244.0","255.255.255.0") ||
      isInNet(addr,"203.175.128.0","255.255.224.0") ||
      isInNet(addr,"203.187.160.0","255.255.224.0") ||
      isInNet(addr,"203.188.64.0","255.255.192.0") ||
      isInNet(addr,"203.192.0.0","255.255.224.0") ||
      isInNet(addr,"203.196.0.0","255.255.252.0") ||
      isInNet(addr,"203.196.4.0","255.255.255.0") ||
      isInNet(addr,"203.196.7.0","255.255.255.0") ||
      isInNet(addr,"203.207.64.0","255.255.192.0") ||
      isInNet(addr,"203.207.128.0","255.255.128.0") ||
      isInNet(addr,"203.208.0.0","255.255.192.0") ||
      isInNet(addr,"203.209.224.0","255.255.224.0") ||
      isInNet(addr,"203.212.0.0","255.255.240.0") ||
      isInNet(addr,"204.179.122.0","255.255.255.0") ||
      isInNet(addr,"205.142.245.0","255.255.255.0") ||
      isInNet(addr,"205.240.244.0","255.255.252.0") ||
      isInNet(addr,"205.243.231.0","255.255.255.0") ||
      isInNet(addr,"206.112.112.0","255.255.255.0") ||
      isInNet(addr,"207.24.35.0","255.255.255.0") ||
      isInNet(addr,"207.24.36.0","255.255.254.0") ||
      isInNet(addr,"207.24.38.0","255.255.255.0") ||
      isInNet(addr,"207.24.42.0","255.255.254.0") ||
      isInNet(addr,"207.24.44.0","255.255.254.0") ||
      isInNet(addr,"207.24.128.0","255.255.240.0") ||
      isInNet(addr,"207.25.176.0","255.255.248.0") ||
      isInNet(addr,"207.46.0.0","255.255.0.0") ||
      isInNet(addr,"207.54.136.0","255.255.255.0") ||
      isInNet(addr,"207.68.168.0","255.255.255.0") ||
      isInNet(addr,"207.68.178.0","255.255.255.128") ||
      isInNet(addr,"207.68.179.192","255.255.255.224") ||
      isInNet(addr,"208.44.56.210","255.255.255.254") ||
      isInNet(addr,"208.44.56.212","255.255.255.252") ||
      isInNet(addr,"208.44.56.216","255.255.255.252") ||
      isInNet(addr,"208.76.204.0","255.255.255.0") ||
      isInNet(addr,"208.176.18.0","255.255.255.0") ||
      isInNet(addr,"208.215.179.0","255.255.255.0") ||
      isInNet(addr,"208.254.79.0","255.255.255.192") ||
      isInNet(addr,"209.85.128.0","255.255.128.0") ||
      isInNet(addr,"209.133.34.0","255.255.255.0") ||
      isInNet(addr,"209.191.64.0","255.255.192.0") ||
      isInNet(addr,"209.195.157.0","255.255.255.0") ||
      isInNet(addr,"209.208.170.210","255.255.255.254") ||
      isInNet(addr,"209.246.136.0","255.255.255.0") ||
      isInNet(addr,"209.249.123.0","255.255.255.0") ||
      isInNet(addr,"210.5.0.0","255.255.224.0") ||
      isInNet(addr,"210.12.0.0","255.254.0.0") ||
      isInNet(addr,"210.14.64.0","255.255.224.0") ||
      isInNet(addr,"210.14.112.0","255.255.254.0") ||
      isInNet(addr,"210.14.127.0","255.255.255.0") ||
      isInNet(addr,"210.14.160.0","255.255.224.0") ||
      isInNet(addr,"210.14.192.0","255.255.192.0") ||
      isInNet(addr,"210.15.0.0","255.255.128.0") ||
      isInNet(addr,"210.15.128.0","255.255.192.0") ||
      isInNet(addr,"210.21.0.0","255.255.0.0") ||
      isInNet(addr,"210.22.0.0","255.255.0.0") ||
      isInNet(addr,"210.25.0.0","255.255.128.0") ||
      isInNet(addr,"210.25.128.0","255.255.192.0") ||
      isInNet(addr,"210.26.0.0","255.254.0.0") ||
      isInNet(addr,"210.28.0.0","255.252.0.0") ||
      isInNet(addr,"210.32.0.0","255.240.0.0") ||
      isInNet(addr,"210.51.0.0","255.255.0.0") ||
      isInNet(addr,"210.52.0.0","255.254.0.0") ||
      isInNet(addr,"210.72.0.0","255.252.0.0") ||
      isInNet(addr,"210.76.0.0","255.254.0.0") ||
      isInNet(addr,"210.78.0.0","255.255.0.0") ||
      isInNet(addr,"210.79.224.0","255.255.224.0") ||
      isInNet(addr,"210.82.0.0","255.254.0.0") ||
      isInNet(addr,"210.87.128.0","255.255.192.0") ||
      isInNet(addr,"210.177.136.0","255.255.255.0") ||
      isInNet(addr,"210.192.96.0","255.255.224.0") ||
      isInNet(addr,"211.64.0.0","255.248.0.0") ||
      isInNet(addr,"211.80.0.0","255.240.0.0") ||
      isInNet(addr,"211.96.0.0","255.248.0.0") ||
      isInNet(addr,"211.136.0.0","255.248.0.0") ||
      isInNet(addr,"211.144.0.0","255.240.0.0") ||
      isInNet(addr,"211.160.0.0","255.248.0.0") ||
      isInNet(addr,"212.187.169.0","255.255.255.0") ||
      isInNet(addr,"213.52.211.32","255.255.255.224") ||
      isInNet(addr,"213.161.82.0","255.255.255.0") ||
      isInNet(addr,"213.244.181.0","255.255.255.0") ||
      isInNet(addr,"216.33.115.0","255.255.255.0") ||
      isInNet(addr,"216.35.79.116","255.255.255.254") ||
      isInNet(addr,"216.52.36.0","255.255.254.0") ||
      isInNet(addr,"216.83.187.0","255.255.255.0") ||
      isInNet(addr,"216.143.112.0","255.255.255.0") ||
      isInNet(addr,"216.146.38.200","255.255.255.252") ||
      isInNet(addr,"216.162.203.72","255.255.255.248") ||
      isInNet(addr,"216.162.203.144","255.255.255.240") ||
      isInNet(addr,"216.200.62.0","255.255.255.0") ||
      isInNet(addr,"216.239.32.0","255.255.224.0") ||
      isInNet(addr,"217.7.141.144","255.255.255.254") ||
      isInNet(addr,"217.68.69.68","255.255.255.254") ||
      isInNet(addr,"218.0.0.0","255.224.0.0") ||
      isInNet(addr,"218.56.0.0","255.248.0.0") ||
      isInNet(addr,"218.64.0.0","255.224.0.0") ||
      isInNet(addr,"218.96.0.0","255.252.0.0") ||
      isInNet(addr,"218.104.0.0","255.252.0.0") ||
      isInNet(addr,"218.108.0.0","255.254.0.0") ||
      isInNet(addr,"218.192.0.0","255.240.0.0") ||
      isInNet(addr,"218.240.0.0","255.248.0.0") ||
      isInNet(addr,"218.249.63.128","255.255.255.128") ||
      isInNet(addr,"218.249.156.64","255.255.255.192") ||
      isInNet(addr,"218.249.156.128","255.255.255.192") ||
      isInNet(addr,"219.72.0.0","255.255.0.0") ||
      isInNet(addr,"219.82.0.0","255.255.0.0") ||
      isInNet(addr,"219.128.0.0","255.224.0.0") ||
      isInNet(addr,"219.216.0.0","255.248.0.0") ||
      isInNet(addr,"219.224.0.0","255.240.0.0") ||
      isInNet(addr,"219.242.0.0","255.254.0.0") ||
      isInNet(addr,"219.244.0.0","255.252.0.0") ||
      isInNet(addr,"220.112.0.0","255.252.0.0") ||
      isInNet(addr,"220.160.0.0","255.224.0.0") ||
      isInNet(addr,"220.192.0.0","255.240.0.0") ||
      isInNet(addr,"220.231.0.0","255.255.192.0") ||
      isInNet(addr,"220.231.128.0","255.255.128.0") ||
      isInNet(addr,"220.234.0.0","255.255.0.0") ||
      isInNet(addr,"220.248.0.0","255.252.0.0") ||
      isInNet(addr,"220.252.0.0","255.255.0.0") ||
      isInNet(addr,"221.0.0.0","255.240.0.0") ||
      isInNet(addr,"221.130.0.0","255.254.0.0") ||
      isInNet(addr,"221.137.0.0","255.255.0.0") ||
      isInNet(addr,"221.172.0.0","255.252.0.0") ||
      isInNet(addr,"221.176.0.0","255.248.0.0") ||
      isInNet(addr,"221.192.0.0","255.248.0.0") ||
      isInNet(addr,"221.200.0.0","255.252.0.0") ||
      isInNet(addr,"221.204.0.0","255.254.0.0") ||
      isInNet(addr,"221.208.0.0","255.252.0.0") ||
      isInNet(addr,"221.212.0.0","255.255.0.0") ||
      isInNet(addr,"221.213.18.0","255.255.255.0") ||
      isInNet(addr,"221.214.0.0","255.254.0.0") ||
      isInNet(addr,"221.216.0.0","255.248.0.0") ||
      isInNet(addr,"221.224.0.0","255.240.0.0") ||
      isInNet(addr,"222.16.0.0","255.240.0.0") ||
      isInNet(addr,"222.32.0.0","255.224.0.0") ||
      isInNet(addr,"222.64.0.0","255.224.0.0") ||
      isInNet(addr,"222.92.0.0","255.252.0.0") ||
      isInNet(addr,"222.125.0.0","255.255.0.0") ||
      isInNet(addr,"222.128.0.0","255.240.0.0") ||
      isInNet(addr,"222.160.0.0","255.252.0.0") ||
      isInNet(addr,"222.168.0.0","255.248.0.0") ||
      isInNet(addr,"222.176.0.0","255.240.0.0") ||
      isInNet(addr,"222.192.0.0","255.240.0.0") ||
      isInNet(addr,"222.208.0.0","255.248.0.0") ||
      isInNet(addr,"222.216.0.0","255.254.0.0") ||
      isInNet(addr,"222.218.0.0","255.255.0.0") ||
      isInNet(addr,"222.222.0.0","255.254.0.0") ||
      isInNet(addr,"222.240.0.0","255.248.0.0") ||
      isInNet(addr,"222.248.0.0","255.254.0.0") )
    return true;
  else
    return false;
}

function isBlockedIP(addr)
{
  return false;
}

function isIPV6(addr)
{
  if( shExpMatch(addr, "*:*") )
    return true;
  else
    return false;
}

function FindProxyForURL(url, host)
{
  var direct      = "DIRECT";
  var labProxy    = "PROXY 166.111.139.21:8080";
  var tohrProxy   = "PROXY localhost:9090";
  var torProxy    = "SOCKS localhost:9050";

  if(isFreeHost(host) || isLocalHost(host)) {
    return direct;
  } else if(isBlockedURL(url, host) || isBlockedHost(host)) {
    return tohrProxy;
  }

  if(!isResolvable(host)) {
    return hHttpProxy;
  }

  var IpAddr = dnsResolve(host);

  if(isFreeIP(IpAddr) || isLocalIP(IpAddr) || isIPV6(IpAddr)) {
    return direct;
  } else if(isBlockedIP(IpAddr)) {
    return tohrProxy;
  } else {
    return labProxy;
  }
}
