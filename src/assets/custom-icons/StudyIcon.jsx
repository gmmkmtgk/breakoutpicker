import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

// Use IconFont to create a custom Study icon
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js' // Replace with your custom icon font script URL
});

const StudyIcon = () => <IconFont type="icon-study" />;

export default StudyIcon;
