import React from "react";
import { newtonsCradle } from "ldrs";

newtonsCradle.register();

const Loading: React.FC = () => {
  return (
    <l-newtons-cradle size="78" speed="1.4" color="#696CFF"></l-newtons-cradle>
  );
};

export default Loading;
