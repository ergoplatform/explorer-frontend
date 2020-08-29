export const dotStates = {
  EPOCH_START: 'EPOCH_START',
  EPOCH_END: 'EPOCH_END',
  EPOCH_ENDING: 'EPOCH_ENDING',
  NORMAL: 'NORMAL',
};

export const getTimelineConfig = (poolData: any) => {
  if (!poolData) {
    return [];
  }

  const TIMELINE_DOTS_QUANTITY = 8;
  const {
    epoch_end_height: epochEndHeight,
    current_block_height: currentBlockHeight,
  } = poolData;
  const epochSize = epochEndHeight - currentBlockHeight;
  const isEpochLive = epochSize > 0;

  if (isEpochLive) {
    const isEpochEndBig = epochSize >= TIMELINE_DOTS_QUANTITY;

    if (isEpochEndBig) {
      return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
        if (index === 0) {
          return {
            type: dotStates.EPOCH_START,
            value: currentBlockHeight,
          };
        }

        if (index === TIMELINE_DOTS_QUANTITY - 1) {
          return {
            type: dotStates.EPOCH_END,
            value: epochEndHeight,
          };
        }

        return {
          type: dotStates.NORMAL,
          value: currentBlockHeight + index,
        };
      });
    }

    return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
      if (index === 0) {
        return {
          type: dotStates.EPOCH_START,
          value: currentBlockHeight,
        };
      }

      if (index === epochSize) {
        return {
          type: dotStates.EPOCH_END,
          value: epochEndHeight,
        };
      }

      return {
        type: dotStates.NORMAL,
        value: currentBlockHeight + index,
      };
    });
  }

  return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
    if (index === 0) {
      return {
        type: dotStates.EPOCH_ENDING,
        value: epochEndHeight,
      };
    }

    return {
      type: dotStates.NORMAL,
      value: epochEndHeight + index,
    };
  });
};
