import * as React from 'react';
import { AntdIconProps } from '../components/AntdIcon';

/**
 * News Icon Component
 */
const NewsSvg = () => (
  <svg width="50" height="50" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="64" y="128" width="896" height="768" rx="32" ry="32" fill="#e6f7ff" />
    <rect x="128" y="192" width="256" height="128" rx="16" ry="16" fill="#1890ff" />
    <rect x="416" y="192" width="416" height="48" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="416" y="256" width="416" height="32" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="128" y="352" width="704" height="32" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="128" y="416" width="704" height="32" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="128" y="480" width="704" height="32" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="128" y="544" width="704" height="32" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="128" y="608" width="704" height="32" rx="8" ry="8" fill="#8c8c8c" />
    <rect x="128" y="672" width="704" height="32" rx="8" ry="8" fill="#8c8c8c" />
  </svg>
);

const NewsIcon =
  React.forwardRef <
  HTMLSpanElement >
  ((props, ref) => (
    <span ref={ref} {...props}>
      <NewsSvg />
    </span>
  ));

export default NewsIcon;
