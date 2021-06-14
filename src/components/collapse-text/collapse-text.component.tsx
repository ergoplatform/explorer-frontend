import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ReactTruncate from 'react-truncate';

interface IProps {
  children: React.ReactChildren;
  lines: number;
}

export const CollapseText = ({ children, lines }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const toggler = (
    <>
      {!isExpanded && '...'}
      <br />
      <a
        href="#!"
        onClick={(e: any) => {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }}
      >
        <FormattedMessage
          id={isExpanded ? 'common.token.showLess' : 'common.token.showMore'}
        />
      </a>
    </>
  );
  return (
    <>
      <ReactTruncate
        lines={!isExpanded && lines}
        ellipsis={toggler}
        onTruncate={setIsTruncated}
      >
        {children}
      </ReactTruncate>
      {!isTruncated && isExpanded && toggler}
    </>
  );
};
