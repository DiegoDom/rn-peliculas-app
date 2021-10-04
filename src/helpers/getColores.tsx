import ImageColors from 'react-native-image-colors';

import { AndroidImageColors, IOSImageColors, WebImageColors } from 'react-native-image-colors/lib/typescript/types';

export const getImageColors = async(uri: string) => {

  const colors: AndroidImageColors | IOSImageColors | WebImageColors = await ImageColors.getColors(uri, {});

  let primary;
  let secondary;

  switch (colors.platform) {
    case 'android':
      primary = colors.dominant;
      secondary = colors.average;
      break;
    case 'web':
      primary = colors.dominant;
      secondary = colors.vibrant;
      break;
    case 'ios':
      primary = colors.primary;
      secondary = colors.secondary;
      break;
  }

  return [primary, secondary];

};
