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
  const epochSize = poolData.epoch_end_height - poolData.current_block_height;
  const isEpochLive = epochSize > 0;

  if (isEpochLive) {
    const isEpochEndBig = epochSize > TIMELINE_DOTS_QUANTITY;

    if (isEpochEndBig) {
      return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
        if (index === 0) {
          return {
            type: dotStates.EPOCH_START,
            value: poolData.current_block_height,
          };
        }

        if (index === TIMELINE_DOTS_QUANTITY - 1) {
          return {
            type: dotStates.EPOCH_END,
            value: poolData.epoch_end_height,
          };
        }

        return {
          type: dotStates.NORMAL,
          value: poolData.current_block_height + index,
        };
      });
    }

    return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
      if (index === 0) {
        return {
          type: dotStates.EPOCH_START,
          value: poolData.current_block_height,
        };
      }

      if (index === epochSize - 1) {
        return {
          type: dotStates.EPOCH_END,
          value: poolData.epoch_end_height,
        };
      }

      return {
        type: dotStates.NORMAL,
        value: poolData.current_block_height + index,
      };
    });
  }

  return Array.from(Array(TIMELINE_DOTS_QUANTITY)).map((_, index) => {
    if (index === 0) {
      return {
        type: dotStates.EPOCH_ENDING,
        value: poolData.epoch_end_height,
      };
    }

    return {
      type: dotStates.NORMAL,
      value: poolData.epoch_end_height + index,
    };
  });
};
