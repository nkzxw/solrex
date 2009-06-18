function isLocalHost(host)
{
  if( dnsDomainIs(host, "localhost") )
    return true;
  else
    return false;
}

function isFreeHost(host)
{
  if( dnsDomainIs(host, "ieee.org") )
    return true;
  else
    return false;
}

function isBlockedHost(host)
{
  if( dnsDomainIs(host, "zh.wikipedia.org") ||
      dnsDomainIs(host, "blogspot.com") ||
      dnsDomainIs(host, "wordpress.com") ||
      dnsDomainIs(host, "android.com") ||
      dnsDomainIs(host, "youtube.com") ||
      dnsDomainIs(host, "flickr.com") )
    return true;
  else
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
  var libProxy    = "PROXY 159.226.100.43:8918";
  var gaeProxy    = "PROXY localhost:8000";

  if(isFreeHost(host)) {
    return libProxy;
  } else if(isLocalHost(host)) {
    return direct;
  } else if(isBlockedHost(host)) {
    return gaeProxy;
  }

  if(!isResolvable(host)) {
    return direct;
  }

  var IpAddr = dnsResolve(host);

  if(isFreeIP(IpAddr)) {
    return libProxy;
  } else if(isLocalIP(IpAddr) || isIPV6(IpAddr)) {
    return direct;
  } else if(isBlockedIP(IpAddr)) {
    return gaeProxy;
  } else {
    return direct;
  }
}
