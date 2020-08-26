export const dotStates = {
  EPOCH_START: 'EPOCH_START',
  EPOCH_END: 'EPOCH_END',
  EPOCH_ENDING: 'EPOCH_ENDING',
  NORMAL: 'NORMAL',
};

export const getTimelineConfig = (poolStatus: any, currentBlock: number) => {
  if (!poolStatus) {
    return [];
  }

  const TIMELINE_DOTS_QUANTITY = 8;
  const epochSize = poolStatus.epoch_ends - currentBlock;
  const isEpochLive = epochSize > 0;

  if (isEpochLive) {
    const isEpochEndBig = epochSize > TIMELINE_DOTS_QUANTITY;

    if (isEpochEndBig) {
      return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
        if (index === 0) {
          return {
            type: dotStates.EPOCH_START,
            value: currentBlock,
          };
        }

        if (index === TIMELINE_DOTS_QUANTITY - 1) {
          return {
            type: dotStates.EPOCH_END,
            value: poolStatus.epoch_ends,
          };
        }

        return { type: dotStates.NORMAL, value: currentBlock + index };
      });
    }

    return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
      if (index === 0) {
        return {
          type: dotStates.EPOCH_START,
          value: currentBlock,
        };
      }

      if (index === epochSize - 1) {
        return {
          type: dotStates.EPOCH_END,
          value: poolStatus.epoch_ends,
        };
      }

      return {
        type: dotStates.NORMAL,
        value: currentBlock + index,
      };
    });
  }

  return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
    if (index === 0) {
      return {
        type: dotStates.EPOCH_ENDING,
        value: poolStatus.epoch_ends,
      };
    }

    return {
      type: dotStates.NORMAL,
      value: poolStatus.epoch_ends + index,
    };
  });
};
