import Image, { type ImageProps } from "next/image";

/** next/image that skips optimisation for SVG placeholders. */
export function Photo(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  return <Image {...props} unoptimized={props.unoptimized ?? src.endsWith(".svg")} alt={props.alt} />;
}
