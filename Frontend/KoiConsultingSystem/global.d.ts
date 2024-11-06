declare module '*.module.scss' {
    const classes: { [className: string]: string };
    export default classes;
  }
  // src/global.d.ts
declare module 'quill-image-resize-module' {
  const ImageResize: any; // You can also use `any` if you don't need type safety
  export = ImageResize;
}
