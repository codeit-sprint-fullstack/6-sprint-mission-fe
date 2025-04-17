import { useEffect, useState } from "react";

export const useGetDeviceType = (setParams) => {
  const [device, setDevice] = useState("");

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
        setDevice("desktop");
      } else if (tablet.matches) {
        setDevice("tablet");
      } else {
        setDevice("mobile");
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
  const getLimit = (device) => {
    if (device === "desktop") {
      return { limit: 3 };
    } else if (device === "tablet") {
      return { limit: 2 };
    } else {
      return { limit: 1 };
    }
  };

  // 반응형 리퀘스트 - 3. 추출한 limit으로 params 변경하기
  useEffect(() => {
    if (!device) return;
    const { limit } = getLimit(device);
    setParams((prevParams) => ({ ...prevParams, limit }));
  }, [device]);
};
