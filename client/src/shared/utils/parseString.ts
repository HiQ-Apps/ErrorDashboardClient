import {
  FaWindows,
  FaApple,
  FaSafari,
  FaEdge,
  FaChrome,
  FaOpera,
  FaInternetExplorer,
} from "react-icons/fa";
import { SiMozilla } from "react-icons/si";
import { BiLogoFirefox } from "react-icons/bi";
import { IconType } from "react-icons";

export const formatHeader = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getFirstLetterCaps = (text?: string) => {
  if (!text) return "";
  return text[0].toUpperCase();
};

export const getInitials = (name: string): string => {
  const nameList: string[] = name.split(" ");
  let nameInitials: string = "";
  if (nameList.length > 1) {
    for (let i = 0; i < nameList.length; i++) {
      nameInitials += nameList[0].toUpperCase();
    }
  } else {
    return name[0].toUpperCase();
  }
  return nameInitials;
};

interface UserAgentResult {
  os: string;
  browser: string;
  browserVersion: string;
  renderingEngine: string;
  renderingEngineVersion: string;
}

export const parseUserAgent = (userAgent: string): UserAgentResult => {
  const osRegex = /\(([^)]+)\)/;
  const browserRegex =
    /(Chrome|Firefox|Safari|Edg|OPR|MSIE|Trident)\/?([\d.]+)?/;
  const engineRegex =
    /(AppleWebKit|Gecko|Trident|Blink|EdgeHTML|Presto)\/([\d.]+)/;

  const osMatch = userAgent.match(osRegex);
  const browserMatch = userAgent.match(browserRegex);
  const engineMatch = userAgent.match(engineRegex);

  const os = osMatch ? osMatch[1] : "Unknown OS";

  let browser = "Unknown Browser";
  let browserVersion = "Unknown Version";

  if (browserMatch) {
    switch (browserMatch[1]) {
      case "Chrome":
      case "Firefox":
      case "Safari":
      case "Edg":
        browser = browserMatch[1];
        browserVersion = browserMatch[2];
        break;
      case "OPR":
        browser = "Opera";
        browserVersion = browserMatch[2];
        break;
      case "MSIE":
        browser = "Internet Explorer";
        browserVersion = browserMatch[2];
        break;
      case "Trident":
        browser = "Internet Explorer";
        const ieVersionMatch = userAgent.match(/rv:([\d.]+)/);
        browserVersion = ieVersionMatch ? ieVersionMatch[1] : "Unknown Version";
        break;
    }
  }
  const renderingEngine = engineMatch ? engineMatch[1] : "Unknown Engine";
  const renderingEngineVersion = engineMatch
    ? engineMatch[2]
    : "Unknown Version";

  return {
    os,
    browser,
    browserVersion,
    renderingEngine,
    renderingEngineVersion,
  };
};

type OsIconsMap = {
  [key: string]: IconType;
};

type BrowserIconsMap = {
  [key: string]: IconType;
};

export const getUserAgentIcons = (userAgentResult: UserAgentResult) => {
  const osIcons: OsIconsMap = {
    Windows: FaWindows,
    "Mac OS X": FaApple,
    "iPhone OS": FaApple,
    Linux: SiMozilla,
  };

  const browserIcons: BrowserIconsMap = {
    Chrome: FaChrome,
    Firefox: BiLogoFirefox,
    Safari: FaSafari,
    Edg: FaEdge,
    Opera: FaOpera,
    "Internet Explorer": FaInternetExplorer,
  };

  const osIconKey = Object.keys(osIcons).find((key) =>
    userAgentResult.os.includes(key)
  );
  const browserIconKey = Object.keys(browserIcons).find(
    (key) => key === userAgentResult.browser
  );

  const OsIcon = osIconKey ? osIcons[osIconKey] : null;
  const BrowserIcon = browserIconKey ? browserIcons[browserIconKey] : null;

  return {
    OsIcon,
    BrowserIcon,
  };
};
