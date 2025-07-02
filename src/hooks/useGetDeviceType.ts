import { Dispatch, useEffect, useState } from "react";

type TParams = {
  offset: number;
  limit: number;
  orderBy: string;
  keyword: string;
};

type TUseGetDeviceType = "bestArticles" | "bestProducts" | "products";

const LIMIT_BY_TYPE = {
  desktop: {
    bestArticles: 3,
    bestProducts: 4,
    products: 10,
  },
  tablet: {
    bestArticles: 2,
    bestProducts: 2,
    products: 6,
  },
  mobile: {
    bestArticles: 1,
    bestProducts: 1,
    products: 4,
  },
};

export default function useGetDeviceType(
  setParams: Dispatch<React.SetStateAction<TParams>>,
  type: TUseGetDeviceType
) {
  const [currentDevice, setCurrentDevice] = useState<string>("");

  // 반응형 리퀘스트 - 1. 화면 크기 구하기
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const tablet = window.matchMedia(
      "(min-width: 744px) and (max-width: 1199px)"
    );
    const mobile = window.matchMedia(
      "(min-width: 375px) and (max-width: 743px)"
    );

    const updateDevice = () => {
      if (desktop.matches) {
        setCurrentDevice("desktop");
      } else if (tablet.matches) {
        setCurrentDevice("tablet");
      } else {
        setCurrentDevice("mobile");
      }
    };

    updateDevice();

    desktop.addEventListener("change", updateDevice);
    tablet.addEventListener("change", updateDevice);
    mobile.addEventListener("change", updateDevice);

    return () => {
      desktop.removeEventListener("change", updateDevice);
      tablet.removeEventListener("change", updateDevice);
      mobile.removeEventListener("change", updateDevice);
    };
  }, []);

  // 반응형 리퀘스트 - 2. 화면 크기에 따라 limit 구하기
  const getLimit = (currentDevice: string) => {
    if (currentDevice === "desktop") {
      return { limit: LIMIT_BY_TYPE.desktop[type] };
    } else if (currentDevice === "tablet") {
      return { limit: LIMIT_BY_TYPE.tablet[type] };
    } else {
      return { limit: LIMIT_BY_TYPE.mobile[type] };
    }
  };

  // 반응형 리퀘스트 - 3. 추출한 limit으로 params 변경하기
  useEffect(() => {
    if (!currentDevice) return;

    const { limit } = getLimit(currentDevice);
    setParams((prevParams) => ({ ...prevParams, limit }));
  }, [currentDevice]);

  return [currentDevice];
}
