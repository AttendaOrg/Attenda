import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import { RootStackParamList } from '../../App';
import ChooseClassIcon from '../../components/organisms/Teacher/ChooseClassIcon/ChooseClassIcon';
import ClassCardIconModel from '../../api/TeacherApi/model/ClassCardIconModel';
import { teacherApi } from '../../api/TeacherApi';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import GlobalContext from '../../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'ChooseClassIcon'>;

export const ChooseClassIconNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Choose A Icon',
};

const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

console.log('initialLayout', initialLayout);

interface State {
  icons: ClassCardIconModel[];
  classInfo: TeacherClassModel | null;
  navigationState: NavigationState<{ key: string; title: string }>;
}

const renderTabBar = (props: any) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    indicatorStyle={{ backgroundColor: 'blue' }}
    style={{ backgroundColor: 'white' }}
    activeColor="black"
    inactiveColor="grey"
  />
);

class ChooseClassIconPage extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof GlobalContext>;

  constructor(props: Props) {
    super(props);

    this.state = {
      icons: [],
      classInfo: null,
      navigationState: {
        index: 0,
        routes: [],
      },
    };
  }

  async componentDidMount(): Promise<void> {
    const { context } = this;

    context.changeSpinnerLoading(true);

    await this._fetchClassInfo();

    const [remoteIcons = []] = await teacherApi.getAllClassCardIcons();

    if (remoteIcons !== null) {
      const routes = Array.from(new Set(remoteIcons.map(e => e.category))).map(
        e => ({
          key: e,
          title: e,
        }),
      );

      this.setState(prevState => ({
        icons: remoteIcons,
        navigationState: { ...prevState.navigationState, routes },
      }));
    }

    context.changeSpinnerLoading(false);
  }

  _getClassId = (): string => {
    const {
      route: {
        params: { classId },
      },
    } = this.props;

    return classId;
  };

  _fetchClassInfo = async (): Promise<void> => {
    const { _getClassId } = this;

    const [classInfo] = await teacherApi.getClassInfo(_getClassId());

    if (classInfo !== null) this.setState({ classInfo });
  };

  _onIconChange = async (icon: ClassCardIconModel): Promise<void> => {
    const { context, _fetchClassInfo, _getClassId } = this;

    if (await context.throwNetworkError()) return;

    context.changeSpinnerLoading(true);
    try {
      await teacherApi.updateClassIcon(_getClassId(), icon.iconData);
      await _fetchClassInfo();
    } catch (error) {
      console.log(error);
    }
    context.changeSpinnerLoading(false);
  };

  _renderScene = ({
    route,
  }: SceneRendererProps & {
    route: any;
  }): JSX.Element => {
    const {
      state: { classInfo, icons },
      _onIconChange,
    } = this;

    console.log(
      '__renderScene',
      icons,
      route,
      icons.filter(e => e.category === route.title),
    );

    if (classInfo === null) return <></>;

    return (
      <ChooseClassIcon
        icons={icons.filter(e => e.category === route.title)}
        info={classInfo}
        onChange={_onIconChange}
      />
    );
  };

  _onIndexChange = (index: number): void => {
    this.setState(prevState => ({
      ...prevState,
      navigationState: { ...prevState.navigationState, index },
    }));
  };

  render(): JSX.Element {
    const {
      state: { navigationState },
      _onIndexChange,
      _renderScene,
    } = this;

    console.log('routes', navigationState.routes);
    if (navigationState.routes.length === 0) return <View />;

    return (
      <TabView
        renderTabBar={renderTabBar}
        navigationState={navigationState}
        renderScene={_renderScene}
        onIndexChange={_onIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

ChooseClassIconPage.contextType = GlobalContext;

export default ChooseClassIconPage;
