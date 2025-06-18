declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

// URL로 사용하는 경우
declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
