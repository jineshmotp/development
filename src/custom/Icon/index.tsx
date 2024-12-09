import AntDesign from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import antDesignIcons from 'react-native-vector-icons/glyphmaps/AntDesign.json';
import entypoIcons from 'react-native-vector-icons/glyphmaps/Entypo.json';
import evilIcons from 'react-native-vector-icons/glyphmaps/EvilIcons.json';
import featherIcons from 'react-native-vector-icons/glyphmaps/Feather.json';
import FontAwesome6Icons from 'react-native-vector-icons/glyphmaps/FontAwesome6Free.json';
import fontAwesomeIcons from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import FontistoIcons from 'react-native-vector-icons/glyphmaps/Fontisto.json';
import ionIcons from 'react-native-vector-icons/glyphmaps/Ionicons.json';
import MaterialIcons from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import octiconsIcons from 'react-native-vector-icons/glyphmaps/Octicons.json';
import simpleIcons from 'react-native-vector-icons/glyphmaps/SimpleLineIcons.json';
import zocialIcons from 'react-native-vector-icons/glyphmaps/Zocial.json';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

export type IconType =
  | 'ant-design'
  | 'entypo'
  | 'evilicon'
  | 'ionicon'
  | 'feather'
  | 'font-awesome'
  | 'fontisto'
  | 'foundation'
  | 'material'
  | 'material-community'
  | 'octicon'
  | 'simple-line-icon'
  | 'zocial'
  | 'fontAwesome6';

const getIconComponent = (type?: IconType) => {
  switch (type) {
    case 'ant-design':
      return AntDesign;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'feather':
      return FeatherIcon;
    case 'fontisto':
      return Fontisto;
    case 'foundation':
      return FoundationIcon;
    case 'font-awesome':
      return FAIcon;
    case 'ionicon':
      return Ionicon;
    case 'material':
      return MaterialIcon;
    case 'material-community':
      return MaterialCommunityIcon;
    case 'octicon':
      return OcticonIcon;
    case 'simple-line-icon':
      return SimpleLineIcon;
    case 'zocial':
      return ZocialIcon;
    case 'fontAwesome6':
      return FontAwesome6Icon;
    default:
      return FAIcon;
  }
};

export type IconVectorName =
  | keyof typeof entypoIcons
  | keyof typeof antDesignIcons
  | keyof typeof evilIcons
  | keyof typeof featherIcons
  | keyof typeof octiconsIcons
  | keyof typeof zocialIcons
  | keyof typeof fontAwesomeIcons
  | keyof typeof simpleIcons
  | keyof typeof ionIcons
  | keyof typeof MaterialIcons
  | keyof typeof FontistoIcons
  | keyof typeof FontAwesome6Icons;

export function VectorIcon({
  src,
  name,
  size = 18,
  color,
  onPress,
}: {
  src: IconType;
  name: IconVectorName;
  size?: number;
  color?: string;
  onPress?: () => void;
}): JSX.Element {
  const Icon = getIconComponent(src);

  return <Icon name={name} size={size} color={color} onPress={onPress} />;
}
